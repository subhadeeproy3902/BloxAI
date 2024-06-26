"use client";
import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

// Dynamic imports for server-side libraries
const jsPDFPromise = import("jspdf");
const excalidrawPromise = import("@excalidraw/excalidraw");

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();
  const [fullScreen, setFullScreen] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);
  const canvasRef = useRef<any>(null);

  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  console.log(user, isAuthenticated, isLoading);

  useEffect(() => {
    if (params.fileId && !isLoading) {
      getFileData();
    }
  }, [params.fileId, isLoading]);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });

    const teamInfo = await convex.query(api.teams.getTeamById, {
      _id: result.teamId,
    });

    if (result.private) {
      if (user) {
        if (!teamInfo.teamMembers.includes(user.email)) {
          router.push("/");
        }
        console.log(user);
      } else {
        router.push("/");
      }
    }
    setFileData(result);
  };

  const saveAsPdf = async () => {
    const { default: jsPDF } = await jsPDFPromise;
    const { exportToSvg } = await excalidrawPromise;

    const editorInstance = editorRef.current;
    const canvasInstance = canvasRef.current;

    if (editorInstance && canvasInstance) {
      const pdf = new jsPDF("p", "mm", "a4");

      // Extract text content from the editor
      editorInstance.save().then((editorContent: OutputData) => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const textWidth = pageWidth - margin * 2;
        const textHeight = pageHeight - margin * 2;
        let y = margin;

        editorContent.blocks.forEach((block: any) => {
          let lines: any[] = [];

          switch (block.type) {
            case "paragraph":
              lines = parseText(block.data.text);
              break;
            case "header":
              pdf.setFontSize(16); // Set font size for header
              lines = [{ text: block.data.text, style: "header" }];
              pdf.setFontSize(12); // Reset font size
              break;
            case "list":
              lines = block.data.items.map((item: string) => ({
                text: `• ${item}`,
                style: "normal",
              }));
              break;
            // Add more cases if needed for different block types
            default:
              lines = [{ text: block.data.text, style: "normal" }];
          }

          lines.forEach((line: any) => {
            if (y + 10 > textHeight) {
              pdf.addPage();
              y = margin;
            }

            switch (line.style) {
              case "bold":
                pdf.setFont("helvetica", "bold");
                break;
              case "italic":
                pdf.setFont("helvetica", "italic");
                break;
              case "header":
                pdf.setFont("helvetica", "bold");
                const headerWidth =
                  (pdf.getStringUnitWidth(line.text) * 16) /
                  pdf.internal.scaleFactor;
                pdf.text(line.text, (pageWidth - headerWidth) / 2, y);
                y += 10;
                break;
              default:
                pdf.setFont("helvetica", "normal");
            }

            if (line.style !== "header") {
              // Split text if it's too wide and handle separately
              const wrappedLines = pdf.splitTextToSize(line.text, textWidth);
              wrappedLines.forEach((wrappedLine: string) => {
                if (y + 10 > textHeight) {
                  pdf.addPage();
                  y = margin;
                }
                pdf.text(wrappedLine, margin, y);
                y += 10;
              });
            }
          });

          // Reset font style and size after each block
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(12);
        });

        // Export flowchart as SVG from Excalidraw
        const elements = canvasInstance.getSceneElements();
        const appState = canvasInstance.getAppState();
        const files = canvasInstance.getFiles();

        exportToSvg({
          elements: elements,
          appState: { ...appState, exportBackground: false }, // No background
          files: files,
        }).then((svg: SVGSVGElement) => {
          // Add heading for the flowchart
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(16); // Set font size for the heading
          const headingText = "Flowchart";
          const headingWidth =
            pdf.getStringUnitWidth(headingText) * pdf.internal.scaleFactor;
          const headingX = (pageWidth - headingWidth) / 2;
          pdf.text(headingText, headingX, y + 10);
          pdf.setFontSize(12); // Reset font size
          pdf.setFont("helvetica", "normal");
          y += 20; // Adjust y position to avoid overlap with the heading

          // Convert SVG to PNG using the Canvas API
          const svgData = new XMLSerializer().serializeToString(svg);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const img = new Image();

          img.onload = () => {
            if (context) {
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);

              const imgData = canvas.toDataURL("image/png");
              const imgProps = pdf.getImageProperties(imgData);
              const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

              // Add canvas image just below the heading
              pdf.addImage(
                imgData,
                "PNG",
                margin,
                y,
                pageWidth - margin * 2,
                imgHeight
              );
              y += imgHeight;

              // Save the PDF
              pdf.save("document.pdf");
            } else {
              console.error("Failed to get canvas context");
            }
          };

          img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        });
      });
    } else {
      console.error("Unable to find the content to save as PDF");
    }
  };

  const parseText = (text: string) => {
    const lines: any[] = [];
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(text, "text/html");
    parsedHtml.body.childNodes.forEach((node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        lines.push({ text: node.textContent, style: "normal" });
      } else if (node.nodeName === "B") {
        lines.push({ text: node.textContent, style: "bold" });
      } else if (node.nodeName === "I") {
        lines.push({ text: node.textContent, style: "italic" });
      }
    });
    return lines;
  };

  return (
    <div className="overflow-x-hidden">
      <WorkspaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        name={fileData?.fileName || "New Document"}
        setFullScreen={setFullScreen}
        setFileData={setFileData}
        onSaveAsPdf={saveAsPdf}
      />

      {!isLoading && <div
        className={`grid grid-cols-1 ${fullScreen ? "" : "md:grid-cols-2"} overflow-x-none`}
      >
        <div className={`${fullScreen ? "hidden" : "block"}`}>
          <Editor
            ref={editorRef as MutableRefObject<EditorJS | null>}
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        <div className={`h-screen border-l`}>
          <Canvas
            ref={canvasRef as MutableRefObject<any>}
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>}
    </div>
  );
}

export default Workspace;
