// components/Typewriter.tsx
"use client";
import React, { useEffect, useState } from 'react';

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState(text[0] || '');
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    const typingSpeed = 150; // Speed for typing (milliseconds)
    const deletingSpeed = 100; // Speed for deleting (milliseconds)
    const pauseDuration = 500; // Pause duration (milliseconds)

    useEffect(() => {
        if (pause) {
            return;
        }

        const handleTyping = () => {
            const firstLetter = text[0];
            const remainingText = text.slice(1);
            const currentDisplayedText = displayedText.slice(1);

            if (isDeleting) {
                if (currentDisplayedText.length > 0) {
                    setDisplayedText(firstLetter + currentDisplayedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setPause(true);
                    setTimeout(() => setPause(false), pauseDuration);
                }
            } else {
                if (currentDisplayedText.length < remainingText.length) {
                    setDisplayedText(firstLetter + remainingText.slice(0, currentDisplayedText.length + 1));
                } else {
                    setIsDeleting(true);
                    setPause(true);
                    setTimeout(() => setPause(false), pauseDuration);
                }
            }
        };

        const interval = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearInterval(interval);
    }, [displayedText, isDeleting, pause, text]);

    return (
        <h1 className="text-5xl md:text-9xl font-bold mt-1 leading-none bg-gradient-to-b from-neutral-900 via-zinc-900 to-stone-400 dark:from-neutral-50 dark:via-stone-400 dark:to-zinc-950 text-transparent bg-clip-text">
            {displayedText}
        </h1>
    );
};

export default Typewriter;
