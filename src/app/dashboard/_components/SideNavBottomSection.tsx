import { Button } from "@/components/ui/button";
import { Archive, File, Flag, Github } from "lucide-react";
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
import { usePathname } from 'next/navigation'

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const pathname = usePathname();
  console.log(pathname)
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: `/dashboard/getstarted`,
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: `/dashboard/Github`,
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: `/dashboard/archive`,
    },
  ];
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  const [fileInput, setFileInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handelFileInput = (val: string) => {
    setFileInput(val);
    const isExistFile = fileList.find((file: any) => file?.fileName === val);
    if (isExistFile) {
      setError("File Name already exist.!");
    } else {
      setError("");
    }
  };

  return (
    <div>
      {menuList.map((menu, index) => (
        <Link href={menu.path} >
          <h2
            key={index}
            className={`flex gap-2 p-1 ${pathname == menu.path ? "bg-muted" : ""} px-2 text-[14px] hover:bg-muted rounded-md cursor-pointer`}
          >
            <menu.icon className="h-5 w-5" />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* Add New File Button  */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="my-2">
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
                  onChange={(e) => handelFileInput(e.target.value)}
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

      {/* Progress Bar  */}
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
