"use client";
import { EyeIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { FILE } from "@/app/dashboard/team/_components/FileList";
import { USER } from "./MemberCarousel";
import axiosInstance from "@/config/AxiosInstance";
import { updateReadAccessUrl } from "@/lib/API-URLs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type Props = {
  file:FILE;
  focusedUser:USER;
}

export default function ReadAccessModal({file,focusedUser}:Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const teamId = useSelector((state:RootState) => state.team.teamId);
  const { user }: any = useKindeBrowserClient();
  console.log(focusedUser)

  const SubmitHandler = async() => {
    setIsSubmitted(true);

    if(file.readBy && file.readBy.includes(focusedUser.email)){
      console.log("added!!")
    }else{
      try {
        await axiosInstance.post(`${updateReadAccessUrl}`,{
          teamId,
          email:user.email, 
          memberEmail:focusedUser.email, 
          readBy: (file.readBy !== undefined ? file.readBy : []) , 
          fileId:file._id
        })
        .then((res)=>{
          if(res.status === 200) setIsSubmitted(true)
        })
      } catch (err) {
        console.log(err)
      }
    }

  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setIsSubmitted(false);
      }}
    >
      <DialogTrigger>
        <Button variant={"secondary"} size="icon">
          <EyeIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>
                <h1>Read File Access</h1>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              { (!file?.readBy?.includes(focusedUser.email) && "This will give the read file access to the member!!")}
              {file.readBy && file.readBy.includes(focusedUser.email) && "This will remove the read file access from the member!!"}
            </DialogDescription>
            <div className=" flex gap-2">
              <Button onClick={() => setOpen(false)} variant={"secondary"}>
                Cancel
              </Button>
              <Button onClick={() => SubmitHandler()}>Continue</Button>
            </div>
          </>
        )}

        {isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>Read File Access granted!!</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => window.location.reload()}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
