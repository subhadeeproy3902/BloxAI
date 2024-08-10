"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { createNewTeamUrl } from "@/lib/API-URLs";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const axiosInstance = createAxiosInstance(user.accessToken);

  const createNewTeam = async () => {
    try {
      const res = await axiosInstance.post(createNewTeamUrl, {
        teamName,
      });
      if (res.status === 200) {
        router.push("/dashboard");
        toast.success("Team created Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="px-6 md:px-16 my-16">
            <Image
              src="/android-chrome-512x512.png"
              alt="logo"
              width={50}
              height={50}
            />
            <div className="flex flex-col items-center mt-8 gap-4">
              <h2 className="font-bold text-[40px] py-3 text-center">
                What should we call your team?
              </h2>
              <div className="mt-7 w-full sm:px-8">
                <label className="text-muted-foreground">Team Name</label>
                <Input
                  placeholder="Team Name"
                  className="mt-3"
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="flex gap-10 items-center">
                <Button
                  disabled={!(teamName && teamName?.length > 0)}
                  onClick={() => createNewTeam()}
                >
                  Create Team
                </Button>
                <Button onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden max-h-svh overflow-hidden bg-muted md:block">
          <Image
            alt="Image"
            loading="lazy"
            width={500}
            height={500}
            src="https://i.postimg.cc/26253f6m/ok-2.png"
            className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
          />
        </div>
      </div>
    </>
  );
}

export default CreateTeam;
