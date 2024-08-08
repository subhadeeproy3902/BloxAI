import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {faqs} from "@/utilstson/FAQ";

interface FAQProps {
    question: string;
    answer: string;
}

export default function FAQ() {
  return (
    <>
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-orange-500 bg-opacity-50 pb-2 pt-10">
        FAQs
      </h1>
      <p className="mt-5 text-muted-foreground/75 text-center">Here are some of the basic FAQs for you to have a look at!</p>
      <div className="px-16 pt-20 pb-32 md:px-64">
        <Accordion type="single" collapsible className="w-full text-muted-foreground">
            {faqs.map((faq: FAQProps, index: number) => (
                <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </>
  );
}
