import { Button } from "@/components/ui/button";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Link2, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

function WorkspaceHeader({ onSave, name }: any) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
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
          <Save className="h-4 w-4 mr-2" /> Save{" "}
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
          }}
        >
          Share <Link2 className="h-4 w-4 ml-2" />{" "}
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
