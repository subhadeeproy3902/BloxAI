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
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function RenameFileModal({ id }: Props) {
  const router = useRouter();
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
              <RenameFileForm id={id} setIsSubmitted={setIsSubmitted} />
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
