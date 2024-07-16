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
import moment from "moment";
import { TEAM } from "@/types/types";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { getFileUrl } from "@/lib/API-URLs";

type Props = {
  teamList: TEAM[];
  setFileList: React.Dispatch<any>;
  setfocusedTeam: React.Dispatch<string | null>;
  focusedTeam: string | null;
  user:any;
};

export default function TeamList({
  teamList,
  setFileList,
  setfocusedTeam,
  focusedTeam,
  user
}: Props) {

  const axiosInstance = createAxiosInstance(user.accessToken);

  const changeFileList = async (teamId: string) => {
    setfocusedTeam(teamId);
    const result = await axiosInstance.get(`${getFileUrl}/${teamId}`);
    setFileList(result.data);
  };

  return (
    <div className="flex flex-col items-center justify-center px-10 w-full">
      <Carousel className="w-full">
        <CarouselPrevious />
        <CarouselContent>
          {teamList.map((team, index) => (
            <CarouselItem
              onClick={() => {
                changeFileList(team._id)
              }
              }
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
                      {moment(team.createdAt).format("DD MMM YYYY")}
                    </h1>
                    <h1>Files : {team.files.length}</h1>
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
