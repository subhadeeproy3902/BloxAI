"use client";
import { EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SetStateAction, useState } from "react";
import { FILE } from "@/app/dashboard/team/_components/FileList";
import { USER } from "./MemberCarousel";
import axiosInstance from "@/config/AxiosInstance";
import { updateReadAccessUrl } from "@/lib/API-URLs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
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

type Props = {
  file: FILE;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
  focusedUser: USER;
  teamId: string;
};

export default function ReadAccessModal({
  file,
  focusedUser,
  teamId,
  setIsUpdated,
}: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const { user }: any = useKindeBrowserClient();

  const SubmitHandler = async () => {
    if (file.readBy && file.readBy.includes(focusedUser.email)) {
      try {
        const res = await axiosInstance.put(`${updateReadAccessUrl}`, {
          teamId,
          email: user.email,
          memberEmail: focusedUser.email,
          readBy: file.readBy !== undefined ? file.readBy : [],
          fileId: file._id,
        });
        if (res.status === 200) setIsSubmitted(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axiosInstance.post(`${updateReadAccessUrl}`, {
          teamId,
          email: user.email,
          memberEmail: focusedUser.email,
          readBy: file.readBy !== undefined ? file.readBy : [],
          fileId: file._id,
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
          <EyeIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <h1>Read File Access</h1>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {!file?.readBy?.includes(focusedUser.email) &&
                "This will give the read file access to the member!!"}
              {file.readBy &&
                file.readBy.includes(focusedUser.email) &&
                "This will remove the read file access from the member!!"}
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
                {!file?.readBy?.includes(focusedUser.email) &&
                  "Read File Access Granted!!"}
                {file.readBy &&
                  file.readBy.includes(focusedUser.email) &&
                  "Read File Access Removed!!"}
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
