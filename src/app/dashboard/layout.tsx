"use client";
import { api } from "../../../convex/_generated/api";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import Image from "next/image";
function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createTeam = useMutation(api.teams.createTeam);
  const convex = useConvex();
  const { isAuthenticated } = useKindeBrowserClient();
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.value);
  const [hasCheckedTeam, setHasCheckedTeam] = useState(false);

  useEffect(() => {
    if (user && !hasCheckedTeam) {
      checkTeam();
    }
  }, [user, hasCheckedTeam]);

  const checkTeam = async () => {
    setHasCheckedTeam(true);
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      createTeam({
        teamName: `${user.given_name} Org`,
        createdBy: user?.email,
        teamMembers: [user.email],
      }).then((resp) => {
        if (resp) {
          router.push("/dashboard");
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (!isAuthenticated && !loading)
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
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Welcome!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          To access this page, please{" "}
          <Button asChild>
            <LoginLink className="text-blue-600 underline hover:text-blue-800 transition duration-300">
              Login
            </LoginLink>
          </Button>.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Don&apos;t have an account? <a href="/signup" className="text-orange-600 underline hover:text-blue-800 transition duration-300">Sign Up</a>
        </p>
      </div>
    </div>
    );

  return !loading ? (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="md:grid md:grid-cols-4">
          <div
            className={`bg-background z-[2]  h-screen md:w-72 w-36 fixed ${count ? "" : "md:relative hidden"}`}
          >
            <SideNav />
          </div>
          <div className="col-span-4 md:ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  ) : (
    <Loader />
  );
}

export default DashboardLayout;
