"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Users } from "lucide-react";
import { JoinTeamForm } from "./JoinTeamForm";
import { useState } from "react";

type Props = {
  user:any;
}

export default function JoinTeamModal({ user }: Props) {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
      <DialogTrigger>
        <Button className="flex w-full gap-3 items-center justify-start ">
          <Users className="w-5 h-5" /> <p className="font-bold">Join</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[650px]">
        <DialogHeader>
          <DialogTitle>
            <h1 className="sm:text-xl">Join Team </h1>
          </DialogTitle>
          <p className="hidden sm:inline">
            Join team to <span className=" font-semibold">share🤝</span>,{" "}
            <span className=" font-semibold">work⚒️</span> and{" "}
            <span className=" font-semibold">grow📈!</span>
          </p>
          <p className="flex sm:hidden">
            <span className=" font-semibold">share🤝,</span>
            <span className=" font-semibold">work⚒️</span>
            <span className=" font-semibold">grow📈!</span>
          </p>
          <DialogDescription className="flex flex-col w-full items-center justify-center py-2">
            <JoinTeamForm user={user} setIsDialogOpen={setisDialogOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
