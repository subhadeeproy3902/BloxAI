import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";

function Header() {
  const { user }: any = useKindeBrowserClient();
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-lg p-1">
        <Search size={24} />
        <Input type="text" placeholder="Search" className="border-none" />
      </div>
      <div className="flex gap-2 items-center mx-2" >
        <ThemeTogglebutton />
        <Image
          src={user?.picture || "https://picsum.photos/50"}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <Button>
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
}

export default Header;
