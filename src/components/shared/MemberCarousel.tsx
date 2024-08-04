"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SetStateAction } from "react";
import DeleteTeamMember from "./DeleteTeamMember";

type Props = {
  teamMembersData: any[];
  focusedUser:any;
  setFocusedUser:React.Dispatch<SetStateAction<any | null>>;
};

export default function MemberCarousel({ teamMembersData,focusedUser,setFocusedUser }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-10 w-[90%] sm:w-[75%]">
      <Carousel className="w-full">
        <CarouselPrevious />
        <CarouselContent>
          {teamMembersData !== null &&
            teamMembersData.map((user: any, index) => (
              <CarouselItem
                onClick={() => setFocusedUser(user)}
                key={index}
                className="w-full group cursor-pointer xl:basis-1/2"
              >
                <Card
                  className={`
                 group-hover:border-gray-300 ${focusedUser?._id === user._id ? "border-gray-300" : ""}`}
                >
                  <CardHeader className="flex sm:flex-row flex-col gap-3 items-center justify-start">
                    <Avatar className="w-[50px] h-[50px]">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className=" text-2xl">
                        {user.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {user.firstName}{" "}{user.lastName}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="flex sm:flex-row gap-3 sm:gap-0 flex-col items-center justify-between">
                      <p className="text-wrap">Email : {user.email}</p>
                      <DeleteTeamMember email={user.email} />
                    </CardDescription>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
