import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img1 from "@/app/assets/Wzz6UELRpcvkKZQtmVmc.png";
import type { Metadata } from "next";
import Link from "next/link";
import FeatureSection from "./features/page";

export const metadata: Metadata = {
    title: "Blox AI | About",
    description: "About Blox AI.",
};

const page = () => {
    return (
        <>
            <Header />
            <section className=" md:mx-20 mt-32 mb-10 px-8 py-16 justify-center items-center">
                <div className="text-center">
                    <h1 className="text-5xl md:text-9xl font-bold mt-1 leading-none bg-gradient-to-b from-neutral-900 via-zinc-900 to-stone-400 dark:from-neutral-50 dark:via-stone-400 dark:to-zinc-950 text-transparent bg-clip-text">Blox AI</h1>
                    <p className="text-lg mt-3">Effortlessly create diagrams, and collaborate with your team, all with AI-driven analysis. <br className="hidden md:block" />  All in one secure  and easy-to-use platform.</p>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard">Get Started</Link>
                    </Button>
                </div>
            </section >
            <section>
                <div className="mx-auto my-20 max-w-screen-xl px-6 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-first lg:h-full">
                            <Image
                                alt=""
                                src={"/favicon.png"}
                                width="550" height="550"
                                className="absolute inset-0 h-full w-full object-cover rounded shadow"
                            />
                        </div>

                        <div className="lg:py-24 space-y-2">
                            <h2 className="text-3xl font-bold sm:text-4xl">
                                What is Blox AI?
                            </h2>

                            <p className="mt-5 text-muted-foreground">
                                Blox AI is an innovative platform designed to make creating flowcharts, diagrams, and rich documentation effortless. Leveraging intuitive tools and the advanced capabilities of the Google Gemini AI model, Blox AI enhances your ability to visualize complex processes and ideas. It provides seamless collaboration features, secure workspaces, and AI-driven insights, making it the go-to solution for individuals and teams aiming to turn their concepts into clear, visual representations.
                            </p>

                            <Button asChild>
                                <Link href="/dashboard">Start Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="md:mx-20 my-20 px-8 py-16 text-center">
                <div className="mt-20 flex items-center justify-center " >
                    <FeatureSection />
                </div>
            </section >
            <Footer />
        </>
    )
}

export default page