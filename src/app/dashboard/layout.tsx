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
import { Button } from "@/components/ui/button";
function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = useConvex();
  const { isAuthenticated } = useKindeBrowserClient();
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.value);
  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("teams/create");
    }
  };

  return isAuthenticated ? (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="md:grid md:grid-cols-4">
          <div
            className={`bg-background z-99  h-screen md:w-72 w-36 fixed ${count ? "" : "md:relative hidden"}`}
          >
            <SideNav />
          </div>
          <div className="col-span-4 md:ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  ) : (
    <div className="flex  justify-center items-center w-[75%] h-screen">
      <div>
        You have to{" "}
        <Button asChild>
          <LoginLink>Login</LoginLink>
        </Button>{" "}
        to see this page
      </div>
    </div>
  );
}

export default DashboardLayout;
