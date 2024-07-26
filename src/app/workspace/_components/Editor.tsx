"use client";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";
// @ts-ignore
import InlineImage from "editorjs-inline-image";
// @ts-ignore
import Table from "@editorjs/table";
import { useTheme } from "next-themes";
import axios from "axios";
import { toast } from "sonner";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import {
  saveWorkspacePrivateUrl,
  saveWorkspacePublicUrl,
} from "@/lib/API-URLs";
import { FILE } from "@/types/types";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

type EditorProps = {
  onSaveTrigger: boolean;
  fileId: any;
  fileData: FILE;
  whiteboardData: any;
  user: any;
};

const Editor = forwardRef((props: EditorProps, ref) => {
  const editorInstanceRef = useRef<EditorJS | null>(null);
  const { theme } = useTheme();
  const axiosInstance = createAxiosInstance(props.user.accessToken);

  useImperativeHandle(
    ref,
    () => ({
      get instance() {
        return editorInstanceRef.current;
      },
      save: () => {
        return editorInstanceRef.current
          ? editorInstanceRef.current.save()
          : Promise.resolve({ blocks: [] } as OutputData);
      },
    }),
    [editorInstanceRef]
  );

  useEffect(() => {
    if(editorInstanceRef === null){
      initEditor();
    }

    return () => {
      editorInstanceRef?.current?.destroy();
      editorInstanceRef.current = null;
    };
  }, [props.fileData]);

  useEffect(() => {
    if (props.onSaveTrigger) {
      onSaveDocument();
    }
  }, [props.onSaveTrigger]);

  const initEditor = () => {
    editorInstanceRef.current = new EditorJS({
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          shortcut: "CMD+SHIFT+H",
          inlineToolbar: true,
          config: {
            placeholder: "Enter a Header",
            levels: [2, 3, 4],
          },
        },
        list: {
          class: List as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        warning: Warning,
        image: {
          class: InlineImage,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: "india",
              apiUrl: "https://unsplash.com/s/photos/",
              maxResults: 30,
            },
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
            withHeadings: true,
          },
        },
      },
      holder: "editorjs",
      data: props.fileData?.document
        ? JSON.parse(props.fileData.document)
        : rawDocument,
    });
  };

  const onSaveDocument = () => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current
        .save()
        .then(async (outputData) => {
          try {
            const saveUrl = props.fileData.filePrivate
              ? saveWorkspacePrivateUrl
              : saveWorkspacePublicUrl;
            const payload = {
              fileId: props.fileId,
              whiteboard:
                props.whiteboardData === "" ? [] : props.whiteboardData,
              document: JSON.stringify(outputData),
            };

            await axiosInstance.put(saveUrl, payload);
            toast.success("Progress Saved!!");
          } catch (err) {
            console.log(err);
          }
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <div>
      {props.fileData && (
        <div
          id="editorjs"
          className="h-screen pl-8"
          style={{ backgroundColor: theme === "dark" ? "#333333" : "#f2f2f2" }}
        />
      )}
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
