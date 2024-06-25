import { Button } from "@/components/ui/button";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Link2, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenAIModal } from "@/components/shared/AiModal";

function WorkspaceHeader({ onSave, onSaveAsPdf, name, setFullScreen, setFileData }: any) {
  return (
    <>
      <div className="p-3 border-b flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href={"/dashboard"}>
            <Image
              src={"/android-chrome-192x192.png"}
              alt="logo"
              height={40}
              width={40}
            />
          </Link>

          <h2>{name}</h2>
        </div>
        <div className="flex items-center gap-4">
          <ThemeTogglebutton />
          <Button onClick={() => onSave()}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button onClick={() => onSaveAsPdf()}>
            Save as PDF
          </Button>
        </div>
      </div>

      <div className="m-2 flex gap-4">
        <Tabs
          defaultValue="False"
          onValueChange={(val) => {
            val === "True" ? setFullScreen(true) : setFullScreen(false);
          }}
        >
          <TabsList>
            <TabsTrigger value="False">With Editor</TabsTrigger>
            <TabsTrigger value="True">FullScreen</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          className="bg-green-500 hover:bg-green-600 flex gap-2"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
          }}
        >
          <p className="hidden sm:inline">
            Share
          </p>
          <Link2 className="h-4 w-4" />
        </Button>
        <GenAIModal setFileData={setFileData} />
      </div>
    </>
  );
}

export default WorkspaceHeader;
