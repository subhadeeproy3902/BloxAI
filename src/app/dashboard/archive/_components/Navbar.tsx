import { ArrowBigLeftIcon, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const searchFile = (e: string) => {
    console.log(e);
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-4 items-center justify-center">
        <Link href={"/dashboard"}>
          <ArrowBigLeftIcon className="h-8 w-8" />
        </Link>
        <h1>Archive</h1>
      </div>
      <div className="flex-center border overflow-hidden rounded-lg px-2 p-1">
        <Search size={24} />
        <Input
          type="text"
          placeholder="Search file..."
          className="border-0 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
