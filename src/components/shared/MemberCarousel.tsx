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
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { SetStateAction, useState } from "react";

 export type USER = {
  name: string;
  _id: string;
  email: string;
  image: string;
};

type Props = {
  teamMembersData: USER[];
  focusedUser:USER | null;
  setFocusedUser:React.Dispatch<SetStateAction<USER | null>>;
};

export default function MemberCarousel({ teamMembersData,focusedUser,setFocusedUser }: Props) {

  return (
    <div className="flex flex-col items-center justify-center p-10 w-[75%]">
      <Carousel className="w-full">
        <CarouselPrevious />
        <CarouselContent>
          {teamMembersData !== null &&
            teamMembersData.map((user: USER, index) => (
              <CarouselItem
                onClick={() => setFocusedUser(user)}
                key={index}
                className="w-full group cursor-pointer sm:basis-1/2 md:basis-1/2"
              >
                <Card
                  className={`
                 group-hover:border-gray-300 ${focusedUser?._id === user._id ? "border-gray-300" : ""}`}
                >
                  <CardHeader className="flex flex-row gap-3 items-center justify-start">
                    <Avatar className="w-[50px] h-[50px]">
                      <AvatarImage src={user.image} />
                      <AvatarFallback className=" text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="flex items-center justify-between">
                      <h1>Email : {user.email}</h1>
                      <Button
                        size={"icon"}
                        className=" bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
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
