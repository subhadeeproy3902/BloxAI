import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex gap-2 items-center justify-start p-4">
      <Link href={"/dashboard"}>
        <Button variant={"ghost"} size={"icon"}>
          <ArrowBigLeftIcon className="w-7 h-7" />
        </Button>
      </Link>
      <h1 className=" text-lg">Settings</h1>
    </div>
  );
}
