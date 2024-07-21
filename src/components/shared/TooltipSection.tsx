"use client";
import React from "react";
import { AnimatedTooltip } from "./AnimatedTooltip";
import { Button } from "../ui/button";
import Link from "next/link";

export function AnimatedTooltipPreview() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-6 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-12">
        <div className="flex-center flex-row flex-wrap">

          <div className="lg:py-18 space-y-2">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Collaborate With Teams
            </h2>

            <p className="mt-4 text-muted-foreground">
              Create beautiful flowcharts and diagrams and share effotlessly
              with your whole team!!
            </p>

            <Button asChild>
              <Link href="/dashboard">Start Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
