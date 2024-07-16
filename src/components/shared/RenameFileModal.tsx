"use client";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RenameFileForm } from "./RenameFileForm";
import { Button } from "../ui/button";
import { useState } from "react";
import { FILE } from "@/types/types";

type Props = {
  file: FILE;
  user:any;
};

export default function RenameFileModal({ file,user }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"} size="icon">
          <PencilIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!isSubmitted && (
          <DialogHeader>
            <DialogTitle>
              <h1>Rename File</h1>
            </DialogTitle>
            <DialogDescription>
              <RenameFileForm file={file} setIsSubmitted={setIsSubmitted} user={user} />
            </DialogDescription>
          </DialogHeader>
        )}
        {isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>File renamed successfully!!</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => window.location.reload()}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
