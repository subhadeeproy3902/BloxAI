import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Team } from "./FileList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";

type Props = {
  teamList: Team[];
  setFileList: React.Dispatch<any>;
  setfocusedTeam: React.Dispatch<string | null>;
  focusedTeam: string | null;
};

export default function TeamList({
  teamList,
  setFileList,
  setfocusedTeam,
  focusedTeam,
}: Props) {
  const convex = useConvex();

  const changeFileList = async (teamId: string) => {
    setfocusedTeam(teamId);
    const result = await convex.query(api.files.getFiles, {
      teamId: teamId,
    });
    setFileList(result);
  };

  return (
    <div className="flex flex-col items-center justify-center px-10 w-full">
      <Carousel className="w-full">
        <CarouselPrevious />
        <CarouselContent>
          {teamList.map((team, index) => (
            <CarouselItem
              onClick={() => changeFileList(team._id)}
              key={index}
              className="w-full group cursor-pointer sm:basis-1/2 md:basis-1/2"
            >
              <Card
                className={`${focusedTeam == team._id ? "border-gray-300" : ""} group-hover:border-gray-300`}
              >
                <CardHeader className="">{team.teamName}</CardHeader>
                <CardContent>
                  <CardDescription>
                    <h1>
                      Created At :{" "}
                      {moment(team._creationTime).format("DD MMM YYYY")}
                    </h1>
                    <h1>Files : {team.fileCount}</h1>
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
