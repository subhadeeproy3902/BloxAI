import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import ScrollToTopButton from "@/components/shared/ScrollUp";

export const metadata: Metadata = {
  title: "Blox AI | Getting Started",
  description: "Let's get you started with Blox AI.",
};

const Page = () => {
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

        <section className="mb-12">
          <h1 className="flex justify-center items-center font-bold text-3xl mb-5">
            Features
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">
                Real-time Collaboration
              </h2>
              <p className="text-gray-100">
                Work together with your team in real-time, allowing seamless
                collaboration on diagrams and flowcharts.
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Intuitive Editor</h2>
              <p className="text-gray-100">
                Our intuitive editor makes it easy to create stunning visuals,
                with a wide range of tools and features at your fingertips.
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Secure Sharing</h2>
              <p className="text-gray-100">
                Share your creations with peace of mind, thanks to our secure
                sharing options and access controls.
              </p>
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
                  <p className="text-gray-100">
                    BloxAI is a powerful diagramming tool that allows you to
                    create stunning visuals, flowcharts, and diagrams
                    effortlessly.
                  </p>
                </div>
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Can I collaborate with my team?
                  </h3>
                  <p className="text-gray-100">
                    Yes, BloxAI supports real-time collaboration, allowing you
                    and your team members to work on the same diagram
                    simultaneously.
                  </p>
                </div>
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Is BloxAI secure and private?
                  </h3>
                  <p className="text-gray-100">
                    Absolutely! We prioritize security and privacy, ensuring
                    that your data is safe and secure at all times.
                  </p>
                </div>
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Can I export my diagrams?
                  </h3>
                  <p className="text-gray-100">
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
        <section className="mb-12 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold mb-8 text-center">
                What Our Users Say
              </h2>
              <p className="text-gray-100 mb-4">
                &quot;BloxAI has been a game-changer for our team. The real-time
                collaboration features have streamlined our workflow, and the
                intuitive editor makes creating diagrams a breeze.&quot;
              </p>
              <p className="font-bold text-gray-200">
                - John Doe, Project Manager
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <p className="text-gray-100 mb-4">
                &quot;The secure sharing options and access controls give us
                peace of mind when sharing our work. We highly recommend BloxAI
                to any team that needs a powerful diagramming tool.&quot;
              </p>
              <p className="font-bold text-gray-200">- Jane Smith, Team Lead</p>
            </div>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <p className="text-gray-100 mb-4">
                &quot;BloxAI&apos;s real-time collaboration and intuitive editor
                have made our diagramming process much more efficient. It&apos;s
                a must-have tool for any team.&quot;
              </p>
              <p className="font-bold text-gray-200">
                - Bob Johnson, Product Manager
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-primary text-white p-8 rounded-lg">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-100 mb-6">
                  Have any questions or need assistance? Feel free to reach out
                  to us.
                </p>
                <p className="text-gray-100 mb-4">
                  <strong>Email:</strong> subha9.5@gmail.com
                </p>
                <p className="text-gray-100 mb-4">
                  <strong>Phone:</strong> +91 86373 73116
                </p>
              </div>
              <div>
                <p className="text-gray-100 mb-6">
                  You can also visit our office or send us a letter:
                </p>
                <p className="text-gray-100 mb-4">
                  <strong>Address:</strong> 123 Main Street, City, State 12345
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-secondary p-8 rounded-lg text-center">
            <p className="text-gray-100 mb-4">
              © 2024 BloxAI. All rights reserved.
            </p>
            <p>
              <a href="#" className="text-primary underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="text-primary underline">
                Terms of Service
              </a>
            </p>
          </div>
        </section>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default Page;
