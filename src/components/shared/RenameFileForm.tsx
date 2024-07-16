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
import { useConvex } from "convex/react";
import { PencilIcon } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { SetStateAction } from "react";
import { updateFileUrl } from "@/lib/API-URLs";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { FILE } from "@/types/types";

const FormSchema = z.object({
  newName: z.string().min(1, {
    message: "Team Name required!",
  }),
});

type Props = {
  file:FILE;
  setIsSubmitted: React.Dispatch<SetStateAction<boolean>>;
  user:any;
}

export function RenameFileForm({file,setIsSubmitted,user}:Props) {

  const axiosInstance = createAxiosInstance(user.accessToken)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newName: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axiosInstance.put(updateFileUrl,{
        fileName:data.newName, 
        filePrivate:file.filePrivate, 
        fileId:file._id,
        archive: (file.archive === undefined) ? false : file.archive
      })
      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="newName"
          render={({ field }) => (
            <FormItem className="w-full p-4">
              <FormLabel className="px-2">File Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormDescription className="px-2">
                Enter file name here!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex gap-2 font-semibold">
          Rename <PencilIcon className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
