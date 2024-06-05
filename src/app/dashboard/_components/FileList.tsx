import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  Loader2,
  Trash2,
  ChevronsUpDown,
  ArchiveIcon,
  ArchiveRestore,
  Clock,
  Edit,
  Users,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
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

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}


const ActionDialog = ({
  buttonIcon: ButtonIcon,
  dialogTitle,
  dialogDescription,
  onAction,
  buttonVariant = "secondary",
}: {
  buttonIcon: typeof ArchiveIcon;
  dialogTitle: string;
  dialogDescription: string;
  onAction: (e: any) => void;
  buttonVariant?: "secondary" | "link" | "default" | "destructive" | "outline" | "ghost" | null;
}) => (
  <AlertDialog>
    <AlertDialogTrigger>
      <Button variant={buttonVariant} size="icon">
        <ButtonIcon className="h-4 w-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
        <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onAction}>Continue</AlertDialogAction>
      </AlertDialogFooter>
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
}: {
  file: FILE;
  picture: string;
  pathname: string;
  onArchive: (e: any, id: string) => void;
  onUnarchive: (e: any, id: string) => void;
  onDelete: (e: any, id: string) => void;
  router: ReturnType<typeof useRouter>;
  index: number;
}) => (
  <tr key={file._id} className="odd:bg-muted/50 cursor-pointer">
    <td className="whitespace-nowrap px-4 py-2 font-medium" onClick={() => router.push("/workspace/" + file._id)}>
      {file.fileName}
    </td>
    <td className="whitespace-nowrap px-4 py-2 text-muted-foreground" onClick={() => router.push("/workspace/" + file._id)}>
      {moment(file._creationTime).format("DD MMM YYYY")}
    </td>
    <td className="whitespace-nowrap px-4 py-2 text-muted-foreground" onClick={() => router.push("/workspace/" + file._id)}>
      {moment(file._creationTime).format("DD MMM YYYY")}
    </td>
    <td className="whitespace-nowrap px-4 py-2 text-muted-foreground" onClick={() => router.push("/workspace/" + file._id)}>
      <Image src={picture} alt="user" width={30} height={30} className="rounded-full" />
    </td>
    <td className="flex gap-2 whitespace-nowrap px-4 py-2 text-muted-foreground">
      {pathname === "/dashboard" && (
        <ActionDialog
          buttonIcon={ArchiveIcon}
          dialogTitle="Are you absolutely sure?"
          dialogDescription="This will add your file to the archive section."
          onAction={(e) => onArchive(e, file._id)}
        />
      )}
      {pathname === "/dashboard/archive" && (
        <ActionDialog
          buttonIcon={ArchiveRestore}
          dialogTitle="Are you absolutely sure?"
          dialogDescription="This will unarchive your file."
          onAction={(e) => onUnarchive(e, file._id)}
          buttonVariant="destructive"
        />
      )}
      <ActionDialog
        buttonIcon={Trash2}
        dialogTitle="Are you absolutely sure?"
        dialogDescription="This action cannot be undone. This will permanently delete your file and remove your data from our servers."
        onAction={(e) => onDelete(e, file._id)}
        buttonVariant="destructive"
      />
    </td>
  </tr>
);

function FileList({ fileList, picture }: { fileList?: FILE[]; picture: string }) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{ key: keyof FILE; direction: string } | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const safeFileList = Array.isArray(fileList) ? fileList : [];
  const pathname = usePathname();

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

  const deleteFile = useMutation(api.files.deleteFile);
  const deleteFunc = async (e: any, id: string) => {
    e.stopPropagation();
    await deleteFile({ _id: id as Id<"files"> });
    window.location.reload();
  };

  const archiveFile = useMutation(api.files.addToArchive);
  const archiveFunc = async (e: any, id: string) => {
    e.stopPropagation();
    await archiveFile({ _id: id as Id<"files"> });
    window.location.reload();
  };

  const unArchiveFile = useMutation(api.files.removeFromArchive);
  const unarchiveFunc = async (e: any, id: string) => {
    e.stopPropagation();
    await unArchiveFile({ _id: id as Id<"files"> });
    window.location.reload();
  };

  const requestSort = (key: keyof FILE) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        {!isSmallScreen ? (
          <table className="min-w-full divide-y-2 overflow-hidden text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium cursor-pointer" onClick={() => requestSort("fileName")}>
                  File Name <ChevronsUpDown className="inline-block ml-2" />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium cursor-pointer" onClick={() => requestSort("_creationTime")}>
                  Created At <ChevronsUpDown className="inline-block ml-2" />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">Edited</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">Author</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-600">
              {!fileList && (
                <tr className="relative h-16">
                  <td className="whitespace-nowrap w-full absolute px-4 py-2 mt-5 text-center font-medium flex-center">
                    <Loader2 className="animate-spin mr-3" size={20} /> Loading... Please wait
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
              {(sortedFiles.length > 0 ? sortedFiles : safeFileList).map((file, index) => (
                <FileRow
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
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <div className="flex justify-between px-4 py-2 font-medium bg-gray-200">
              <div className="cursor-pointer" onClick={() => requestSort("fileName")}>
                File Name <ChevronsUpDown className="inline-block ml-2" />
              </div>
              <div className="cursor-pointer" onClick={() => requestSort("_creationTime")}>
                Created At <ChevronsUpDown className="inline-block ml-2" />
              </div>
            </div>
            {sortedFiles.map((file, index) => (
              <div key={index} className={`border p-4 mb-4 rounded ${index % 2 === 0 ? "odd:bg-muted/50" : ""}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">{file.fileName}</span>
                  <div className="flex gap-2">
                    {pathname === "/dashboard" && (
                      <ActionDialog
                        buttonIcon={ArchiveIcon}
                        dialogTitle="Are you absolutely sure?"
                        dialogDescription="This will add your file to the archive section."
                        onAction={(e) => archiveFunc(e, file._id)}
                      />
                    )}
                    {pathname === "/dashboard/archive" && (
                      <ActionDialog
                        buttonIcon={ArchiveRestore}
                        dialogTitle="Are you absolutely sure?"
                        dialogDescription="This will unarchive your file."
                        onAction={(e) => unarchiveFunc(e, file._id)}
                        buttonVariant="destructive"
                      />
                    )}
                    <ActionDialog
                      buttonIcon={Trash2}
                      dialogTitle="Are you absolutely sure?"
                      dialogDescription="This action cannot be undone. This will permanently delete your file and remove your data from our servers."
                      onAction={(e) => deleteFunc(e, file._id)}
                      buttonVariant="destructive"
                    />
                  </div>
                </div>
                <div className="mb-2 text-muted-foreground">
                  <Clock className="inline-block mr-2" size={20} />
                  {moment(file._creationTime).format("YYYY-MM-DD")}
                </div>
                <div className="mb-2 text-muted-foreground">
                  <Edit className="inline-block mr-2" size={20} />
                  {moment(file._creationTime).format("YYYY-MM-DD")}
                </div>
                <div className="text-muted-foreground flex justify-end">
                  <Image src={picture} alt="user" width={30} height={30} className="rounded-full" />
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
