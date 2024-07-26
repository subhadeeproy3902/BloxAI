"use client";
import { api } from "../../../convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../config/store";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import Image from "next/image";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { createNewTeamUrl, getTeamUrl } from "@/lib/API-URLs";
import { toast } from "sonner";
import { setTeamInfo } from "../Redux/Team/team-slice";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const createTeam = useMutation(api.teams.createTeam);
  const convex = useConvex();
  const [fileList_, setFileList_] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.value);
  const user = useSelector((state: RootState) => state.auth.user);
  const [hasCheckedTeam, setHasCheckedTeam] = useState(false);
  const dispatch = useDispatch();
  const axiosInstance = createAxiosInstance(user.accessToken);

  console.log(session)

  useEffect(() => {
    if (session && !hasCheckedTeam) {
      checkTeam();
    }
  }, [session, hasCheckedTeam]);

  const checkTeam = async () => {
    try {
      const res = await axiosInstance.get(getTeamUrl)
  
      if (!res.data.length) {
        const res2 = await axiosInstance.post(createNewTeamUrl,{
          teamName:`${user.firstName}'s Org`
        });

        if(res2.status === 200){
          toast.success(`Welcome to ${user.firstName}'s Org`)
        }
        
        dispatch(setTeamInfo({teamId:res2.data._id,teamName:res2.data.teamName}));
      }
      setHasCheckedTeam(true);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (session === null || status !== "authenticated")
    return (
      <div className="relative flex justify-center items-center w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/login.png"
            alt="Background"
            layout="fill"
            objectFit="contain" // Use 'cover' for full coverage
            className="z-0"
          />
        </div>
        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full text-center z-10">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Welcome!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To access this page, please{" "}
            <Button asChild>
              <Link href={"/signin"}>Login</Link>
            </Button>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Don&apos;t have an account?
            <span className="text-orange-600 underline hover:text-blue-800 transition duration-300">
              <Link href={"/signup"}>Signup</Link>
            </span>
          </p>
        </div>
      </div>
    );

  return !loading || session === undefined ? (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <SessionProvider>
          <div className="md:grid md:grid-cols-4">
            <div
              className={`bg-background z-[2]  h-screen md:w-72 w-36 fixed ${count ? "" : "md:relative hidden"}`}
            >
              <SideNav />
            </div>
            <div className="col-span-4 md:ml-72">{children}</div>
          </div>
        </SessionProvider>
      </FileListContext.Provider>
    </div>
  ) : (
    <Loader />
  );
}

export default DashboardLayout;
