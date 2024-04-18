import { Archive, MoreHorizontal, Trash2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";


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

function FileList({
  fileList,
  picture,
}: {
  fileList: FILE[];
  picture: string;
}) {
  const router = useRouter();

  // Ensure fileList is always an array
  const safeFileList = Array.isArray(fileList) ? fileList : [];

  const deleteFile = useMutation(api.files.deleteFile);
  const deleteFunc = async (id: string) => {
    await deleteFile({ _id: id as Id<"files">});
    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 overflow-hidden text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium">
                Created At
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
            {
              // Add a message if there are no files
              !safeFileList.length && (
                <tr className="relative h-16">
                  <td className="whitespace-nowrap text-gray-400 w-full absolute px-4 py-2 mt-5 text-center font-medium">
                    No files found
                  </td>
                </tr>
              )
            }
            {safeFileList.map((file: FILE, index: number) => (
              <tr key={index} className="odd:bg-muted/50 cursor-pointer">
                <td
                  className="whitespace-nowrap px-4 py-2 font-medium"
                  onClick={() => router.push("/workspace/" + file._id)}
                >
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">
                  <Image
                    src={picture}
                    alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="gap-3">
                        <Archive className="h-4 w-4" /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-3 text-red-500"
                        onClick={() => deleteFunc(file._id)}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
