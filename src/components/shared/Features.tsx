"use client";
import React from "react";
import animation1 from "../ui/animation1.json";
import animation2 from "../ui/animation2.json";
import animation3 from "../ui/animation3.json";
import animation4 from "../ui/animation4.json";
import animation5 from "../ui/animation5.json";
import animation6 from "../ui/animation6.json";
import Lottie from "lottie-react";

const Features = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-orange-500 bg-opacity-50 pb-2">
          Features
        </h1>
        <p className="max-w-[714px] mx-auto mb-5 font-medium text-muted-foreground mt-2.5">
        Effortlessly create diagrams, and collaborate with your team, all with AI-driven analysis.
        All in one secure and easy-to-use platform.
        </p>
      </div>
      <div className="relative m-24">
        <div className="features-row-border-light dark:features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 left-1/2 -translate-y-1/2 lg:-translate-x-1/3 lg:left-1/4 hidden lg:block"></div>
        <div className="features-row-border-light dark:features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 right-1/2 -translate-y-1/2 lg:right-[8.3%] hidden lg:block"></div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group rounded-lg lg:rounded-none relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
              <span className="group-hover:opacity-100 opacity-0 features-bg-light dark:features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
              <span className="relative max-w-[250px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                <Lottie animationData={animation1} />
              </span>
              <h4 className="font-semibold text-lg text-foreground mb-4">
                Effortless Flowchart and Diagram Creation
              </h4>
              <p className="font-medium text-muted-foreground">
              Easily create flowcharts and diagrams with our intuitive tools.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group rounded-lg lg:rounded-none relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
              <span className="group-hover:opacity-100 opacity-0 features-bg-light dark:features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
              <span className="relative max-w-[250px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                <Lottie animationData={animation2} />
              </span>
              <h4 className="font-semibold text-lg text-foreground mb-4">
                Integrated Rich and Powerful <br></br> Text Editor
              </h4>
              <p className="font-medium text-muted-foreground">
              
Create beautiful documentation effortlessly with our powerful rich text editor. 
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group rounded-lg lg:rounded-none relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
              <span className="group-hover:opacity-100 opacity-0 features-bg-light dark:features-bg absolute w-full h-full left-0 top-0 -z-1"></span>
              <span className="relative max-w-[195px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                <Lottie animationData={animation3} />
              </span>
              <h4 className="font-semibold text-lg text-foreground mb-4">
                Collaborative Sharing
              </h4>
              <p className="font-medium text-muted-foreground">
              Share your creations effortlessly with your entire team.
              </p>
            </div>
          </div>
        </div>
        <div className="features-row-border-light dark:features-row-border w-full h-[1px]"></div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group rounded-lg lg:rounded-none relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
              <span className="group-hover:opacity-100 opacity-0 features-bg-light dark:features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
              <span className="relative max-w-[130px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                <Lottie animationData={animation4} />
              </span>
              <h4 className="font-semibold text-lg text-foreground mb-4">
              Versatile Visualizations
              </h4>
              <p className="font-medium text-muted-foreground">
              From simple flowcharts to complex diagrams, Blox AI covers all your visualization needs.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group rounded-lg lg:rounded-none relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
              <span className="group-hover:opacity-100 opacity-0 features-bg-light dark:features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
              <span className="relative max-w-[120px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                <Lottie animationData={animation5} />
              </span>
              <h4 className="font-semibold text-lg text-foreground mb-4">
              AI Explanation
              </h4>
              <p className="font-medium text-muted-foreground">
              Gemini AI visual model integration for explanation of the flowcharts of other diagrams made in the editor.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="group rounded-lg lg:rounded-none relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13">
              <span className="group-hover:opacity-100 opacity-0 features-bg-light dark:features-bg absolute w-full h-full left-0 top-0 -z-1 rotate-180"></span>
              <span className="relative max-w-[150px] w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                <Lottie animationData={animation6} />
              </span>
              <h4 className="font-semibold text-lg text-foreground mb-4">
                Secure Workspaces
              </h4>
              <p className="font-medium text-muted-foreground">
              Enjoy peace of mind with our secured workspaces for your projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
