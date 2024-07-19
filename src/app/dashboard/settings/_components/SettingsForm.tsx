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

import { USER } from "@/types/types";
import createAxiosInstance from "@/config/AxiosProtectedRoute";
import { updateProfileUrl } from "@/lib/API-URLs";
import { useDispatch } from "react-redux";
import { updateUser } from "@/app/Redux/Auth/auth-slice";

type Props = {
  savedData: USER;
  image:string;
};

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Minimum Length should be 3!",
  }),
  lastName: z.string().min(3, {
    message: "Minimum Length should be 3!",
  }),
});

export function SettingsForm({ savedData,image }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: savedData.firstName,
      lastName: savedData.lastName,
    },
  });

  const axiosInstance = createAxiosInstance(savedData.accessToken);
  const dispatch = useDispatch();

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    const { firstName, lastName} = data;

    try {
      const res = await axiosInstance.put(updateProfileUrl,{firstName, lastName});
      if(res.status === 200) {
        dispatch(updateUser({firstName,lastName}));
        toast.success("User updated !!")
      }
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
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="px-2">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name..." {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="px-2">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name..." {...field} className="" />
                </FormControl>
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
