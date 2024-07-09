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
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { SetStateAction } from "react";
import { PencilIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";

const FormSchema = z.object({
  newName: z.string().min(1, {
    message: "Team Name required!",
  }),
});

type Props = {
  setIsSubmitted: React.Dispatch<SetStateAction<boolean>>;
};

export function RenameTeamForm({ setIsSubmitted }: Props) {
  const convex = useConvex();
  const id = useSelector((state: RootState) => state.team.teamId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newName: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await convex.mutation(api.teams.renameTeam, {
      _id:id as Id<"teams">,
      newName:data.newName
    })
    setIsSubmitted(true);
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
              <FormLabel className="px-2">Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormDescription className="px-2">
                Enter team name here!
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
