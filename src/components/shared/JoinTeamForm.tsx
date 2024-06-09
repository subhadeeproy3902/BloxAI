"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";

export type TEAMS = {
  createdBy:string; 
  teamMembers?:string[];
  teamName:string;
  _creationTime:number; 
  _id:Id<"teams">;
}
const FormSchema = z.object({
  code: z.string().min(1, {
    message: "Code is required!",
  }),
});

type Props = {
  user:any;
  setIsDialogOpen:React.Dispatch<SetStateAction<boolean>>;
}

export function JoinTeamForm({user,setIsDialogOpen}:Props) {

  const convex = useConvex();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const id:Id<"teams"> = data.code as Id<"teams">;

    const teamData:TEAMS = await convex.query(api.teams.getTeamById, {
      _id: id,
    });

    if (teamData.teamMembers?.includes(user.email) || teamData.createdBy == user.email) {
      toast.error(`Already member of ${teamData.teamName}`)
      setIsDialogOpen(false);
      return;
    }

    let memberArray:string[];

    if(teamData.teamMembers){
      memberArray = teamData.teamMembers;
    }else{
      memberArray = [teamData.createdBy];
    }

    memberArray.push(user.email);

    console.log(memberArray);

    const result = await convex.mutation(api.teams.addMember, {
      _id: id,
      memberArray: memberArray,
    });

    router.refresh();
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col items-center justify-center">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full p-4">
              <FormLabel className="px-2">Code</FormLabel>
              <FormControl>
                <Input placeholder="code..." {...field} />
              </FormControl>
              <FormDescription className="px-2">Paste the shared code here!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"  className=" font-semibold">Join team!</Button>
      </form>
    </Form>
  );
}
