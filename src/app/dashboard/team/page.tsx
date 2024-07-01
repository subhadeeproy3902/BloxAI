"use client";
import { RootState } from "@/app/store";
import MemberCarousel, { USER } from "@/components/shared/MemberCarousel";
import axiosInstance from "@/config/AxiosInstance";
import { getTeamMembersData } from "@/lib/API-URLs";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileList from "./_components/FileList";
import { FileListContext } from "@/app/_context/FilesListContext";

export default function Page() {
  const teamId = useSelector((state: RootState) => state.team.teamId);
  const [teamMembersData, setData] = useState(null);
  const [focusedUser, setFocusedUser] = useState<USER | null>(null);
  const [fileList, setFileList] = useState<any>();
  const { fileList_ } = useContext(FileListContext);

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`${getTeamMembersData}/${teamId}`);
        console.log(res.data);
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
      <h1 className="text-lg font-bold w-full text-center sm:text-start sm:p-4">Team Settings</h1>

      {teamMembersData !== null && (
        <div className="flex items-center justify-center w-full">
          <MemberCarousel setFocusedUser={setFocusedUser} focusedUser={focusedUser} teamMembersData={teamMembersData} />
        </div>
      )}

      <div className=" w-full px-10">
      {focusedUser !== null && <FileList user={focusedUser} fileList={fileList} />}
      </div>
    </div>
  );
}
