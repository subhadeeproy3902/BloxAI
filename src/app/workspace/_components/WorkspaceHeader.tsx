import { Button } from "@/components/ui/button";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { THEME } from "@excalidraw/excalidraw";
import { Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

function WorkspaceHeader({ onSave, name }: any) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.webp"} alt="logo" height={40} width={40} />
        <h2>{name}</h2>
      </div>
      <div className="flex items-center gap-4">
        <ThemeTogglebutton/>
        <Button onClick={() => onSave()}>
          <Save className="h-4 w-4 mr-2" /> Save{" "}
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
          }}
        >
          Share <Link className="h-4 w-4 ml-2" />{" "}
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
