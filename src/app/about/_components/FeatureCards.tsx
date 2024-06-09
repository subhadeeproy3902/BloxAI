import React from 'react';


const FeatureCards = () => {
    return (
        <div>
            <section className='grid grid-cols md:grid-cols-3 gap-10'>
                <div className='relative bg-opacity-8 px-4 gradient2 dark:gradient1 border border-secondary rounded-xl w-full p-5 py-8'>
                    <div className="absolute inset-0 z-[-1] rounded-xl bg-transparent filter blur-lg opacity-30">
                        <div className="absolute inset-0 rounded-xl bg-orange-500"></div>
                    </div>
                    <h1 className='text-xl font-bold'>AI Explanation with Gemini AI</h1>
                    <p className='text-base mt-5'>Integrate Gemini AI to get detailed explanations and insights into your flowcharts and diagrams, boosting understanding and efficiency.</p>
                </div>
                <div className='relative bg-opacity-8 px-4 gradient2 dark:gradient1 border border-secondary rounded-xl w-full p-5 py-8'>
                    <div className="absolute inset-0 z-[-1] rounded-xl bg-transparent filter blur-lg opacity-30">
                        <div className="absolute inset-0 rounded-xl bg-orange-500"></div>
                    </div>
                    <h1 className='text-xl font-bold'>Collaborative Sharing</h1>
                    <p className='text-base mt-5'>Share your creations seamlessly with your team, enhancing collaboration and productivity across projects.</p>
                </div>
                <div className='relative bg-opacity-8 px-4 gradient2 dark:gradient1 border border-secondary rounded-xl w-full p-5 py-8'>
                    <div className="absolute inset-0 z-[-1] rounded-xl bg-transparent filter blur-lg opacity-30">
                        <div className="absolute inset-0 rounded-xl bg-orange-500"></div>
                    </div>
                    <h1 className='text-xl font-bold'>Effortless Diagram Creation</h1>
                    <p className='text-base mt-5'>Easily create flowcharts and diagrams with our intuitive tools, making complex processes simple and visual.</p>
                </div>
                <div className='relative bg-opacity-8 px-4 gradient2 dark:gradient1 border border-secondary rounded-xl w-full p-5 py-8'>
                    <div className="absolute inset-0 z-[-1] rounded-xl bg-transparent filter blur-lg opacity-30">
                        <div className="absolute inset-0 rounded-xl bg-orange-500"></div>
                    </div>
                    <h1 className='text-xl font-bold'>Rich Text Editor</h1>
                    <p className='text-base mt-5'>Craft beautiful and detailed documentation using our powerful and user-friendly rich text editor.</p>
                </div>
                <div className='relative bg-opacity-8 px-4 gradient2 dark:gradient1 border border-secondary rounded-xl w-full p-5 py-8'>
                    <div className="absolute inset-0 z-[-1] rounded-xl bg-transparent filter blur-lg opacity-30">
                        <div className="absolute inset-0 rounded-xl bg-orange-500"></div>
                    </div>
                    <h1 className='text-xl font-bold'>Versatile Visualizations</h1>
                    <p className='text-base mt-5'>From simple flowcharts to intricate diagrams, Blox AI covers all your visualization needs, adapting to any project requirement.</p>
                </div>
                <div className='relative bg-opacity-8 px-4 gradient2 dark:gradient1 border border-secondary rounded-xl w-full p-5 py-8'>
                    <div className="absolute inset-0 z-[-1] rounded-xl bg-transparent filter blur-lg opacity-30">
                        <div className="absolute inset-0 rounded-xl bg-orange-500"></div>
                    </div>
                    <h1 className='text-xl font-bold'>Secure Workspaces</h1>
                    <p className='text-base mt-5'>Enjoy peace of mind with secure workspaces designed to protect your projects and ensure your data remains safe and private.</p>
                </div>
            </section>
        </div>
    );
};

export default FeatureCards;
