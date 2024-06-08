"use client";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
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
} from "@/components/ui/alert-dialog";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Terms from "@/components/shared/TermsDiv";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page({ params }: any) {
  const convex = useConvex();
  const { id } = params;
  const [teamData, setTeamData] = useState<any>(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user }: any = useKindeBrowserClient();
  const { isAuthenticated } = useKindeBrowserClient();

  const [firstForm, setFirstForm] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getTeamData = async () => {
      const result = await convex.query(api.teams.getTeamById, {
        _id: id,
      });
      if (result) {
        console.log(isDialogOpen);
        setIsError(false);
        setTeamData(result);
        setIsDialogOpen(true);
      } else {
        console.log(isDialogOpen);
        setIsDialogOpen(true);
        setErrorMsg("Invalid Invite Link!!");
        setIsError(true);
      }
    };
    if (user && isAuthenticated) {
      getTeamData();
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !isAuthenticated && !isDialogOpen && !teamData) {
        setIsDialogOpen(true);
        setErrorMsg("Unauthorized Access!!");
        setIsError(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [user]);

  const AddUserToMember = async () => {};

  if (!isDialogOpen) return <Loader />;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger className="hidden">
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="overflow-hidden">
          {isDialogOpen && !isError && (
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
                        <span className="font-bold">{teamData.createdBy}</span>
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
                    <Checkbox checked={checked} onCheckedChange={()=>setChecked(!checked)} id="terms" />
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
                    <AlertDialogCancel>
                      <p>Cancel</p>
                    </AlertDialogCancel>
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
          {!user && !isAuthenticated && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Unauthorized Access!!</AlertDialogTitle>
                <AlertDialogDescription className="w-full">
                  <p>Register or Login to your account.</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Link
                  className="bg-primary p-2 rounded-lg px-3 text-secondary"
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
