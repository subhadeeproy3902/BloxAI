import { FollowingPointerDemo } from "@/components/shared/FolowingCard";
import { Hero } from "@/components/shared/Hero";
import StartNow from "@/components/shared/StartNow";
import { AnimatedTooltipPreview } from "@/components/shared/TooltipSection";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="relative">
      <Header/>
      <Hero />
      <StartNow />
      <AnimatedTooltipPreview />
      <FollowingPointerDemo />
    </div>
  );
}
