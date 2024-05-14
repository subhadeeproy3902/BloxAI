import { FollowingPointerDemo } from "@/components/shared/FolowingCard";
import { Hero } from "@/components/shared/Hero";
import StartNow from "@/components/shared/StartNow";
import { AnimatedTooltipPreview } from "@/components/shared/TooltipSection";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <StartNow />
      <AnimatedTooltipPreview />
      <FollowingPointerDemo />
    </div>
  );
}
