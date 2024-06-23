import React from "react";
import { Star } from "lucide-react";

interface ReviewItem {
  quote: string;
  name: string;
}

interface ReviewCarouselProps {
  items: ReviewItem[];
}

const VerticalScrollColumn: React.FC<{ items: ReviewItem[]; speed: string }> = ({ items, speed }) => {
  return (
    <div className="flex flex-col">
      <div className={`scroll-column ${speed}`}>
        {items.concat(items).map((item, index) => (
          <div key={index} className="flex flex-col items-start py-4 w-full">
            <div className="bg-white dark:bg-secondary shadow-lg rounded-lg p-6 max-w-sm mx-auto w-full">
              <div className="flex items-center mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} color="orange" fill="orange" className="neon-star" />
                  ))}
              </div>
              <p className="italic mt-4 text-left text-gray-800 dark:text-gray-200">
              &ldquo;{item.quote}&ldquo;
              </p>
              <p className="font-bold mt-2 text-left text-gray-800 dark:text-gray-200">
                - {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ items }) => {
  const columnItems = Math.ceil(items.length / 3);

  return (
    <div className="relative flex  overflow-hidden h-96 w-full space-x-4">
      {/* Visible on larger screens */}
      <div className="hidden md:flex w-full space-x-4 justify-center">
        <VerticalScrollColumn items={items.slice(0, columnItems)} speed="fast" />
        <VerticalScrollColumn items={items.slice(columnItems, columnItems * 2)} speed="slow" />
        <VerticalScrollColumn items={items.slice(columnItems * 2)} speed="fast" />
      </div>
      {/* Visible on smaller screens */}
      <div className="flex md:hidden w-full justify-center">
        <VerticalScrollColumn items={items} speed="slow" />
      </div>
    </div>
  );
};
