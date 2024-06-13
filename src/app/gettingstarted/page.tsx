import React from "react";
import { Button } from "@/components/ui/button";

export default function IntroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to BloxAI</h1>
      <p className="text-lg mb-8">
        Craft stunning flowcharts, diagrams, and visuals effortlessly.
      </p>

      <div className="flex gap-4">
        <Button variant="default">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
}
