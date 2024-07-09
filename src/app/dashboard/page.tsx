"use client";
import type { RootState } from "../../config/store";
import { FileListContext } from "@/app/_context/FilesListContext";
import { api } from "../../../convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import FileList from "./_components/FileList";
import { useState, useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Search } from "lucide-react";
import Image from "next/image";
import { toggleClose } from "../Redux/Menu/menuSlice";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import InviteModal from "@/components/shared/InviteModal";
import JoinTeamModal from "@/components/shared/JoinTeamModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  read:boolean;
  write:boolean;
  writtenBy: string[];
  readBy: string[];
}

function Dashboard() {
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);
  const count = useSelector((state: RootState) => state.counter.value);
  const activeTeamId = useSelector((state: RootState) => state.team.teamId);
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState<any>();
  const user = useSelector((state:RootState) => state.auth.user);

  

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.firstName,
        email: user.email,
        image: user.image || "https://picsum.photos/50",
      });
      const res = await convex.query(api.user.getUser, { email: user?.email });
      setUserdata(res[0]);
    } else {
      setUserdata(result[0]);
    }
  };

  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();

  useEffect(() => {
    if (fileList_) {
      const nonArchivedFiles = fileList_.filter(
        (file: { archive: boolean }) => !file.archive
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

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div className="md:p-8 p-3">
      <div className="sm:hidden flex sm:flex-row flex-col justify-between w-full md:gap-2 gap-3 items-center md:justify-end">
        <div className="flex w-full items-center justify-between">
          {!count && (
            <button
              title="Close"
              className="md:hidden relative"
              onClick={() => {
                dispatch(toggleClose());
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
          <div className=" flex-center border overflow-hidden rounded-lg px-2 p-1">
            <Search size={24} />
            <Input
              type="text"
              placeholder="Search file..."
              className="border-0 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => searchFile(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center w-full justify-between mx-2">
          <div className="flex items-center justify-center gap-2">
            <ThemeTogglebutton />
            <Link href={`/dashboard/profile`}>
              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={userData?.image} />
                <AvatarFallback className=" text-xs">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            <InviteModal />
            <JoinTeamModal user={user} />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex justify-between  w-full md:gap-2 gap-3 items-center md:justify-end">
        {!count && (
          <button
            title="Close"
            className="md:hidden relative"
            onClick={() => {
              dispatch(toggleClose());
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
        <div className=" flex-center border overflow-hidden rounded-lg px-2 p-1">
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
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage src={userData?.image} />
              <AvatarFallback className=" text-xs">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <InviteModal />
          <JoinTeamModal user={user} />
        </div>
      </div>
      <FileList
        user={user}
        fileList={fileList || null}
        picture={user.image || "https://picsum.photos/50"}
      />
    </div>
  );
}

export default Dashboard;
