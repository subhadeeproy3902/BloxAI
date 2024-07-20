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
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { addTeamMemberUrl, getTeamByIdUrl } from "@/lib/API-URLs";
import createAxiosInstance from "@/config/AxiosProtectedRoute";


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
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  const axiosInstance = createAxiosInstance(user.accessToken);

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    const teamData = await axios.get(`${getTeamByIdUrl}/${data.code}`);

    if (teamData.data.teamMembers.includes(user._id) || teamData.data.createdBy.email == user.email) {
      toast.error(`Already member of ${teamData.data.teamName}`)
      setIsDialogOpen(false);
      return;
    }

    try {
      axiosInstance.post(addTeamMemberUrl,{teamId:data.code})
      toast.success(`Welcome to ${teamData.data.teamName}`)
    } catch (err) {
      console.log(err);
    }

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
