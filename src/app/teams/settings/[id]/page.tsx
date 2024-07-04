"use client";
import MemberCarousel, { USER } from "@/components/shared/MemberCarousel";
import axiosInstance from "@/config/AxiosInstance";
import { getTeamMembersData } from "@/lib/API-URLs";
import FileList, { FILE } from "../_components/FileList";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const teamId = params.id;
  const convex = useConvex();
  const [teamMembersData, setData] = useState(null);
  const [focusedUser, setFocusedUser] = useState<USER | null>(null);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const [updated,setIsUpdated] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await convex.query(api.files.getFiles, { teamId: teamId });
      setFileList(res);
      setIsUpdated(false);
    };

    if (teamId && updated) {
      getData();
    }
  }, [teamId,updated]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`${getTeamMembersData}/${teamId}`);
        setData(res.data.memberData);
      } catch (err) {
        console.log(err);
      }
    };
    if (teamId) {
      getData();
    }
  }, [teamId]);

  return (
    <div className="w-[full] bg-background flex relative flex-col gap-5 flex-1 items-start justify-center overflow-y-auto overflow-x-hidden">
      <div className="flex items-center justify-start p-2 px-4">
        <Link href={"/dashboard"}>
          <ArrowBigLeft className="w-8 h-8" />
        </Link>
        <h1 className="text-lg font-bold w-full text-center sm:text-start sm:p-4">
          Team Settings
        </h1>
      </div>

      {teamMembersData !== null && (
        <div className="flex items-center justify-center w-full">
          <MemberCarousel
            setFocusedUser={setFocusedUser}
            focusedUser={focusedUser}
            teamMembersData={teamMembersData}
          />
        </div>
      )}

      <div className=" w-full px-10">
        {focusedUser !== null && (
          <FileList setIsUpdated={setIsUpdated} teamId={teamId} user={focusedUser} fileList={fileList} />
        )}
      </div>
    </div>
  );
}
