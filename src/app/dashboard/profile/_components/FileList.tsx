"use client";
import { useEffect, useState } from "react";
import {
  Loader2,
  Trash2,
  ChevronsUpDown,
  Clock,
  Edit,
  Users,
  CheckCircle2,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FILE, TEAM } from "@/types/types";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { deleteFileUrl } from "@/lib/API-URLs";

const ActionDialog = ({
  buttonIcon: ButtonIcon,
  dialogTitle,
  dialogDescription,
  onAction,
  buttonVariant = "secondary",
  isSubmitted,
  successTitle,
}: {
  buttonIcon: typeof Trash2;
  dialogTitle: string;
  dialogDescription: string;
  onAction: (e: any) => void;
  buttonVariant?:
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | null;
  isSubmitted: boolean;
  successTitle: string;
}) => (
  <AlertDialog>
    <AlertDialogTrigger>
      <Button variant={buttonVariant} size="icon">
        <ButtonIcon className="h-4 w-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      {!isSubmitted && (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={onAction}>Continue</Button>
          </AlertDialogFooter>
        </>
      )}
      {isSubmitted && (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2">
              <p>{successTitle}</p> <CheckCircle2 className="w-6 h-6" />
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                window.location.reload();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      )}
    </AlertDialogContent>
  </AlertDialog>
);

const FileRow = ({
  file,
  teamLookup,
  router,
  onDelete,
  isSubmitted,
}: {
  file: FILE;
  teamLookup: Record<string, string>;
  router: ReturnType<typeof useRouter>;
  onDelete: (e: any, id: string) => void;
  isSubmitted: boolean;
}) => (
  <tr key={file._id} className="odd:bg-muted/50 cursor-pointer">
    <td
      className="whitespace-nowrap px-8 py-2 font-medium"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {file.fileName}
    </td>
    <td
      className="whitespace-nowrap px-8 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {moment(file.createdAt).format("DD MMM YYYY")}
    </td>
    <td
      className="whitespace-nowrap px-8 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {moment(file.createdAt).format("DD MMM YYYY")}
    </td>
    <td className="whitespace-nowrap px-8 py-2 text-muted-foreground">
      {teamLookup[file.teamId] || "Unknown Team"}
    </td>
    <td className="whitespace-nowrap px-8 py-2 text-muted-foreground">
      <ActionDialog
        isSubmitted={isSubmitted}
        successTitle="File Deleted Successfully!!"
        buttonIcon={Trash2}
        dialogTitle="Are you absolutely sure?"
        dialogDescription="This action cannot be undone. This will permanently delete your file and remove your data from our servers."
        onAction={(e) => onDelete(e, file._id)}
        buttonVariant="destructive"
      />
    </td>
  </tr>
);

export default function FileList({
  fileList,
  teamList,
  user
}: {
  user:any;
  fileList?: FILE[];
  teamList: TEAM[];
}) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FILE;
    direction: string;
  } | null>(null);
  const [teamLookup, setTeamLookup] = useState<Record<string, string>>({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const safeFileList = Array.isArray(fileList) ? fileList : [];

  const axiosInstance = createAxiosInstance(user.accessToken)

  const sortedFiles = [...safeFileList];
  if (sortConfig !== null) {
    sortedFiles.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const deleteFunc = async (e: any, id: string) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`${deleteFileUrl}/${id}`)
      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const requestSort = (key: keyof FILE) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const lookup = teamList.reduce(
      (acc, team) => {
        acc[team._id] = team.teamName;
        return acc;
      },
      {} as Record<string, string>
    );
    setTeamLookup(lookup);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [teamList]);

  return (
    <div className="overflow-x-auto w-full">
      {!isSmallScreen ? (
        <table className="min-w-full divide-y-2 overflow-hidden text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td
                className="whitespace-nowrap px-8 py-2 font-medium cursor-pointer"
                onClick={() => requestSort("fileName")}
              >
                File Name <ChevronsUpDown className="inline-block ml-2" />
              </td>
              <td
                className="whitespace-nowrap px-8 py-2 font-medium cursor-pointer"
                onClick={() => requestSort("createdAt")}
              >
                Created At <ChevronsUpDown className="inline-block ml-2" />
              </td>
              <td className="whitespace-nowrap px-8 py-2 font-medium">
                Edited
              </td>
              <td className="whitespace-nowrap px-8 py-2 font-medium">Team</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-600">
            {!fileList && (
              <tr className="relative h-16">
                <td className="whitespace-nowrap w-full absolute px-4 py-2 mt-5 text-center font-medium flex-center">
                  <Loader2 className="animate-spin mr-3" size={20} /> Loading...
                  Please wait
                </td>
              </tr>
            )}
            {fileList && !safeFileList.length && (
              <tr className="relative h-16">
                <td className="whitespace-nowrap text-secondary-foreground w-full absolute px-4 py-2 mt-5 text-center font-medium">
                  No files found
                </td>
              </tr>
            )}
            {(sortedFiles.length > 0 ? sortedFiles : safeFileList).map(
              (file) => (
                <FileRow
                  isSubmitted={isSubmitted}
                  key={file._id}
                  file={file}
                  teamLookup={teamLookup}
                  router={router}
                  onDelete={deleteFunc}
                />
              )
            )}
          </tbody>
        </table>
      ) : (
        <div>
          <div className="flex justify-between px-4 py-2 font-medium bg-muted/50">
            <div
              className="cursor-pointer"
              onClick={() => requestSort("fileName")}
            >
              File Name <ChevronsUpDown className="inline-block ml-2" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => requestSort("createdAt")}
            >
              Created At <ChevronsUpDown className="inline-block ml-2" />
            </div>
          </div>
          {sortedFiles.map((file, index) => (
            <div
              key={index}
              className={`border p-4 mb-4 rounded ${index % 2 === 0 ? "bg-muted/50" : ""}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xl">{file.fileName}</span>
                <ActionDialog
                  isSubmitted={isSubmitted}
                  successTitle="File Deleted Successfully!!"
                  buttonIcon={Trash2}
                  dialogTitle="Are you absolutely sure?"
                  dialogDescription="This action cannot be undone. This will permanently delete your file and remove your data from our servers."
                  onAction={(e) => deleteFunc(e, file._id)}
                  buttonVariant="destructive"
                />
              </div>
              <div className="mb-2 text-muted-foreground">
                <Clock className="inline-block mr-2" size={20} />
                {moment(file.createdAt).format("YYYY-MM-DD")}
              </div>
              <div className="mb-2 text-muted-foreground">
                <Edit className="inline-block mr-2" size={20} />
                {moment(file.createdAt).format("YYYY-MM-DD")}
              </div>
              <div className="mb-2 text-muted-foreground">
                <Users className="inline-block mr-2" size={20} />
                {teamLookup[file.teamId] || "Unknown Team"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
