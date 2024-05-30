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

export default function TeamList({ teamList }: { teamList: Team[] }) {
  return (
    <div className="flex flex-col items-center justify-center px-10 w-full">
      <Carousel className="w-full">
        <CarouselPrevious />
        <CarouselContent>
          {teamList.map((team, index) => (
            <CarouselItem
              key={index}
              className="w-full sm:basis-1/2 md:basis-1/2"
            >
              <Card>
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
