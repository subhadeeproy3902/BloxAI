"use client";
import { EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SetStateAction, useState } from "react";
import { updateReadAccessUrl } from "@/lib/API-URLs";
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
import { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import { FILE } from "@/types/types";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { useRouter } from "next/navigation";

type Props = {
  file: FILE;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
  focusedUser: any;
};

export default function ReadAccessModal({
  file,
  focusedUser,
  setIsUpdated,
}: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state:RootState) => state.auth.user);
  const axiosInstance = createAxiosInstance(user.accessToken);
  const router = useRouter();
  const [errorMsg,setErrorMsg] = useState("");

  const SubmitHandler = async () => {
    if (file.readBy && file.readBy.includes(focusedUser._id)) {
      try {
        const res = await axiosInstance.put(`${updateReadAccessUrl}`, {
          userId:focusedUser._id,
          fileId: file._id
        });
        if (res.status === 200) setIsSubmitted(true);
      } catch (err:any) {
        console.log(err);
        setErrorMsg(err.response.data)
      }
    } else {
      try {
        const res = await axiosInstance.post(`${updateReadAccessUrl}`, {
          userId:focusedUser._id,
          fileId: file._id
        });
        if (res.status === 200) setIsSubmitted(true);
      } catch (err:any) {
        console.log(err);
        setErrorMsg(err.response.data)
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
        {!isSubmitted && errorMsg === "" && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <h1>Read File Access</h1>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {!file?.readBy?.includes(focusedUser._id) &&
                "This will give the read file access to the member!!"}
              {file.readBy &&
                file.readBy.includes(focusedUser._id) &&
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
                {!file?.readBy?.includes(focusedUser._id) &&
                  "Read File Access Granted!!"}
                {file.readBy &&
                  file.readBy.includes(focusedUser._id) &&
                  "Read File Access Removed!!"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsUpdated(true);
                  setIsSubmitted(false);
                  router.refresh()
                }}
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}

{!isSubmitted && errorMsg !== "" && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {errorMsg}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsUpdated(true);
                  setIsSubmitted(false);
                  setErrorMsg("")
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
