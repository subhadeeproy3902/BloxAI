"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  errorMsg: string;
};

export default function PrivateAlert({ errorMsg }: Props) {
  const [open, setOpen] = useState(true);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{errorMsg}</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <Button>
            <Link href={"/"}>Home</Link>
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
