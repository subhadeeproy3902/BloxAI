"use client";
import { Users2Icon } from "lucide-react";
import { Separator } from "../ui/separator";
import MemberModal from "./MemberModal";

type Props = {
  TeamMembers: any[];
  createdBy:string;
};

export default function MembersList({ TeamMembers,createdBy }: Props) {

  return (
    <div className=" bg-secondary mt-5  p-3 overflow-hidden rounded-lg">
      <div className="text-xl flex p-1 gap-2">
        <Users2Icon className="h-5 w-5" />
        <h1 className=" font-semibold text-base">Team Members</h1>
      </div>
      <Separator className=" dark:bg-gray-500 bg-gray-500" />
      <div className=" grid relative sm:my-2 gap-2 h-[60px] grid-rows-2 items-center grid-cols-4 justify-start rounded-lg p-1 sm:p-3 overflow-x-auto">
        {TeamMembers && TeamMembers.map((member, index) => (
          <>
            <MemberModal email={member.email} createdBy={createdBy} key={index} image={member.image} index={index} name={member.firstName} />
          </>
        ))}
      </div>
    </div>
  );
}
