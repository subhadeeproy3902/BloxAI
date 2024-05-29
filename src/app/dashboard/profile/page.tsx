"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import UserImage from "./_components/UserImage";
import FileList, { Team } from "./_components/FileList";
import { FileListContext } from "@/app/_context/FilesListContext";
import React, { useContext, useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import TeamList from "./_components/TeamList";

export default function Page() {
  const { user }: any = useKindeBrowserClient();

  const convex = useConvex();

  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  const [teamList, setTeamList] = useState<Team[]>([]);
  const [teamListWithCount, setTeamListCount] = useState<Team[]>([]);

  useEffect(() => {
    const getFileData = async () => {
      const result = await convex.query(api.teams.getTeam, {
        email: user.email,
      });
      setTeamList(result);
    };
    if (user) {
      getFileData();
    }
  }, [user, fileList]);

  useEffect(() => {
    if (teamList.length > 0 && fileList.length > 0) {
      const fileCounts = fileList.reduce(
        (acc: Record<string, number>, file: any) => {
          acc[file.teamId] = (acc[file.teamId] || 0) + 1;
          return acc;
        },
        {}
      );

      const updatedTeams = teamList.map((team) => ({
        ...team,
        fileCount: fileCounts[team._id] || 0,
      }));

      setTeamListCount(updatedTeams);
    }
  }, [fileList, teamList]);

  return (
    <div className="flex relative flex-col gap-5 px-20 pt-10 flex-1 items-start justify-center overflow-y-auto overflow-x-hidden">
      <Link href={"/dashboard"} className=" absolute z-20 top-0 left-0 m-5">
        <ArrowBigLeft className="w-10 h-10" />
      </Link>
      <UserImage image={user?.picture} />
      <div className="flex flex-col gap-2 w-full justify-center text-center">
        <h1 className=" text-xl font-semibold">
          {user?.given_name} {user?.family_name}
        </h1>
        <p className=" text-gray-400 text-lg">{user?.email}</p>
      </div>

      <div className="flex-1 w-full flex flex-col gap-5 py-2 items-center justify-center">
        <h1 className=" px-5 text-start w-full text-xl font-semibold">Teams </h1>
        <TeamList teamList={teamListWithCount} />
      </div>

      <div className="flex-1 w-full flex flex-col gap-5 py-2 items-center justify-center">
        <h1 className=" px-5 text-start w-full text-xl font-semibold">Files </h1>
        <FileList fileList={fileList || null} teamList={teamList} />
      </div>
    </div>
  );
}
