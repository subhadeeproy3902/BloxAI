"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "sonner";
import { useConvex } from "convex/react";
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store';
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { createNewTeamUrl } from "@/lib/API-URLs";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const user = useSelector((state:RootState)=>state.auth.user)
  const router = useRouter();
  const axiosInstance = createAxiosInstance(user.accessToken);

  const createNewTeam = async() => {
    try {
      const res = await axiosInstance.post(createNewTeamUrl,{
        teamName
      });
      if(res.status === 200){
        router.push('/dashboard');
        toast.success("File created Successfully");
      }
    } catch (err) {

      console.log(err);
    }
  };
  
  return (
    <div className=" px-6 md:px-16 my-16">
      <Image src="/android-chrome-512x512.png" alt="logo" width={50} height={50} />
      <div className="flex flex-col items-center mt-8 gap-4">
        <h2 className="font-bold text-[40px] py-3">
          What should we call your team?
        </h2>
        <div className="mt-7 w-[40%]">
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
          <Button
          onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
