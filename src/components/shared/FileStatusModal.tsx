import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { changeToPublicUrl, updateFileUrl } from "@/lib/API-URLs";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { CheckCircle2 } from "lucide-react";
import { FILE } from "@/types/types";

type Props = {
  dialogTitle: string;
  dialogDescription: string;
  successTitle: string;
  privateFIle: boolean;
  file: FILE;
  user: any;
};

export default function FileStatusModal({
  dialogTitle,
  dialogDescription,
  successTitle,
  privateFIle,
  file,
  user,
}: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const axiosInstance = createAxiosInstance(user.accessToken)

  const FileHandler = async () => {
    if (!privateFIle) {
      try {
        const res = await axiosInstance.put(updateFileUrl, {
          fileName:file.fileName, 
          filePrivate:true, 
          fileId:file._id,
          archive: (file.archive === undefined) ? false : file.archive
        });
        if (res.status === 200) {
          setIsSubmitted(true);
        } else {
          setError(true);
          setErrorMsg("Error occured!! Please try again later!!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axiosInstance.put(updateFileUrl, {
          fileName:file.fileName, 
          filePrivate:false, 
          fileId:file._id,
          archive: (file.archive === undefined) ? false : file.archive
        });
        if (res.status === 200) {
          setIsSubmitted(true);
        } else {
          setError(true);
          setErrorMsg("Error occured!! Please try again later!!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge variant={"secondary"} className=" text-gray-200/90">
          {!privateFIle ? "Public" : "Private"}
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={() => {FileHandler()}}>Continue</Button>
            </AlertDialogFooter>
          </>
        )}

        {isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex gap-2">
                <p>{successTitle}</p> <CheckCircle2 className="w-6 h-6" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  window.location.reload();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}

        {isError && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex gap-2">
                <p>{errorMsg}</p> <CheckCircle2 className="w-6 h-6" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  window.location.reload();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
