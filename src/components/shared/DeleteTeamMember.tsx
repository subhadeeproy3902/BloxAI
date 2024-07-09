"use client";
import React, { useState } from "react";
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
import { Button } from "../ui/button";
import { CheckCircle2, Trash2 } from "lucide-react";
import axiosInstance from "@/config/AxiosInstance";
import { deleteTeamMemberUrl } from "@/lib/API-URLs";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
};

export default function DeleteTeamMember({ email }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const teamId = useSelector((state: RootState) => state.team.teamId);
  const [isError,setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const DeleteHandler = async () => {
    try {
      axiosInstance.put(`${deleteTeamMemberUrl}/${teamId}`, { email })
      .then((res)=>{
        if(res.status === 200) setIsSubmitted(true);
      }).catch((err)=>{
        setIsError(true);
        setErrorMsg(err.response.data)
      })
    } catch (err:any) {
      setIsError(true);
      setErrorMsg(err.response.data)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size={"icon"} className=" bg-red-600 hover:bg-red-700">
          <Trash2 className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && !isError && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will remove the member from
                the team and files created by the member will be permanently
                deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={() => DeleteHandler()}>Continue</Button>
            </AlertDialogFooter>
          </>
        )}
        {isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex gap-2">
                <p>Team Member Removed Successfully!!</p>{" "}
                <CheckCircle2 className="w-6 h-6" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  router.push('/dashboard')
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
                <p>{errorMsg}</p>{" "}
                <CheckCircle2 className="w-6 h-6" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  router.push('/dashboard')
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
