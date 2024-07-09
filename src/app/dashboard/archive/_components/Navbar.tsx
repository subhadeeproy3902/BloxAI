import { ArrowBigLeftIcon, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toggleClose } from "@/app/Redux/Menu/menuSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();

  const searchFile = (e: string) => {
    console.log(e);
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-4 items-center justify-center">
        <button
          className="md:hidden relative "
          onClick={() => {
            dispatch(toggleClose());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="27"
            height="27"
            fill="currentColor"
          >
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </button>
        <Link className="hidden md:inline relative " href={"/dashboard"}>
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
