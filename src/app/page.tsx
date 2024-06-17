'use client'
import { FollowingPointerDemo } from "@/components/shared/FollowingCard";
import { Hero } from "@/components/shared/Hero";
import StartNow from "@/components/shared/StartNow";
import { AnimatedTooltipPreview } from "@/components/shared/TooltipSection";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollUp";
import Lenis from '@studio-freight/lenis';
import { useEffect } from "react";
import Faq from "@/components/shared/Faq";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time :any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <div className="relative">
        <Header />
        <Hero />
        <StartNow />
        <AnimatedTooltipPreview />
        <FollowingPointerDemo />
      </div>
      <div>
      <Faq />
    </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
