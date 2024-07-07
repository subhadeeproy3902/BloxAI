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
  Share2Icon,
  LinkIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import EmailForm from "../ui/EmailForm";

export default function InviteModal() {
  const teamName = useSelector((state: RootState) => state.team.teamName);
  const teamId = useSelector((state: RootState) => state.team.teamId);
  const URL = `${window.location.origin}/invite/${teamId}`;

  const ShareLinkHandler = () => {
    navigator.clipboard.writeText(URL);
    toast.success("Link copied successfully!!")
  };

  const CodeHandler = () => {
    navigator.clipboard.writeText(teamId);
    toast.success("Code copied successfully!!")
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex w-full gap-3 items-center justify-start ">
          <Share2Icon className="w-5 h-5" /> <p className="font-bold">Invite</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[330px] sm:w-[650px]">
        <DialogTitle>
          <h1 className="sm:text-xl">Invite member to {teamName}</h1>
        </DialogTitle>
        <DialogHeader>
          <p className="hidden sm:inline">
            Add collaboartors to <span className=" font-semibold">share🤝</span>
            , <span className=" font-semibold">work⚒️</span> and{" "}
            <span className=" font-semibold">grow📈!</span>
          </p>
          <p className="flex sm:hidden">
            <span className=" font-semibold">share🤝,</span>
            <span className=" font-semibold">work⚒️</span>
            <span className=" font-semibold">grow📈!</span>
          </p>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-center justify-center py-4 sm:p-10 gap-2">
          <Button className="flex gap-3" onClick={() => ShareLinkHandler()}>
            Share Link <LinkIcon className="w-4 h-4" />
          </Button>

          <Separator />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <p className="dark:bg-[#333333] bg-secondary text-[#333333] p-2 rounded-lg px-4 dark:text-gray-300">
              {teamId}
            </p>
            <Button onClick={() => CodeHandler()}>
              <CopyIcon className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex flex-col items-center pt-4 justify-center gap-1">
            <p>Share Code/Link via</p>
            <div className="flex gap-2 items-center justify-center">
              <Link
                target="_blank"
                href={"https://www.instagram.com/"}
                className="p-2 rounded-xl dark:bg-secondary bg-[#333333] text-secondary-foreground hover:bg-primary/90"
              >
                <Image
                  src={"/insta.svg"}
                  width={24}
                  height={24}
                  alt="twitter icon"
                />
              </Link>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/"}
                className="p-2 rounded-xl dark:bg-secondary bg-[#333333] text-secondary-foreground hover:bg-primary/90"
              >
                <Image
                  src={"/linkedin.svg"}
                  width={24}
                  height={24}
                  alt="whatsapp icon"
                />
              </Link>
              <Link
                target="_blank"
                href={"https://web.whatsapp.com/"}
                className="p-2 hover:bg-primary/90 dark:bg-secondary bg-[#333333] rounded-xl text-secondary-foreground "
              >
                <Image
                  src={"/whatsapp.svg"}
                  width={20}
                  height={20}
                  alt="whatsapp icon"
                />
              </Link>
              <Link
                target="_blank"
                href={"https://x.com/"}
                className="p-2 hover:bg-primary/90 rounded-xl dark:bg-secondary bg-[#333333] text-secondary-foreground"
              >
                <Image
                  src={"/twitter.svg"}
                  width={20}
                  height={20}
                  alt="twitter icon"
                />
              </Link>
            </div>
            <div>
                <EmailForm url={URL}/>
              </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
