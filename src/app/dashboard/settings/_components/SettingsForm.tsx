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
import { toast } from "sonner";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type USER = {
  name: string;
  image: string;
  email: string;
  _id:string;
};

type Props = {
  savedData: USER;
  image:string;
};

const FormSchema = z.object({
  newName: z.string().min(1, {
    message: "Username required!",
  }),
});

export function SettingsForm({ savedData,image }: Props) {
  const convex = useConvex();
 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newName: savedData.name,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await convex.mutation(api.user.updateUser,{
      _id:savedData._id as Id<"user">,
      name:data.newName,
      email:savedData.email,
      image:image
    })
    toast("User updated !!")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center justify-center"
      >
        <div className="flex sm:w-[400px] flex-col gap-2">
          <FormItem className="w-full">
            <FormLabel className="px-2">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Email..."
                value={savedData.email}
                disabled
                className=""
              />
            </FormControl>
          </FormItem>
          <FormField
            control={form.control}
            name="newName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="px-2">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} className="" />
                </FormControl>
                <FormDescription className="px-2">
                  Enter username here!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="flex gap-2 font-semibold">
          Save
        </Button>
      </form>
    </Form>
  );
}
