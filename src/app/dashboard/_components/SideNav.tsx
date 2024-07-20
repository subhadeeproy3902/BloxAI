import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import SideNavBottomSection from "./SideNavBottomSection";
import { FileListContext } from "@/app/_context/FilesListContext";
import { setClose, setOpen } from "@/app/Redux/Menu/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/store";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { getFileUrl } from "@/lib/API-URLs";

function SideNav() {
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  // const activeTeamId = useSelector((state: RootState) => state.team.teamId);
  // const activeTeamName = useSelector((state: RootState) => state.team.teamName);
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { setFileList_ } = useContext(FileListContext);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state:RootState)=>state.auth.user)
  const dispatch_nav = useDispatch();
  const axiosInstance = createAxiosInstance(user.accessToken)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setClose());
      } else {
        dispatch(setOpen());
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch_nav]);
    


  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const getFiles = async () => {
    const result = await axiosInstance.get(`${getFileUrl}/${activeTeam._id}`);
    setFileList_(result.data);
    setTotalFiles(result.data?.length);
  };

  return (
    <div
      className={`h-screen fixed md:w-72 w-60 borde-r border-[1px] p-6 flex flex-col bg-background`}
    >
      <button
        className="md:hidden absolute top-4 right-4 mb-2"
        onClick={() => {
          dispatch(setClose());
          setIsSidebarOpen(false);
        }}
      >
        {/* Insert your close icon here */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex-1">
        <SideNavTopSection
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
        getFiles={getFiles}
          totalFiles={totalFiles}
          activeTeam={activeTeam}
        />
      </div>
    </div>
  );
}

export default SideNav;
