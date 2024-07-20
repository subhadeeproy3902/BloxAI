"use client";
import * as React from "react";
import { ReviewCarousel } from "../ui/reviewcarousel";

const testimonials2 = [
  { quote: "This is literally the most important app you will ever download in your life. Get on this before it’s so popular that everyone else is getting these tips too.", name: "SarahLuvzCash" },
  { quote: "I’m 13 and I’m rich. I love that with Pocket’s transaction anonymization I could sign up and start trading when I was 12 years old. I had a million dollars before I had armpit hair!", name: "RichieRich" },
  { quote: "Started an investment firm. I charge clients a 3% management fee and just throw all their investments into Pocket. Easy money!", name: "TheCountOfMonteChristo" },
  { quote: "Too good to be true. I was making money so fast with Pocket that it felt like a scam. But I sold my shares and withdrew the money and it’s really there, right in my bank account. This app is crazy!", name: "LazyRich99" },
  { quote: "Quit my job. I downloaded Pocket three days ago and quit my job today. I can’t believe no one else thought to build a stock trading app that works this way!", name: "RichieRich" },
  { quote: "Don’t download this app. Unless you want to have the best life ever! I am literally writing this from a yacht.", name: "JeffBezos" },
  { quote: "It’s like a superpower. Every tip Pocket has sent me has paid off. It’s like playing Blackjack but knowing exactly what card is coming next!", name: "ClarkKent" },
  { quote: "Don’t download this app. Unless you want to have the best life ever! I am literally writing this from a yacht.", name: "JeffBezos" },
  { quote: "It’s like a superpower. Every tip Pocket has sent me has paid off. It’s like playing Blackjack but knowing exactly what card is coming next!", name: "ClarkKent" }
];

export default function Review() {
  return (
    <div className="flex flex-col items-center p-4 md:p-10 w-full mb-28" id="review">
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-orange-500 bg-opacity-50 py-5 pt-10 mb-8">
          Review Us
        </p>
        <ReviewCarousel items={testimonials2} />
      </div>    
      </div>
  );
}
