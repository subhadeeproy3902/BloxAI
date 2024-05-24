

import React from 'react'

function AboutUs() {
  return (

    
<div className="flex flex-wrap items-start justify-center min-h-screen pt-24">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold text-center mb-8">What is Blox AI</h1>
    <p className="text-lg text-center mb-8">
      Welcome to Blox AI, where crafting flowcharts and diagrams is a breeze and get an explanation from the top Google Gemini model about your creations! Seamlessly create stunning visuals and rich documentation with our intuitive tools. Collaborate effortlessly with your team, from basic flowcharts to intricate diagrams. Enjoy secure workspaces and easy sharing. Start visualizing your ideas today!
    </p>
    <div className="flex justify-between mb-8">
      <div className="w-3/8 pr-8"> {/* Increased width and added margin for Features section */}
        <div className="text-white p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-outside space-y-3">
            <li><strong>Effortless Flowchart and Diagram Creation:</strong> Easily create flowcharts and diagrams with our intuitive tools.</li>
            <li><strong>Rich Text Editor:</strong> Craft beautiful documentation with our powerful rich text editor.</li>
            <li><strong>Collaborative Sharing:</strong> Share your creations effortlessly with your entire team.</li>
            <li><strong>Versatile Visualizations:</strong> From simple flowcharts to complex diagrams, Blox AI covers all your visualization needs.</li>
            <li><strong>AI Explanation:</strong> Gemini AI visual model integration for explanation of flowcharts and other diagrams.</li>
            <li><strong>Wide Range of Use Cases:</strong> Whether it's wireframes, mind maps, or algorithms, Blox AI has you covered.</li>
            <li><strong>Secure Workspaces:</strong> Enjoy peace of mind with our secured workspaces for your projects.</li>
            <li><strong>Limited Files Allotment:</strong> Get a set number of files allotted, ensuring efficient resource usage.</li>
            <li><strong>Install as App:</strong> Can be installed as an app and run smoothly on mobile devices.</li>
          </ul>
        </div>
      </div>
      <div className="w-2/5 pl-8"> {/* Adjusted width and added margin for Tech Stack section */}
        <div className="text-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <ul className="list-disc list-outside space-y-10 sapace-x-10 ">
            <li>Next.Js 14</li>
            <li>Typescript</li>
            <li>ShadCN UI</li>
            <li>TailwindCSS</li>
            <li>Convex</li>
            <li>Kinde</li>
            <li>EditorJS</li>
            <li>Excalidraw</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default AboutUs