import { useState, useEffect } from "react";
import {
  Loader2,
  Trash2,
  ChevronsUpDown,
  ArchiveIcon,
  ArchiveRestore,
  Clock,
  Edit,
  CheckCircle2,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
import RenameFileModal from "@/components/shared/RenameFileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileStatusModal from "@/components/shared/FileStatusModal";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { deleteFileUrl, updateFileUrl } from "@/lib/API-URLs";
import { FILE } from "@/types/types";

const ActionDialog = ({
  buttonIcon: ButtonIcon,
  dialogTitle,
  dialogDescription,
  onAction,
  buttonVariant = "secondary",
  isSubmitted,
  successTitle,
}: {
  buttonIcon: typeof ArchiveIcon;
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
  picture,
  pathname,
  onArchive,
  onUnarchive,
  onDelete,
  router,
  index,
  isSubmitted,
  user,
}: {
  file: FILE;
  picture: string;
  pathname: string;
  onArchive: (e: any, file: FILE) => void;
  onUnarchive: (e: any, file: FILE) => void;
  onDelete: (e: any, id: string) => void;
  router: ReturnType<typeof useRouter>;
  index: number;
  isSubmitted: boolean;
  user: any;
}) => (
  <tr key={file._id} className="odd:bg-muted/50 cursor-pointer">
    <td
      className="whitespace-nowrap px-4 py-2 font-medium"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {file.fileName}
    </td>
    <td
      className="whitespace-nowrap px-4 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {moment(file.createdAt).format("DD MMM YYYY")}
    </td>
    <td
      className="whitespace-nowrap px-4 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {moment(file.createdAt).format("DD MMM YYYY")}
    </td>
    <td
      className="whitespace-nowrap px-4 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      <Avatar key={index} className="w-[40px] h-[40px]">
        <AvatarImage src={""} />
        <AvatarFallback className=" text-xs">
          {file.createdBy.firstName.charAt(0)}
          {file.createdBy.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </td>
    <td>
      <FileStatusModal
        file={file}
        user={user}
        privateFIle={file.filePrivate}
        successTitle={
          !file.filePrivate
            ? "File accessible to members only"
            : "File accessible to everyone"
        }
        dialogTitle={!file.filePrivate ? "Private File" : "Public File"}
        dialogDescription={
          !file.filePrivate
            ? "Make file accessible to members only"
            : "Make file accessible to everyone"
        }
      />
    </td>
    <td className="flex gap-2 whitespace-nowrap px-4 py-2 text-muted-foreground">
      <RenameFileModal file={file} user={user} />
      {pathname === "/dashboard" && (
        <ActionDialog
          isSubmitted={isSubmitted}
          successTitle="File Archived Successfully!!"
          buttonIcon={ArchiveIcon}
          dialogTitle="Are you absolutely sure?"
          dialogDescription="This will add your file to the archive section."
          onAction={(e) => onArchive(e, file)}
        />
      )}
      {pathname === "/dashboard/archive" && (
        <ActionDialog
          isSubmitted={isSubmitted}
          successTitle="File Restored Successfully!!"
          buttonIcon={ArchiveRestore}
          dialogTitle="Are you absolutely sure?"
          dialogDescription="This will unarchive your file."
          onAction={(e) => onUnarchive(e, file)}
          buttonVariant="destructive"
        />
      )}
      <ActionDialog
        buttonIcon={Trash2}
        isSubmitted={isSubmitted}
        successTitle="File Deleted Successfully!!"
        dialogTitle="Are you absolutely sure?"
        dialogDescription="This action cannot be undone. This will permanently delete your file and remove your data from our servers."
        onAction={(e) => onDelete(e, file._id)}
        buttonVariant="destructive"
      />
    </td>
  </tr>
);

function FileList({
  fileList,
  picture,
  user,
}: {
  fileList: FILE[];
  picture: string;
  user: any;
}) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FILE;
    direction: string;
  } | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const safeFileList = Array.isArray(fileList) ? fileList : [];
  const pathname = usePathname();
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


  const archiveFunc = async (e: any, file:FILE) => {
    e.stopPropagation();
    try {
      await axiosInstance.put(updateFileUrl,{
        fileName:file.fileName, 
        filePrivate:file.filePrivate, 
        fileId:file._id,
        archive:true
      })
      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const unarchiveFunc = async (e: any, file:FILE) => {
    e.stopPropagation();
    try {
      await axiosInstance.put(updateFileUrl,{
        fileName:file.fileName, 
        filePrivate:file.filePrivate, 
        fileId:file._id,
        archive:false
      })
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
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        {!isSmallScreen ? (
          <table className="min-w-full divide-y-2 overflow-hidden text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <td
                  className="whitespace-nowrap px-4 py-2 font-medium cursor-pointer"
                  onClick={() => requestSort("fileName")}
                >
                  File Name <ChevronsUpDown className="inline-block ml-2" />
                </td>
                <td
                  className="whitespace-nowrap px-4 py-2 font-medium cursor-pointer"
                  onClick={() => requestSort("createdAt")}
                >
                  Created At <ChevronsUpDown className="inline-block ml-2" />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Edited
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Author
                </td>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-600">
              {!fileList && (
                <tr className="relative h-16">
                  <td className="whitespace-nowrap w-full absolute px-4 py-2 mt-5 text-center font-medium flex-center">
                    <Loader2 className="animate-spin mr-3" size={20} />{" "}
                    Loading... Please wait
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
                (file, index) => (
                  <FileRow
                    user={user}
                    isSubmitted={isSubmitted}
                    key={file._id}
                    file={file}
                    picture={picture}
                    pathname={pathname}
                    onArchive={archiveFunc}
                    onUnarchive={unarchiveFunc}
                    onDelete={deleteFunc}
                    router={router}
                    index={index}
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
                onClick={() => router.push("/workspace/" + file._id)}
                key={index}
                className={`border p-4 mb-4 rounded ${index % 2 === 0 ? "bg-muted/50" : ""}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">{file.fileName}</span>
                  <div className="flex gap-2">
                    <RenameFileModal user={user} file={file} />
                    {pathname === "/dashboard" && (
                      <ActionDialog
                        isSubmitted={isSubmitted}
                        successTitle="File Archived Successfully!!"
                        buttonIcon={ArchiveIcon}
                        dialogTitle="Are you absolutely sure?"
                        dialogDescription="This will add your file to the archive section."
                        onAction={(e) => archiveFunc(e, file)}
                      />
                    )}
                    {pathname === "/dashboard/archive" && (
                      <ActionDialog
                        isSubmitted={isSubmitted}
                        successTitle="File Restored Successfully!!"
                        buttonIcon={ArchiveRestore}
                        dialogTitle="Are you absolutely sure?"
                        dialogDescription="This will unarchive your file."
                        onAction={(e) => unarchiveFunc(e, file)}
                        buttonVariant="destructive"
                      />
                    )}
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
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <div className="mb-2 text-muted-foreground">
                      <Clock className="inline-block mr-2" size={20} />
                      {moment(file.createdAt).format("YYYY-MM-DD")}
                    </div>
                    <div className="mb-2 text-muted-foreground">
                      <Edit className="inline-block mr-2" size={20} />
                      {moment(file.createdAt).format("YYYY-MM-DD")}
                    </div>
                  </div>
                  <FileStatusModal
                    file={file}
                    user={user}
                    privateFIle={file.filePrivate}
                    successTitle={
                      !file.filePrivate
                        ? "File accessible to members only"
                        : "File accessible to everyone"
                    }
                    dialogTitle={!file.filePrivate ? "Private File" : "Public File"}
                    dialogDescription={
                      !file.filePrivate
                        ? "Make file accessible to members only"
                        : "Make file accessible to everyone"
                    }
                  />
                </div>

                <div className="text-muted-foreground flex justify-end">
                  <Image
                    src={picture}
                    alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileList;
