import { Button } from "@/components/ui/button";
import { Archive, File, Github, Trash2 } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Constant from "@/app/_constant/Constant";
import PricingDialog from "./PricingDialog";
import { FileListContext } from "@/app/_context/FilesListContext";
import { ErrorMessage } from "@/components/ui/error";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useConvex } from "convex/react";
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

interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}

function SideNavBottomSection({ onFileCreate, totalFiles, activeTeam }: any) {
  const pathname = usePathname();
  
  const menuList = [
    {
      id: 1,
      name: "Github",
      icon: Github,
      path: `https://github.com/subhadeeproy3902/BloxAI`,
    },
    {
      id: 2,
      name: "Archive",
      icon: Archive,
      path: `/dashboard/archive`,
    },
  ];

  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>([]);
  const convex = useConvex();

  const [fileInput, setFileInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const deleteTeam = useMutation(api.teams.deleteTeam);
  const deleteFunc = async (e: any, id: String) => {
    e.stopPropagation();
    await deleteTeam({ _id: id as Id<"teams"> });
    window.location.reload();
  };
  

  const handleFileInput = (val: string) => {
    setFileInput(val);
    const isExistFile = fileList.find((file: any) => file?.fileName === val);
    if (isExistFile) {
      setError("File Name already exists!");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  return (
    <div>
      {menuList.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <h2
            className={`flex gap-2 p-1 ${
              pathname == menu.path ? "bg-muted" : ""
            } px-2 text-[14px] hover:bg-muted rounded-md cursor-pointer`}
          >
            <menu.icon className="h-5 w-5" />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="mt-2">
            New File <File size={20} />
          </Button>
        </DialogTrigger>
        {totalFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="Enter File Name"
                  className="mt-3"
                  onChange={(e) => handleFileInput(e.target.value)}
                />
              </DialogDescription>
              <ErrorMessage>{error}</ErrorMessage>
            </DialogHeader>
            <DialogFooter className="">
              <DialogClose asChild>
                <Button
                  disabled={!(fileInput && fileInput.length > 3 && !error)}
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDialog />
        )}
      </Dialog>

      {/* Delete Team Button */}

      <div className="flex items-center justify-between mt-4">
            <AlertDialog>
                <AlertDialogTrigger className="w-full" asChild>
                <Button variant={"destructive"} className="mb-2 mt-1">
                  Delete Team <Trash2 className="h-4 w-4 rounded-full" />
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently
                      delete your team and remove your data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => deleteFunc(e, activeTeam._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
      </div>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-accent rounded-full mt-5">
        <div
          className={`h-4 bg-primary rounded-full`}
          style={{ width: `${(totalFiles / Constant.MAX_FREE_FILE) * 100}%` }}
        />
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles}</strong> out of{" "}
        <strong>{Constant.MAX_FREE_FILE}</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">
        Upgrade your plan for unlimited access.
      </h2>
    </div>
  );
}

export default SideNavBottomSection;
