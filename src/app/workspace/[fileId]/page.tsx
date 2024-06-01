"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    params.fileId && getFileData();
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    setFileData(result);
  };


  console.log(fullScreen)

  return (
    <div className="overflow-x-hidden">
      <WorkspaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        name={fileData?.fileName || "New Document"}
        setFullScreen={setFullScreen}
      />

      <div className={`grid grid-cols-1 ${fullScreen ? "": "md:grid-cols-2"} overflow-x-none`}>
        <div className={`${fullScreen ? "hidden" : "block"}
        `}>
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
        </div>
        
        <div
          className={`h-screen border-l`}
        >
          {/*Render the 
          Canvas component here.
          */}
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
