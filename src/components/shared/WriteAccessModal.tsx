"use client";
import { Edit3Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { SetStateAction, useState } from "react";
import { FILE } from "@/app/teams/settings/_components/FileList";
import { USER } from "./MemberCarousel";
import axiosInstance from "@/config/AxiosInstance";
import { updateWriteAccessUrl } from "@/lib/API-URLs";
import { RootState } from "@/config/store";
import { useSelector } from "react-redux";

type Props = {
  file: FILE;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
  focusedUser: USER;
  teamId: string;
};

export default function WriteAccessModal({
  file,
  focusedUser,
  teamId,
  setIsUpdated,
}:Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state:RootState) => state.auth.user);


  const SubmitHandler = async () => {
    if (file.writtenBy && file.writtenBy.includes(focusedUser.email)) {
      try {
        const res = await axiosInstance.put(`${updateWriteAccessUrl}`, {
          teamId,
          email: user.email,
          memberEmail: focusedUser.email,
          writtenBy: file.writtenBy !== undefined ? file.writtenBy : [],
          fileId: file._id,
        });
        if (res.status === 200) setIsSubmitted(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axiosInstance.post(`${updateWriteAccessUrl}`, {
          teamId,
          email: user.email,
          memberEmail: focusedUser.email,
          writtenBy: file.writtenBy !== undefined ? file.writtenBy : [],
          fileId: file._id,
          readBy:file.readBy
        });
        if (res.status === 200) setIsSubmitted(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button variant={"secondary"} size="icon">
          <Edit3Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <h1>Write File Access</h1>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {!file?.writtenBy?.includes(focusedUser.email) &&
                "This will give the write file access to the member!!"}
              {file.writtenBy &&
                file.writtenBy.includes(focusedUser.email) &&
                "This will remove the write file access from the member!!"}
            </AlertDialogDescription>
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
            <AlertDialogHeader>
              <AlertDialogTitle>
                {!file?.writtenBy?.includes(focusedUser.email) &&
                  "Write File Access Granted!!"}
                {file.writtenBy &&
                  file.writtenBy.includes(focusedUser.email) &&
                  "Write File Access Removed!!"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsUpdated(true);
                  setIsSubmitted(false)
                }}
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
