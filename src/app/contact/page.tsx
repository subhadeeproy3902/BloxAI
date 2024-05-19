import Image from "next/image";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";

import { FollowingPointerDemo } from "@/components/shared/FolowingCard";
import Header from "@/components/shared/Header";
import { Hero } from "@/components/shared/Hero";
import StartNow from "@/components/shared/StartNow";
import { AnimatedTooltipPreview } from "@/components/shared/TooltipSection";
import Contact from "@/components/shared/contactform";

import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Blox AI | Contact Us",
  description: "Fill in the form if you are facing an issue or have any query.",
};

const page = () => {

  return (
    <>
      <div className="relative">
        <Header />
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default page;