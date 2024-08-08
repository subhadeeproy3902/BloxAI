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
import { updateWriteAccessUrl } from "@/lib/API-URLs";
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

export default function WriteAccessModal({
  file,
  focusedUser,
  setIsUpdated,
}:Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state:RootState) => state.auth.user);
  const axiosInstance = createAxiosInstance(user.accessToken);
  const router = useRouter()
  const [errorMsg,setErrorMsg] = useState("");

  const SubmitHandler = async () => {
    if (file.writtenBy && file.writtenBy.includes(focusedUser._id)) {
      try {
        const res = await axiosInstance.put(`${updateWriteAccessUrl}`, {
          fileId: file._id,
          userId: focusedUser._id
        });
        if (res.status === 200) setIsSubmitted(true);
      } catch (err:any) {
        console.log(err);
        setErrorMsg(err.response.data)
      }
    } else {
      try {
        const res = await axiosInstance.post(`${updateWriteAccessUrl}`, {
          fileId: file._id,
          userId: focusedUser._id
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
          <Edit3Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && errorMsg === "" && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <h1>Write File Access</h1>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {!file?.writtenBy?.includes(focusedUser._id) &&
                "This will give the write file access to the member!!"}
              {file.writtenBy &&
                file.writtenBy.includes(focusedUser._id) &&
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
                {!file?.writtenBy?.includes(focusedUser._id) &&
                  "Write File Access Granted!!"}
                {file.writtenBy &&
                  file.writtenBy.includes(focusedUser._id) &&
                  "Write File Access Removed!!"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsUpdated(true);
                  setIsSubmitted(false);
                  router.refresh();
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
                  setErrorMsg("");
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
