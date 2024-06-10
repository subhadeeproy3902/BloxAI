"use client"
import { PencilIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { RenameTeamForm } from "./RenameTeamForm";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";


export default function RenameTeamModal() {
    const [isSubmitted,setIsSubmitted] = useState(false);
  return (
    <Dialog>
        <DialogTrigger className="flex gap-2 w-full items-center p-2 hover:bg-secondary rounded-lg cursor-pointer text-sm">
            <PencilIcon className="w-4 h-4" />
            Rename Team
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <h1>Rename Team</h1>
                </DialogTitle>
                <DialogDescription>
                    <RenameTeamForm setIsSubmitted={setIsSubmitted} />
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}