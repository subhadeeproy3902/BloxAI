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
import { RenameTeamForm } from "./RenameTeamForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function RenameTeamModal() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 w-full items-center p-2 hover:bg-secondary rounded-lg cursor-pointer text-sm">
        <PencilIcon className="w-4 h-4" />
        Rename Team
      </DialogTrigger>
      <DialogContent>
        {!isSubmitted && (
          <DialogHeader>
            <DialogTitle>
              <h1>Rename Team</h1>
            </DialogTitle>
            <DialogDescription>
              <RenameTeamForm setIsSubmitted={setIsSubmitted} />
            </DialogDescription>
          </DialogHeader>
        )}
        {isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>Team renamed successfully!!</DialogTitle>
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
