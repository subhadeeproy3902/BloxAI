"use client"
import { forwardRef, useImperativeHandle, SetStateAction, Dispatch } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { useTheme } from "next-themes";
import { FILE } from "@/types/types";

const Canvas = forwardRef(({
  onSaveTrigger,
  fileId,
  fileData,
  whiteBoardData,
  setWhiteBoardData
}: {
  user:any;
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
  whiteBoardData:any;
  setWhiteBoardData:Dispatch<SetStateAction<any>>;
}, ref) => {
  
  const { theme } = useTheme();

  useImperativeHandle(ref, () => ({
    getSceneElements: () => whiteBoardData,
    getAppState: () => ({ viewBackgroundColor: "#e6e6e6" }),
    getFiles: () => [], // Implement getFiles based on your app's requirements
  }));

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
      {/* <Button onClick={handleMermaidToExcalidraw}>Prompt</Button> */}
      <div className="h-full">
        {fileData && (
          <>
            {/* Render the whiteboard data too if the mermaid code is converted to excalidraw elements */}

            <Excalidraw
              theme={theme === "dark" ? "dark" : "light"}
              initialData={{
                elements:
                  whiteBoardData?.length > 0
                    ? whiteBoardData
                    : fileData?.whiteboard && fileData?.whiteboard,
                appState: {
                  viewBackgroundColor: "#e6e6e6",
                },
              }}
              onChange={(excalidrawElements, appState, files) => {
                setWhiteBoardData(excalidrawElements);
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
});

Canvas.displayName = "Canvas";

export default Canvas;
