"use client";
import { EyeIcon } from "lucide-react";
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

export default function ReadAccessModal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const SubmitHandler = () => {
    setIsSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"secondary"} size="icon">
          <EyeIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!isSubmitted && (
          <>
            <DialogHeader>
              <DialogTitle>
                <h1>Read File Access</h1>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This will give the read file access to the member!!
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
              <DialogTitle>Read File Access granted!!</DialogTitle>
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
