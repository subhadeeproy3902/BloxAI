import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";
import { setClose, setOpen } from "@/app/Redux/Menu/menuSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";
// import { RootState } from "@/app/store";

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  // const activeTeamId = useSelector((state: RootState) => state.team.teamId);
  // const activeTeamName = useSelector((state: RootState) => state.team.teamName);
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { setFileList_ } = useContext(FileListContext);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch_nav = useDispatch();

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
  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast.success("File created successfully!");
        }
      },
      (e) => {
        toast.error("Error while creating file");
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
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
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
          activeTeam={activeTeam}
        />
      </div>
    </div>
  );
}

export default SideNav;
