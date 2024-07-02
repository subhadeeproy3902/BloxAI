"use client";
import { Edit3Icon, EyeIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

export default function WriteAccessModal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const SubmitHandler = () => {
    setIsSubmitted(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setIsSubmitted(false);
      }}
    >
      <DialogTrigger>
        <Button size={"icon"} variant={"secondary"}>
          <Edit3Icon size={"icon"} className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>
                <h1>Write File Access</h1>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This will give the write access to the member!!
            </DialogDescription>
            <div className=" flex gap-2">
              <Button onClick={() => setOpen(false)} variant={"secondary"}>
                Cancel
              </Button>
              <Button onClick={() => SubmitHandler()}>Continue</Button>
            </div>
          </>
        )}

        {isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>Write File Access granted!!</DialogTitle>
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
