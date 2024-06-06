import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "../ui/button";
  import {
    CopyIcon,
    LinkIcon,

    Users,
  } from "lucide-react";
  import { useSelector } from "react-redux";
  import { RootState } from "@/app/store";
  import { Separator } from "../ui/separator";
  import Image from "next/image";
  import Link from "next/link";
import { JoinTeamForm } from "./JoinTeamForm";
  
  export default function JoinTeamModal() {
    const teamName = useSelector((state: RootState) => state.team.teamName);
    const teamId = useSelector((state: RootState) => state.team.teamId);
  
    const URL = `${window.location.href}/invite/${teamId}`;
  
    const ShareLinkHandler = () => {
      navigator.clipboard.writeText(URL);
    };
  
    const CodeHandler = () => {
      navigator.clipboard.writeText(teamId);
    };
  
    return (
      <Dialog>
        <DialogTrigger>
          <Button className="flex w-full gap-3 items-center justify-start ">
            <Users className="w-5 h-5" /> <p className="font-bold hidden sm:inline">Join</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:w-[650px]">
          <DialogTitle>
            <h1 className="sm:text-xl">Join Team </h1>
          </DialogTitle>
          <DialogHeader>
            <p className="hidden sm:inline">
              Join team to <span className=" font-semibold">share🤝</span>
              , <span className=" font-semibold">work⚒️</span> and{" "}
              <span className=" font-semibold">grow📈!</span>
            </p>
            <p className="flex sm:hidden">
              <span className=" font-semibold">share🤝,</span>
              <span className=" font-semibold">work⚒️</span>
              <span className=" font-semibold">grow📈!</span>
            </p>
          </DialogHeader>
          <DialogDescription className="flex flex-col w-full items-center justify-center py-2">
            <JoinTeamForm />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }
  