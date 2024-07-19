"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "./_components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { SettingsForm } from "./_components/SettingsForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import { USER } from "@/types/types";

export default function Page() {
  const [image, setImage] = useState<string>("");
  const user:USER = useSelector((state:RootState)=>state.auth.user)

  return (
    <div className="flex flex-col">
      <Navbar />
      {user  && (
        <div className="flex w-full h-full xl:p-5 items-center justify-center">
          <Card className="flex w-[300px] rounded-lg overflow-hidden relative sm:w-[700px] flex-col items-center justify-center my-5 sm:my-0 p-10 gap-6">
            <div className="absolute w-full h-[100px] sm:h-[140px] z-0 gradientBackground top-0"></div>

            <Button
              variant={"secondary"}
              size={"icon"}
              className="absolute top-9 sm:top-14 w-[32px] h-[32px] right-[37%] rounded-full z-10"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Avatar className="w-[100px] sm:w-[180px] relative h-[100px] sm:h-[180px]">
              <AvatarImage src={image} />
              <AvatarFallback className=" text-2xl">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <h1 className=" font-bold">{user.firstName}{" "}{user.lastName}</h1>
              <p className=" text-gray-400">{user.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant={"secondary"}>Change Picture</Button>
              <Button
                onClick={() => {
                  setImage("");
                  toast("Image Deleted!!");
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Picture
              </Button>
            </div>
            <Separator />
            <SettingsForm image={image} savedData={user} />
          </Card>
        </div>
      )}
    </div>
  );
}
