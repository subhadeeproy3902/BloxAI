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
import { RootState } from "@/app/store";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useState,useContext,useEffect } from "react";

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
  return (
    <Dialog key={index}>
      <DialogTrigger
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



        <DialogFooter className=" text-gray-500">Email : {email}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
