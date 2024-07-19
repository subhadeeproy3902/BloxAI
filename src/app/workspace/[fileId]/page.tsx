"use client";
import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";

import Canvas from "../_components/Canvas";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Loader from "@/components/shared/Loader";
import PrivateAlert from "@/components/shared/PrivateAlert";
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store';
import { useSession } from "next-auth/react";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { getFileByIdUrl } from "@/lib/API-URLs";
import { FILE } from "@/types/types";
import axios from "axios";

// Dynamic imports for server-side libraries
const jsPDFPromise = import('jspdf');
const excalidrawPromise = import('@excalidraw/excalidraw');

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<FILE | null>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);
  const canvasRef = useRef<any>(null);
  const {data:session,status} = useSession();
  const isAuth = useSelector((state:RootState)=>state.auth.user.isAuth)
  const user = useSelector((state:RootState)=>state.auth.user)
  const axiosInstance = createAxiosInstance(user.accessToken)
  const [isError,setError] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  useEffect(() => {
    if (params.fileId) {
      getFileData();
    }
  }, [params.fileId]);

  const getFileData = async () => {
    try {
      if(user){
        const result = await axiosInstance.get(`${getFileByIdUrl}/${params.fileId}`);
        setFileData(result.data);
        if(result.data && session && result.data.filePrivate){
          if(isAuth){
            if((result.data.readBy && !result.data.readBy.includes(session.user.id)) || result.data.createdBy.email !== session.user.email){
              setError(true);
              setErrorMsg("Invalid Access! Request owner to give read or write access!")
            }
          }else{
            setError(true);
            setErrorMsg("Invalid Access! Request owner to make file public!!");
          }
        }

      }else{
        const result = await axios.get(`${getFileByIdUrl}/${params.fileId}`);
        setFileData(result.data);

        if(result.data && session && result.data.filePrivate){
          if(isAuth){
            if((result.data.readBy && !result.data.readBy.includes(session.user.id)) || result.data.createdBy.email !== session.user.email){
              setError(true);
              setErrorMsg("Invalid Access! Request owner to give read or write access!")
            }
          }else{
            setError(true);
            setErrorMsg("Invalid Access! Request owner to make file public!!");
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
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
              lines = [{ text: block.data.text, style: 'header' }];
              pdf.setFontSize(12); // Reset font size
              break;
            case "list":
              lines = block.data.items.map((item: string) => ({ text: `• ${item}`, style: 'normal' }));
              break;
            default:
              lines = [{ text: block.data.text, style: 'normal' }];
          }
  
          lines.forEach((line: any) => {
            if (y + 10 > textHeight) {
              pdf.addPage();
              y = margin;
            }
  
            switch (line.style) {
              case 'bold':
                pdf.setFont("helvetica", "bold");
                break;
              case 'italic':
                pdf.setFont("helvetica", "italic");
                break;
              case 'header':
                pdf.setFont("helvetica", "bold");
                const headerWidth = pdf.getStringUnitWidth(line.text) * 16 / pdf.internal.scaleFactor;
                pdf.text(line.text, (pageWidth - headerWidth) / 2, y);
                y += 10;
                break;
              default:
                pdf.setFont("helvetica", "normal");
            }
  
            if (line.style !== 'header') {
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
  
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(12);
        });
  
        // Export flowchart as SVG from Excalidraw
        const elements = canvasInstance.getSceneElements();
        const appState = canvasInstance.getAppState();
        const files = canvasInstance.getFiles();
  
        exportToSvg({
          elements: elements,
          appState: { ...appState, exportBackground: false },
          files: files,
        }).then((svg: SVGSVGElement) => {
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
              let imgWidth = pageWidth - margin * 2;
              let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
              // Check if the image height exceeds the remaining page height
              if (y + imgHeight + 20 > pageHeight - margin) { // 20 for the heading space
                pdf.addPage();
                y = margin;
              }
  
              // Add heading for the flowchart
              pdf.setFont("helvetica", "bold");
              pdf.setFontSize(16); // Set font size for the heading
              const headingText = "Flowchart";
              const headingWidth = pdf.getStringUnitWidth(headingText) * 16 / pdf.internal.scaleFactor;
              pdf.text(headingText, (pageWidth - headingWidth) / 2, y);
              pdf.setFontSize(12); // Reset font size
              pdf.setFont("helvetica", "normal");
              y += 20; // Adjust y position to avoid overlap with the heading
  
              // Check if the image height exceeds the page height and scale it down if necessary
              if (imgHeight > pageHeight - margin * 2) {
                const scaleFactor = (pageHeight - margin * 2) / imgHeight;
                imgHeight *= scaleFactor;
                imgWidth *= scaleFactor;
              }
  
              pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight, undefined, "FAST");
  
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
    const parsedHtml = parser.parseFromString(text, 'text/html');
    parsedHtml.body.childNodes.forEach((node: ChildNode) => {
      if (node.nodeType === Node.TEXT_NODE) {
        lines.push({ text: node.textContent, style: 'normal' });
      } else if (node.nodeName === 'B') {
        lines.push({ text: node.textContent, style: 'bold' });
      } else if (node.nodeName === 'I') {
        lines.push({ text: node.textContent, style: 'italic' });
      }
    });
    return lines;
  };

  if(session === undefined && fileData === null) return <Loader />

  return !isError ? (
    <div className="overflow-x-hidden">
      <WorkspaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        name={fileData?.fileName || "New Document"}
        setFullScreen={setFullScreen}
        setFileData={setFileData}
        onSaveAsPdf={saveAsPdf}
      />

{ fileData &&      <div className={`grid grid-cols-1 ${fullScreen ? "" : "md:grid-cols-2"} overflow-x-none`}>
        <div className={`${fullScreen ? "hidden" : "block"}`}>
          <Editor
            whiteboardData={whiteBoardData}
            ref={editorRef as MutableRefObject<EditorJS | null>}
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData!}
            user={user}
          />
        </div>
        <div className={`h-screen border-l`}>
          <Canvas
            whiteBoardData={whiteBoardData}
            setWhiteBoardData={setWhiteBoardData}
            ref={canvasRef as MutableRefObject<any>}
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            user={user}
            fileData={fileData!}
          />
        </div>
      </div>}
    </div>
  ) : (
    <PrivateAlert errorMsg={errorMsg} />
  )
}

export default Workspace;
