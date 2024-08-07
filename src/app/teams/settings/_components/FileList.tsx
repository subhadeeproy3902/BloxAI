import { useState, useEffect, SetStateAction } from "react";
import {
  Loader2,
  ChevronsUpDown
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ReadAccessModal from "@/components/shared/ReadAccessModal";
import WriteAccessModal from "@/components/shared/WriteAccessModal";
import { FILE } from "@/types/types";

const FileRow = ({
  file,
  router,
  user,
  teamId,
  setIsUpdated,
}: {
  file: FILE;
  user: any;
  router: ReturnType<typeof useRouter>;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
  teamId: string;
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
      {file.createdBy.email}
    </td>
    <td
      className="whitespace-nowrap px-4 py-2 text-muted-foreground"
      onClick={() => router.push("/workspace/" + file._id)}
    >
      {file.readBy
        ? file.readBy.includes(user._id) && <Badge>Read</Badge>
        : ""}
      {file.writtenBy
        ? file.writtenBy &&
          file.writtenBy.includes(user._id) && <Badge>Write</Badge>
        : ""}
      {!file.readBy.includes(user._id) &&
        !file.writtenBy.includes(user._id) && <Badge>No Access</Badge>}
    </td>
    <td className="flex gap-2 whitespace-nowrap px-4 py-2 text-muted-foreground">
      <ReadAccessModal
        setIsUpdated={setIsUpdated}
        focusedUser={user}
        file={file}
      />
      <WriteAccessModal
        setIsUpdated={setIsUpdated}
        file={file}
        focusedUser={user}
      />
    </td>
  </tr>
);

function FileList({
  fileList,
  user,
  teamId,
  setIsUpdated,
}: {
  fileList?: FILE[];
  user: any;
  teamId: string;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FILE;
    direction: string;
  } | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const safeFileList = Array.isArray(fileList) ? fileList : [];

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
                    setIsUpdated={setIsUpdated}
                    teamId={teamId}
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
                key={index}
                className={`border p-4 mb-4 rounded ${index % 2 === 0 ? "bg-muted/50" : ""}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    onClick={() => router.push("/workspace/" + file._id)}
                    className="font-bold text-xl"
                  >
                    {file.fileName}
                  </span>
                  <div className="flex gap-2">
                    <ReadAccessModal
                      setIsUpdated={setIsUpdated}
                      file={file}
                      focusedUser={user}
                    />
                    <WriteAccessModal
                      setIsUpdated={setIsUpdated}
                      file={file}
                      focusedUser={user}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    {file.readBy && file.readBy.includes(user._id) && (
                      <Badge>Read</Badge>
                    )}
                    {file.writtenBy && file.writtenBy.includes(user._id) && (
                      <Badge>Write</Badge>
                    )}
                    {!file.readBy.includes(user._id) &&
                      !file.writtenBy.includes(user._id) && (
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
