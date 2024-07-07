"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useState, useContext, useEffect } from "react";
import { FILE } from "@/app/dashboard/page";
import { Badge } from "../ui/badge";

type Props = {
  image: string;
  name: string;
  index: number;
  email: string;
  createdBy: string;
};

export default function MemberModal({
  image,
  name,
  index,
  createdBy,
  email,
}: Props) {
  const teamName = useSelector((state: RootState) => state.team.teamName);
  const [fileData, setFileList] = useState([]);
  const { fileList_ } = useContext(FileListContext);

  useEffect(() => {
    if (fileList_) {
      const nonArchivedFiles = fileList_.filter(
        (file: { archive: boolean }) => !file.archive
      );
      setFileList(nonArchivedFiles);
    }
  }, [fileList_]);

  return (
    <Dialog key={index}>
      <DialogTrigger
        key={index}
        className={`z-[${index + 10}]  ${index == 0 && "left-0"} ${index == 1 && "left-8"} ${index == 2 && " left-16"} ${index == 3 && " left-24"}  absolute  `}
      >
        <Avatar className="w-[40px] border-2 border-gray-400 h-[40px]">
          <AvatarImage src={image} />
          <AvatarFallback className=" text-xs">{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-3 items-center justify-start">
            <Avatar className="w-[30px] border-2 border-gray-400 h-[30px]">
              <AvatarImage src={image} />
              <AvatarFallback className=" text-xs">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {name}
          </DialogTitle>
          <DialogDescription>
            {createdBy === email ? "Owner" : "Member"} of{" "}
            <span className=" font-bold">{teamName}</span>
          </DialogDescription>
        </DialogHeader>

        {
          <div className="flex flex-col max-h-[350px] p-2 overflow-x-hidden overflow-y-auto">
            <div className="flex font-semibold p-2 text-base items-center justify-between w-full">
              <h1>File Name</h1>
              <h1>File Access</h1>
            </div>
            {fileData.map((file: FILE, index) => (
              <div
                className="w-full bg-secondary border-t-[1px] border-gray-400 flex p-2 items-center justify-between"
                key={index}
              >
                <h1>{file.fileName}</h1>

                <div className="flex gap-3">
                  {file.readBy && file.readBy.includes(email) && (
                    <Badge>Read</Badge>
                  )}
                  {file.writtenBy && file.writtenBy.includes(email) && (
                    <Badge>Write</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        }

        <DialogFooter className=" text-gray-500">Email : {email}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
