"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="pt-20">
      <h1 className="text-7xl text-center font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-orange-500 bg-opacity-50">
          About Us
        </h1>
        <div className="mx-auto mt-18 mb-20 max-w-screen-xl px-6 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-first lg:h-full">
              <Image
                alt=""
                src="/about-pic.png"
                width={550}
                height={550}
                className="absolute inset-0 h-full w-full object-cover rounded shadow"
              />
            </div>

            <div className="lg:py-24 space-y-2">
              <h2 className="text-3xl font-bold sm:text-4xl">
                What is Blox AI?
              </h2>

              <p className="mt-5 text-muted-foreground">
                Blox AI is an innovative platform designed to make creating
                flowcharts, diagrams, and rich documentation effortless.
                Leveraging intuitive tools and the advanced capabilities of the
                Google Gemini AI model, Blox AI enhances your ability to
                visualize complex processes and ideas. It provides seamless
                collaboration features, secure workspaces, and AI-driven
                insights, making it the go-to solution for individuals and teams
                aiming to turn their concepts into clear, visual
                representations.
              </p>

              <Button asChild>
                <Link href="/dashboard">Start Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About