"use client";
import type { RootState } from "../store";
import { FileListContext } from "@/app/_context/FilesListContext";
import { api } from "../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import FileList from "./_components/FileList";
import { useState, useContext, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import { toggleClose } from "../Redux/Menu/menuSlice";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import SideNav from "./_components/SideNav";
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
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
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

  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>(undefined);

  useEffect(() => {
    if (fileList_) {
      const nonArchivedFiles = fileList_.filter(
        (file: { archived: boolean }) => !file.archived
      );
      setFileList(nonArchivedFiles);
    }
  }, [fileList_]);

  const searchFile = (searchTerm: string) => {
    const filteredFileList = fileList_.filter((file: any) =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFileList(filteredFileList);
  };



  return  (
    <div className="md:grid md:grid-cols-4">
      <div
        className={`bg-background z-99  h-screen md:w-72 w-36 fixed ${count ? "" : "md:relative hidden"}`}
      >
        <SideNav />
      </div>
      <div className="col-span-4 md:ml-72">
        <div className="md:p-8 p-3">
          <div className="flex justify-end w-full md:gap-2 gap-3 items-center">
            {!count && (
              <button
                className="md:hidden relative"
                onClick={() => {
                  dispatch(toggleClose());
                  console.log(count);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
              </button>
            )}
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
              <Link href={`/dashboard/profile`}>
                <Image
                  src={user?.picture || "https://picsum.photos/50"}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            </div>
            <Button>
              <Send className="h-4 w-4" /> Invite
            </Button>
          </div>
          <FileList
            fileList={fileList || null}
            picture={user?.picture || "https://picsum.photos/50"}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
