import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img1 from "@/app/assets/Wzz6UELRpcvkKZQtmVmc.png"; // Update the path accordingly
import type { Metadata } from "next";
import Link from "next/link";
import FeatureSection from "./features/page";
import Typewriter from "./Typewriter";

export const metadata: Metadata = {
    title: "Blox AI | About",
    description: "About Blox AI.",
};

const page = () => {
    return (
        <>
            <Header />
            <section className="md:px-20 pt-32 pb-10 px-8 py-16 justify-center items-center relative">
                <div className="text-center relative">
                    <Typewriter text="Let's know" />
                    <h1 className="text-4xl font-bold mt-2">
                        <Button asChild className="mt-4 relative font-bold text-xl">
                            <Link href="/dashboard">Blox AI</Link>
                        </Button>
                    </h1>
                    <p className="text-lg mt-3">
                        Effortlessly create diagrams, and collaborate with your team, all with AI-driven analysis.
                        <br className="hidden md:block" />
                        All in one secure and easy-to-use platform.
                    </p>
                </div>
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50 pointer-events-none">
                    <Image
                        src={"/doodle.png"}
                        alt="Overlay"
                        layout="fill"
                        objectFit="cover"
                // This will invert the image colors for dark mode
                    />
                </div>
                <div className="absolute arrow-container" style={{ top: '90%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }}>
                </div>
            </section>
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
                <div className="mt-20 flex items-center justify-center">
                    <FeatureSection />
                </div>
            </section>
            <Footer />
        </>
    );
}

export default page;