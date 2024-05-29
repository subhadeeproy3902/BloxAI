import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}
function SideNavTopSection({ user, setActiveTeamInfo }: any) {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();
  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam ? setActiveTeamInfo(activeTeam) : null;
  }, [activeTeam]);
  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };
  const handleClick = () => {
    router.push('/dashboad/profile');
  };
  return (
    <div>
      <Popover>
          <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-lg cursor-pointer" onClick={handleClick}>
            <Image
              src="/android-chrome-192x192.png"
              alt="logo"
              width={40}
              height={40}
            />
            <h2 className="flex gap-2 items-centerfont-bold text-[13px] md:text-[17px]">
              {activeTeam?.teamName || "Team"}
              <ChevronDown />
            </h2>
          </div>
        <PopoverContent className="ml-7 p-4">
          {/* Team Section  */}
          <div>
            {teamList?.map((team, index) => (
              <h2
                key={index}
                className={`p-2 hover:bg-primary
                         hover:text-muted-foreground
                         rounded-lg mb-1 cursor-pointer
                         ${activeTeam?._id == team._id && "bg-primary text-white"}`}
                onClick={() => setActiveTeam(team)}
              >
                {team.teamName}
              </h2>
            ))}
          </div>
          <Separator className="mt-2" />
          {/* Option Section  */}
          <div>
            {menu.map((item, index) => (
              <h2
                key={index}
                className="flex gap-2 items-center
                        p-2 hover:bg-secondary rounded-lg cursor-pointer text-sm"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2
                className="flex gap-2 items-center
                        p-2 hover:bg-secondary rounded-lg cursor-pointer text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </div>
          <Separator className="mt-2" />
          {/* User Info Section  */}
          {user && (
            <div className="mt-2 flex gap-2 items-center">
              <Image
                src={user?.picture}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <h2 className="text-[14px] font-bold">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-[12px] text-muted-foreground">
                  {user?.email}
                </h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All File Button  */}
      <Button
        variant="secondary"
        className="w-full justify-start gap-2 font-bold mt-8"
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
