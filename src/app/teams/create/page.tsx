"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "sonner";
// import { useConvex } from "convex/react";

function CreateTeam() {
  // const convex = useConvex();
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  // const [cancel, setCancel] = useState(false);
  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email,
      teamMembers: [user?.email]
    }).then((resp) => {
      if (resp) {
        router.push("/dashboard");
        toast.success("Team created successfully!!!");
      }
    });
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
