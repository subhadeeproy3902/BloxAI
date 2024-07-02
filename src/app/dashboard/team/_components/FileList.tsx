import { useState, useEffect } from "react";
import {
  Loader2,
  ChevronsUpDown,
  ArchiveIcon,
  CheckCircle2,
  Edit3Icon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useConvex } from "convex/react";
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
import { Badge } from "@/components/ui/badge";
import ReadAccessModal from "@/components/shared/ReadAccessModal";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  private: boolean;
  read: boolean;
  write: boolean;
  readBy: string[];
  writtenBy: string[];
}

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
  router,
  user,
}: {
  file: FILE;
  user: any;
  router: ReturnType<typeof useRouter>;
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
      {file.createdBy}
    </td>
    <td
      className="whitespace-nowrap px-4 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {file.readBy && file.readBy.includes(user.email) && <Badge>Read</Badge>}
      {file.writtenBy && file.writtenBy.includes(user.email) && (
        <Badge>Write</Badge>
      )}
      {!file.readBy && !file.writtenBy && <Badge>No Access</Badge>}
    </td>
    <td className="flex gap-2 whitespace-nowrap px-4 py-2 text-muted-foreground">
      <ReadAccessModal />
      <Button size={"icon"} variant={"secondary"}>
        <Edit3Icon  className="w-5 h-5" />
      </Button>
    </td>
  </tr>
);

function FileList({ fileList, user }: { fileList?: FILE[]; user: any }) {
  const router = useRouter();
  const convex = useConvex();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FILE;
    direction: string;
  } | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Author
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Access
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
                    key={index}
                    file={file}
                    router={router}
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
              <div className="cursor-pointer">Access</div>
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
                    <ReadAccessModal />
                    <Button size={"icon"} variant={"secondary"}>
                      <Edit3Icon size={"icon"} className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    {file.readBy && file.readBy.includes(user.email) && (
                      <Badge>Read</Badge>
                    )}
                    {file.writtenBy && file.writtenBy.includes(user.email) && (
                      <Badge>Write</Badge>
                    )}
                    {!file.readBy && !file.writtenBy && (
                      <Badge>No Access</Badge>
                    )}
                  </div>
                </div>

                <div className="text-muted-foreground flex justify-end">
                  {/* <Image
                    src={}
                    alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                  /> */}
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
