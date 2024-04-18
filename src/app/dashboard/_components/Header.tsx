import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Header({ setFileList }: { setFileList: (fileList: any) => void }) {
  const { user }: any = useKindeBrowserClient();

  //Implement search functionality here
  const searchFile = (searchTerm: string) => {
    const fileList: any = [];
    const filteredFileList = fileList.filter((file: any) =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //Update the file list
    setFileList(filteredFileList);
  };

  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex-center border overflow-hidden rounded-lg px-2 p-1">
        <Search size={24} />
        <Input
          type="text"
          placeholder="Search file..."
          className="border-0 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex gap-2 items-center mx-2">
        <ThemeTogglebutton />
        <Image
          src={user?.picture || "https://picsum.photos/50"}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <Button>
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
}

export default Header;
