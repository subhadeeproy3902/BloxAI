"use client";
import React, { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
export default function IntroPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 rounded-lg mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to BloxAI</h1>
            <p className="text-lg mb-8">
              Craft stunning flowcharts, diagrams, and visuals effortlessly.
            </p>
            <Button variant="default" size="lg">
              Get Started
            </Button>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600">
                Work together with your team in real-time, allowing seamless
                collaboration on diagrams and flowcharts.
              </p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Intuitive Editor</h3>
              <p className="text-gray-600">
                Our intuitive editor makes it easy to create stunning visuals,
                with a wide range of tools and features at your fingertips.
              </p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Secure Sharing</h3>
              <p className="text-gray-600">
                Share your creations with peace of mind, thanks to our secure
                sharing options and access controls.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="bg-primary text-white rounded-full p-2 mr-4">
                  1
                </span>
                <p className="text-lg font-semibold">
                  Open the Excalidraw canvas
                </p>
              </div>
              <div className="flex items-center">
                <span className="bg-primary text-white rounded-full p-2 mr-4">
                  2
                </span>
                <p className="text-lg font-semibold">
                  Start drawing your diagrams
                </p>
              </div>
              <div className="flex items-center">
                <span className="bg-primary text-white rounded-full p-2 mr-4">
                  3
                </span>
                <p className="text-lg font-semibold">
                  Collaborate with your team in real-time
                </p>
              </div>
            </div>
            <div>
              <Excalidraw />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">What is BloxAI?</h3>
              <p className="text-gray-600">
                BloxAI is a powerful diagramming tool that allows you to create
                stunning visuals, flowcharts, and diagrams effortlessly.
              </p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                Can I collaborate with my team?
              </h3>
              <p className="text-gray-600">
                Yes, BloxAI supports real-time collaboration, allowing you and
                your team members to work on the same diagram simultaneously.
              </p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                Is BloxAI secure and private?
              </h3>
              <p className="text-gray-600">
                Absolutely! We prioritize security and privacy, ensuring that
                your data is safe and secure at all times.
              </p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                Can I export my diagrams?
              </h3>
              <p className="text-gray-600">
                Yes, you can export your diagrams in various formats, including
                PNG, SVG, and PDF, making it easy to share or print your work.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;BloxAI has been a game-changer for our team. The real-time
                collaboration features have streamlined our workflow, and the
                intuitive editor makes creating diagrams a breeze.&quot;
              </p>
              <p className="font-bold">- John Doe, Project Manager</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;The secure sharing options and access controls give us
                peace of mind when sharing our work. We highly recommend BloxAI
                to any team that needs a powerful diagramming tool.&quot;
              </p>
              <p className="font-bold">- Jane Smith, Team Lead</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;BloxAI&apos;s real-time collaboration and intuitive editor
                have made our diagramming process much more efficient. It&apos;s
                a must-have tool for any team.&quot;
              </p>
              <p className="font-bold">- Bob Johnson, Product Manager</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;BloxAI has been a game-changer for our team. The real-time
                collaboration features have streamlined our workflow, and the
                intuitive editor makes creating diagrams a breeze.&quot;
              </p>
              <p className="font-bold">- John Doe, Project Manager</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;The secure sharing options and access controls give us
                peace of mind when sharing our work. We highly recommend BloxAI
                to any team that needs a powerful diagramming tool.&quot;
              </p>
              <p className="font-bold">- Jane Smith, Team Lead</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                &quot;BloxAI&apos;s real-time collaboration and intuitive editor
                have made our diagramming process much more efficient. It&apos;s
                a must-have tool for any team.&quot;
              </p>
              <p className="font-bold">- Bob Johnson, Product Manager</p>
            </div>
          </div>
        </div>
        <div className="bg-primary text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Have any questions or need assistance? Feel free to reach out to
                us.
              </p>
              <p className="mb-4">
                <strong>Email:</strong> subha9.5@gmail.com
              </p>
              <p className="mb-4">
                <strong>Phone:</strong> +91 86373 73116
              </p>
            </div>
            <div>
              <p className="mb-4">
                You can also visit our office or send us a letter:
              </p>
              <p className="mb-4">
                <strong>Address:</strong> 123 Main Street, City, State 12345
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 p-8 rounded-lg text-center">
          <p className="mb-4">© 2024 BloxAI. All rights reserved.</p>
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
      </div>
    </div>
  );
}
