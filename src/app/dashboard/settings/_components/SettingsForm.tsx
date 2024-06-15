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
  newName: z.string().min(1, {
    message: "Username required!",
  }),
});

export function SettingsForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newName: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {}

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
            <div className="flex w-[400px] flex-col">
              <FormItem className="w-full">
                <FormLabel className="px-2">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} className="" />
                </FormControl>
              </FormItem>
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
            </div>
          )}
        />
        <Button type="submit" className="flex gap-2 font-semibold">
          Save
        </Button>
      </form>
    </Form>
  );
}
