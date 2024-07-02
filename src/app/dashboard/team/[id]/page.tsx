"use client";
import { RootState } from "@/app/store";
import MemberCarousel, { USER } from "@/components/shared/MemberCarousel";
import axiosInstance from "@/config/AxiosInstance";
import { getTeamMembersData } from "@/lib/API-URLs";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileList from "../_components/FileList";
import { FileListContext } from "@/app/_context/FilesListContext";
import { toggleClose } from "@/app/Redux/Menu/menuSlice";

export default function Page({ params }: { params: { id: string } }) {
  const teamId = params.id;
  const [teamMembersData, setData] = useState(null);
  const [focusedUser, setFocusedUser] = useState<USER | null>(null);
  const [fileList, setFileList] = useState<any>();
  const { fileList_ } = useContext(FileListContext);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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
      <div className="flex items-center justify-start gap-2 p-2 px-4">
      {!count && (
        <button
          title="Close"
          className="md:hidden relative"
          onClick={() => {
            dispatch(toggleClose());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </button>
      )}
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

      <div className=" w-full px-16">
        {focusedUser !== null && (
          <FileList user={focusedUser} fileList={fileList} />
        )}
      </div>
    </div>
  );
}
