"use client";

import { FileListContext } from "@/app/_context/FilesListContext";
import { api } from "../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import FileList from "./_components/FileList";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Search, Send } from "lucide-react";
import Image from "next/image";

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function Dashboard() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();

  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  //Implement search functionality here
  //Take ref to the search input then filter the file list based on the search term and update the file list state always even if the search term is empty (show all the files)

  const searchFile = (searchTerm: string) => {
    const filteredFileList = fileList_.filter((file: any) =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFileList(filteredFileList);
  };



  return (
    <div className="p-8">
      <div className="flex justify-end w-full gap-2 items-center">
        <div className="flex-center border overflow-hidden rounded-lg px-2 p-1">
          <Search size={24} />
          <Input
            type="text"
            placeholder="Search file..."
            className="border-0 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => searchFile(e.target.value)}
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

      <FileList
        fileList={fileList}
        picture={user?.picture || "https://picsum.photos/50"}
      />
    </div>
  );
}

export default Dashboard;
