import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import ScrollToTopButton from "@/components/shared/ScrollUp";
import Footer from "@/components/shared/Footer";
import { IconContainer } from "@/components/shared/IconContainer";
import { Radar } from "@/components/shared/Radar";
import { Bot, Brain, File, Fingerprint, Images, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Blox AI | Getting Started",
  description: "Let's get you started with Blox AI.",
};

const Page = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      title: "Fast Refresh",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
      title: "Analytics",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: "Datacenter security",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      title: "Build on your terms",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: "Safe to use",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
      title: "Flexible",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 rounded-lg mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Welcome to BloxAI</h1>
              <p className="text-xl mb-8">
                Craft stunning flowcharts, diagrams, and visuals effortlessly.
              </p>
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="relative max-w-2xl mx-auto sm:text-center">
              <div className="relative z-10">
                <h3 className=" text-3xl font-semibold sm:text-4xl">
                  Features
                </h3>
                <p className="mt-3 text-gray-500">
                  BloxAI comes with a range of powerful features to help you
                  create stunning visuals and diagrams with ease.
                </p>
              </div>
              <div
                className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
                style={{
                  background:
                    "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
                }}
              ></div>
            </div>
            <div className="relative mt-12">
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-neutral-800/20 border-orange-400/10 space-y-3 p-4 border rounded-lg"
                  >
                    <div className="text-orange-600/75 pb-3">
                      <div className="rounded-full bg-orange-100 w-[40px] h-[40px] flex justify-center items-center">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-gray-500">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <hr />
        <section className="mb-12 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center">
                How to Use
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <span className="bg-primary text-white rounded-full w-10 h-10 flex justify-center items-center p-2 mr-6">
                    1
                  </span>
                  <p className="text-xl font-semibold">
                    Open the Excalidraw canvas
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="bg-primary text-white rounded-full w-10 h-10 flex justify-center items-center p-2 mr-6">
                    2
                  </span>
                  <p className="text-xl font-semibold">
                    Start drawing your diagrams
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="bg-primary text-white rounded-full w-10 h-10 flex justify-center items-center p-2 mr-6">
                    3
                  </span>
                  <p className="text-xl font-semibold">
                    Collaborate with your team in real-time
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">What is BloxAI?</h3>
                  <p className="text-gray-500">
                    BloxAI is a powerful diagramming tool that allows you to
                    create stunning visuals, flowcharts, and diagrams
                    effortlessly.
                  </p>
                </div>
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Can I collaborate with my team?
                  </h3>
                  <p className="text-gray-500">
                    Yes, BloxAI supports real-time collaboration, allowing you
                    and your team members to work on the same diagram
                    simultaneously.
                  </p>
                </div>
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Is BloxAI secure and private?
                  </h3>
                  <p className="text-gray-500">
                    Absolutely! We prioritize security and privacy, ensuring
                    that your data is safe and secure at all times.
                  </p>
                </div>
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Can I export my diagrams?
                  </h3>
                  <p className="text-gray-500">
                    Yes, you can export your diagrams in various formats,
                    including PNG, SVG, and PDF, making it easy to share or
                    print your work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
      </div>
      <div className="relative flex h-96 w-full flex-col items-center justify-center space-y-4 overflow-hidden px-4">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full  items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
            <IconContainer text="Write Documents" delay={0.2} />
            <IconContainer
              delay={0.4}
              text="Efficient Files"
              icon={<File className=" h-8 w-8 text-orange-400/75" />}
            />
            <IconContainer
              text="Flowcharts"
              delay={0.3}
              icon={<Images className=" h-8 w-8 text-orange-400/75" />}
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
            <IconContainer
              text="Use AI"
              delay={0.5}
              icon={<Brain className=" h-8 w-8 text-orange-400/75" />}
            />
            <IconContainer
              text="Bots Integration"
              icon={<Bot className=" h-8 w-8 text-orange-400/75" />}
              delay={0.8}
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
            <IconContainer
              delay={0.6}
              text="Collaboration"
              icon={<Users className=" h-8 w-8 text-orange-400/75" />}
            />
            <IconContainer
              delay={0.7}
              text="Authentication"
              icon={<Fingerprint className=" h-8 w-8 text-orange-400/75" />}
            />
          </div>
        </div>

        <Radar className="absolute -bottom-12" />
        <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-orange-700 to-transparent" />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Page;
