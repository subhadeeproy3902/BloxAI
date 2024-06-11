"use client";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RenameFileForm } from "./RenameFileForm";
import { Button } from "../ui/button";

export default function RenameFileModal() {
  return (
    <Dialog>
      <DialogTrigger>
      <Button variant={"secondary"} size="icon">
        <PencilIcon className="w-4 h-4" />
      </Button>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1>Rename File</h1>
            </DialogTitle>
            <DialogDescription>
              <RenameFileForm />
            </DialogDescription>
          </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
