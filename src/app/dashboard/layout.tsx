"use client";
import { api } from "../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useMutation } from "convex/react";
function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createTeam = useMutation(api.teams.createTeam);
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.value);
  const [teams, setTeams] = useState(false);

  useEffect(() => {
    user && checkTeam();
  }, [user, teams]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    
    if (!result?.length) {
      createTeam({
        teamName: "My Org",
        createdBy: user?.email,
      }).then((resp) => {
        if (resp) {
          router.push("/dashboard");
        }
      });
      setTeams(true);
    }
  };

  return (
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
  );
}

export default DashboardLayout;
