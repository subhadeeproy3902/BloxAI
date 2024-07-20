"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Terms from "@/components/shared/TermsDiv";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import axios from "axios";
import {  addTeamMemberUrl, getTeamByIdUrl } from "@/lib/API-URLs";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { toast } from "sonner";

export default function Page({ params }: any) {
  const { id } = params;
  const router = useRouter();
  const [teamData, setTeamData] = useState<any>(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const user = useSelector((state:RootState)=>state.auth.user)
  const axiosInstance = createAxiosInstance(user.accessToken);
  const [firstForm, setFirstForm] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getTeamData = async () => {
      const result = await axios.get(`${getTeamByIdUrl}/${id}`);
      if (result) {
        setErrorMsg("");
        setIsError(false);
        setTeamData(result.data);
        setIsDialogOpen(true);
      } else {
        setIsDialogOpen(true);
        setErrorMsg("Invalid Invite Link!!");
        setIsError(true);
        setTeamData("Invalid Link");
        setIsValidLink(false);
      }
    };
    getTeamData();
  }, []);

  const AddUserToMember = async () => {
    if (!user || !user.isAuth) {
      setErrorMsg("Unauthorized Access!");
      setIsError(true);
      return;
    }

    if (
      teamData.teamMembers?.includes(user.email) ||
      teamData.createdBy == user.email
    ) {
      setErrorMsg(`Already member of ${teamData.teamName}`);
      setIsError(true);
      return;
    }

    // API
    try {
      axiosInstance.post(addTeamMemberUrl,{teamId:id})
      toast.success(`Welcome to ${teamData.teamName}`)
    } catch (err) {
      console.log(err);
    }


    router.push("/dashboard");
  };

  if (!isDialogOpen) return <Loader />;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger className="hidden">
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="overflow-hidden">
          {isDialogOpen && teamData && !isError && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <h1>{firstForm ? "Join Team" : "Terms and Conditions"}</h1>
                </AlertDialogTitle>
                <AlertDialogDescription className="h-[400px] overflow-y-auto">
                  {firstForm ? (
                    <>
                      <p>
                        Invitaion for joining team :
                        <span className="font-bold">{teamData.teamName}</span>
                      </p>
                      <p>
                        Created By :
                        <span className="font-bold">{teamData.createdBy.firstName}{" "}{teamData.createdBy.lastName}</span>
                      </p>
                      <div className="flex items-center justify-center">
                        <Image
                          className=""
                          src={"/teamInvite.svg"}
                          width={350}
                          height={140}
                          alt=""
                        />
                      </div>
                    </>
                  ) : (
                    <Terms />
                  )}
                </AlertDialogDescription>
                {!firstForm && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => setChecked(!checked)}
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                {firstForm && (
                  <>
                    <Button
                      variant={"secondary"}
                      onClick={() => router.push("/")}
                    >
                      <p>Cancel</p>
                    </Button>
                    <Button
                      onClick={() => {
                        setFirstForm(false);
                      }}
                    >
                      Next!
                    </Button>
                  </>
                )}
                {!firstForm && (
                  <>
                    <Button
                      onClick={() => {
                        setFirstForm(true);
                      }}
                      variant="secondary"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        AddUserToMember();
                      }}
                      disabled={!checked}
                    >
                      Join!✌️
                    </Button>
                  </>
                )}
              </AlertDialogFooter>
            </>
          )}
          {isError && isDialogOpen && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>{errorMsg}</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Link
                  className="bg-primary text-white p-2 rounded-lg px-3 text-secondary"
                  href={"/"}
                >
                  Home
                </Link>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
