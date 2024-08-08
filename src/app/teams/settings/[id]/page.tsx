"use client";
import MemberCarousel from "@/components/shared/MemberCarousel";
import { getFileUrl, getTeamMembersData } from "@/lib/API-URLs";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { FILE } from "@/types/types";
import FileList from "../_components/FileList";

export default function Page({ params }: { params: { id: string } }) {
  const teamId = params.id;
  const [teamMembersData, setData] = useState(null);
  const [focusedUser, setFocusedUser] = useState<any | null>(null);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const [updated,setIsUpdated] = useState(true);
  const user = useSelector((state:RootState) => state.auth.user);
  const axiosInstance = createAxiosInstance(user.accessToken);


  useEffect(() => {

    const getFiles = async () => {
      const result = await axiosInstance.get(`${getFileUrl}/${teamId}`);
      setFileList(result.data);
    };

    if (teamId && updated) {
      getFiles();
    }
  }, [teamId,updated]);

  console.log(fileList)

  useEffect(()=>{
    const getData = async() => {
      const res = await axiosInstance.get(`${getTeamMembersData}/${teamId}`);
      setData(res.data)
    }
    getData()

  },[])

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
        {focusedUser !== null && 
          <FileList setIsUpdated={setIsUpdated} teamId={teamId} user={focusedUser} fileList={fileList} />
        }
      </div>
    </div>
  );
}
