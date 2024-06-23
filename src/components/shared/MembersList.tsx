"use client";
import { Users2Icon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  TeamMembers: any[];
};

export default function MembersList({ TeamMembers }: Props) {
  const pathname = usePathname();

  console.log(TeamMembers);
  return (
    <div className=" bg-secondary mt-5  p-3 overflow-hidden rounded-lg">
      <div className="text-xl flex p-1 gap-2">
        <Users2Icon className="h-5 w-5" />
        <h1 className=" font-semibold text-base">Team Members</h1>
      </div>
      <Separator className=" dark:bg-gray-500 bg-gray-500" />
      <div className=" grid relative sm:my-2 gap-2 h-[60px] grid-rows-2 items-center grid-cols-4 justify-start rounded-lg p-1 sm:p-3 overflow-x-auto">
        {TeamMembers.map((member, index) => (
          <>
            <Link
              target="_blank"
              href={`${pathname}/`}
              key={index}
              className={`z-[${index + 10}]  ${index == 0 && "left-0"} ${index == 1 && "left-8"} ${index == 2 && " left-16"} ${index == 3 && " left-24"}  absolute  `}
            >
              <Avatar className="w-[40px] border-2 border-gray-400 h-[40px]">
                <AvatarImage src={member?.image} />
                <AvatarFallback className=" text-xs">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
