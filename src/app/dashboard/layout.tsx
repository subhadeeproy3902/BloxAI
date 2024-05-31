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
import Loader from "@/components/shared/Loader";
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
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
          {children}
      </FileListContext.Provider>
  ) : (
    <Loader />
  );
}

export default DashboardLayout;
