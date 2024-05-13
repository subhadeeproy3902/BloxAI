import React, { useEffect, useState } from "react";
import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { useMutation } from "convex/react";
import { useTheme } from "next-themes";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const { theme } = useTheme();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);
  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).catch((e) => {
      toast.error("Failed to save whiteboard!");
    });
  };

  const [mermaidCode, setMermaidCode] = useState<string>("");

  const handleMermaidToExcalidraw = async () => {
    const mermaidCode = `flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
    `;

    try {
      const { elements } = await parseMermaidToExcalidraw(mermaidCode, {
        fontSize: 16, // Example font size
      });


      // Set the converted elements to the state
      setWhiteBoardData(elements);
    } catch (e) {
      console.error("Failed to parse Mermaid syntax:", e);
    }
  };


  return (
    <>
      <Button onClick={handleMermaidToExcalidraw}>Prompt</Button>
      <div style={{ height: "670px" }}>
        {fileData && (
          <>
            {/*Render the whiteboard data too if the mermaid code is converted to excalidraw elements*/}

            <Excalidraw
              theme={theme === "dark" ? "dark" : "light"}
              initialData={{
                elements:
                  whiteBoardData?.length > 0
                    ? whiteBoardData
                    : fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
              }}
              onChange={(excalidrawElements, appState, files) => {
                if (whiteBoardData?.length > 0) {
                  return;
                } else {
                  setWhiteBoardData(excalidrawElements);
                }
              }}
              UIOptions={{
                canvasActions: {
                  changeViewBackgroundColor: true,
                  saveToActiveFile: true,
                  loadScene: true,
                  export: { saveFileToDisk: true },
                  toggleTheme: true,
                  saveAsImage: true,
                },
              }}
            >
              <MainMenu>
                <MainMenu.DefaultItems.ClearCanvas />
                <MainMenu.DefaultItems.SaveAsImage />
                <MainMenu.DefaultItems.ChangeCanvasBackground />
              </MainMenu>
              <WelcomeScreen>
                <WelcomeScreen.Hints.MenuHint />
                <WelcomeScreen.Hints.MenuHint />
                <WelcomeScreen.Hints.ToolbarHint />
                <WelcomeScreen.Center>
                  <WelcomeScreen.Center.MenuItemHelp />
                </WelcomeScreen.Center>
              </WelcomeScreen>
            </Excalidraw>
          </>
        )}
      </div>
    </>
  );
}

export default Canvas;
