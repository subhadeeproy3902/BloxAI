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

const FormSchema = z.object({
  code: z.string().min(0, {
    message: "Code is required!",
  }),
});

export function JoinTeamForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
