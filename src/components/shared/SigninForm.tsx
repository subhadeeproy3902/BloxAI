"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";
import { toast } from "sonner";
import { logOut } from "@/app/Redux/Auth/auth-slice";

const FormSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email required!",
  }),
  password: z.string().min(8, {
    message: "Minimum Length should be 8",
  }),
});

type Props = {
  session:any;
};

export function SigninForm({session}: Props) {
  const router = useRouter()

  if(session){
    router.push('/dashboard');
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const {email,password} = data;
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: `${window.location.origin}/dashboard`,
      });

      if (res?.url) {
        router.push(`${window.location.origin}/dashboard`);
      }

      if(res?.error) {
        toast.error("Invalid Credentials !!");
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full p-4">
              <FormLabel className="px-2">Email</FormLabel>
              <FormControl>
                <Input placeholder="Your-cool-email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full p-4">
              <div className="flex w-full items-center justify-between">
                <FormLabel className="px-2">Password</FormLabel>
                <Link
                  href={`/change`}
                  className=" text-xs text-gray-400 underline"
                >
                  Forgot password?{" "}
                </Link>
              </div>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 w-full">
          <p className=" text-xs text-gray-400 w-full"></p>

          <div className="flex items-center justify-center">
            <Button type="submit" className="flex gap-2 font-semibold">
              Login <LogInIcon className="w-5 h-5" />
            </Button>
          </div>

          <Separator className="w-full" />

          <div className="flex items-center justify-center">
            <Button type="button" onClick={() => {
               signIn('google')
            }} className="flex gap-2" variant={"secondary"}>
              Sign-in with Google{" "}
              <Image src={"/google.svg"} alt="google" width={18} height={18} />
            </Button>
          </div>

          <p className=" text-xs text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href={`/signup`} className=" underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
