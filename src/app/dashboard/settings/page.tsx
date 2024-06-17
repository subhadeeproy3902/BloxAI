"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "./_components/Navbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { SettingsForm } from "./_components/SettingsForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const [savedData, setSavedData] = useState<any>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const result = await convex.query(api.user.getUser, {
        email: user?.email!,
      });
      setSavedData(result[0]);
      setImage(result[0].image);
    };
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <Navbar />
      {user && savedData && (
        <div className="flex w-full h-full xl:p-5 items-center justify-center">
          <Card className="flex rounded-lg overflow-hidden relative sm:w-[700px] flex-col items-center justify-center p-10 gap-6 px-10">
            <div className="absolute w-full h-[140px] z-0 gradientBackground top-0"></div>

            <Button
              variant={"secondary"}
              size={"icon"}
              className="absolute top-14 w-[32px] h-[32px] right-[37%] rounded-full z-10"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Avatar className="w-[180px] relative h-[180px]">
              <AvatarImage src={image} />
              <AvatarFallback className=" text-2xl">
                {user?.given_name?.charAt(0)}
                {user?.family_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <h1 className=" font-bold">{savedData.name}</h1>
              <p className=" text-gray-400">{savedData.email}</p>
            </div>
            <div className="flex gap-3">
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
            <SettingsForm image={image} savedData={savedData} />
          </Card>
        </div>
      )}
    </div>
  );
}
