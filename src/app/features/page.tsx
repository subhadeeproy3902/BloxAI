"use client";
import React from "react";
import { useSpring, animated } from "react-spring";
import Header from "@/components/shared/Header"; // Adjust the path as needed
import Footer from "@/components/shared/Footer"; // Adjust the path as needed
import Lottie from "./Lottie"; // Import the custom Lottie component

// Array of feature objects with Lottie animations
const features = [
  {
    lottieSrc:
      "https://lottie.host/4d2d445c-5c5f-4aad-ba57-079e9cab2b12/eVBdbP4GMK.json",
    title: "Effortless Flowchart and Diagram Creation",
    description:
      "Easily create flowcharts and diagrams with our intuitive tools.",
    animation: {
      to: { transform: "translateY(-10px)" },
      from: { transform: "translateY(0px)" },
      config: { duration: 1000 },
    },
  },
  {
    lottieSrc:
      "https://lottie.host/7e98f402-09d2-468f-ace3-2b3027d7dbd7/eR4CD42uXc.json",
    title: "Rich Text Editor",
    description:
      "Craft beautiful documentation with our powerful rich text editor.",
    animation: {
      to: { transform: "translateY(-10px)" },
      from: { transform: "translateY(0px)" },
      config: { duration: 1000 },
    },
  },
  {
    lottieSrc:
      "https://lottie.host/ca2f5ce7-30f9-4751-b31c-b64525426d8c/0XICFyts1k.json",
    title: "Collaborative Sharing",
    description: "Share your creations effortlessly with your entire team.",
    animation: {
      to: { transform: "translateY(-10px)" },
      from: { transform: "translateY(0px)" },
      config: { duration: 1000 },
    },
  },
  {
    lottieSrc:
      "https://lottie.host/0df43d08-8b35-4b66-a7a0-7d759332b0ba/4LGFscN9v6.json",
    title: "Versatile Visualizations",
    description:
      "From simple flowcharts to complex diagrams, Blox AI covers all your visualization needs.",
    animation: {
      to: { transform: "translateY(-10px)" },
      from: { transform: "translateY(0px)" },
      config: { duration: 1000 },
    },
  },
  {
    lottieSrc:
      "https://lottie.host/b0502e99-7e49-4cde-bd67-96d1cc63a620/J89yf4KsCa.json",
    title: "AI Explanation",
    description:
      "Gemini AI visual model integration for explanation of the flowcharts of other diagrams made in the editor.",
    animation: {
      to: { transform: "translateY(-10px)" },
      from: { transform: "translateY(0px)" },
      config: { duration: 1000 },
    },
  },
  {
    lottieSrc:
      "https://lottie.host/38bbbd68-3153-4d62-8b67-05ef7bb8041d/XhinUyijbv.json",
    title: "Secure Workspaces",
    description:
      "Enjoy peace of mind with our secured workspaces for your projects.",
    animation: {
      to: { transform: "translateY(-10px)" },
      from: { transform: "translateY(0px)" },
      config: { duration: 1000 },
    },
  },
];

// TypeScript interface for the Feature
interface Feature {
  lottieSrc: string;
  title: string;
  description: string;
  animation: {
    to: React.CSSProperties;
    from: React.CSSProperties;
    config: any;
  };
}

// Component for the feature section
const FeatureSection = () => {
  return (
    <>
      <Header />
      <section className="dark:text-neutral-50 dark:border-gray-800 dark:border-opacity-20 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <AnimatedFeatureCard
                key={index}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Component for each animated feature card
const AnimatedFeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  const [hovered, setHovered] = React.useState(false);

  const props = useSpring({
    transform: hovered
      ? feature.animation.to.transform
      : feature.animation.from.transform,
    config: feature.animation.config,
  });

  const getLottieSize = (index: number) => {
    if (index === 0) return { width: "225px", height: "225px" };
    if (index === 1) return { width: "225px", height: "225px" };
    if (index === 2) return { width: "200px", height: "200px" };
    return { width: "150px", height: "150px" };
  };

  return (
    <animated.div
      className="flex flex-col items-center rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300 glass-effect text-left"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: "400px", // Set a fixed height for all cards
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 165, 0, 0.5)", // Neon orange border color
        boxShadow: hovered
          ? "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
          : "0 0 0 0 rgba(31, 38, 135, 0.37)",
        background: hovered
          ? "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,165,0,0.3))"
          : "transparent", // Add gradient background
      }}
    >
      <div className="flex justify-center flex-1">
        <Lottie src={feature.lottieSrc} style={getLottieSize(index)} />
      </div>
      <div
        className="flex-1 flex flex-col justify-end"
        style={{ marginBottom: "5px" }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {feature.description}
        </p>
      </div>
    </animated.div>
  );
};

export default FeatureSection;
