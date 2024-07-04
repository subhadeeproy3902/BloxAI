import Image from "next/image";
import heroImg from "@/app/assets/651593780abfac438bc371ae_Group 573.webp";
import { SigninForm } from "@/components/shared/SigninForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex relative h-screen w-screen">
      <div className=" absolute top-5 left-5">
        <Link href={"/"}>
          <Image
            src={"/apple-touch-icon.png"}
            className=" cursor-pointer"
            alt="logo"
            width={45}
            height={45}
          />
        </Link>
      </div>

      <div className="flex items-center justify-center w-full">
        <Card className="w-[350px] sm:w-[400px] xl:w-[500px] border-none">
          <CardHeader className="flex gap-3 flex-col text-center">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <SigninForm />
          </CardContent>
        </Card>
      </div>
      <div className="hidden sm:flex items-center justify-center w-full p-4">
        <Image
          src={heroImg}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover max-h-full object-right-top"
          draggable={false}
        />
      </div>
    </div>
  );
}
