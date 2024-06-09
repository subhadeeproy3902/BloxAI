"use client";
import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReviewCarousel } from "../ui/reviewcarousel";

const testimonials2 = [
  {
    quote:
      "Blox AI has completely transformed the way we visualize ideas within our organization. The effortless creation tools make it simple for even non-technical team members to create professional-looking visuals and share ideas with ease and efficiency",
    name: "Stacy Stone",
    title: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=1",
  },
  {
    quote:
      "Blox AI has become an indispensable tool for our team's workflow. Whether we're brainstorming new ideas, mapping out user journeys, or documenting complex algorithms Blox AI provides us with the versatility and functionality we need.",
    name: "Andrew Jettpace",
    title: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=2",
  },
  {
    quote:
      "Blox AI has truly impressed me with its versatility and reliability. Whether I'm working on a simple flowchart or a complex diagram, Blox AI provides the tools I need to bring ideas to life The integration of the Gemini AI model for explanations adds a layer of intelligence to it",
    name: "Edgar Allan Poe",
    title: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=3",
  },
  {
    quote:
      "I've been using Blox AI for a while now, and it has become an integral part of my workflow. The ease of creating flowcharts, coupled with the AI explanation feature has greatly enhanced productivity and sharing option allows me to effortlessly collaborate",
    name: "Cornelius Sheppard",
    title: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=4",
  },
];

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  feedback: z.string(),
});

export function TextareaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
}

function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  console.log(values);
}

export default function Review() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });
  const handleSubmit = () => {};
  return (
    <main className="flex flex-col items-center p-4 md:p-10 w-full">
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl md:text-4xl font-semibold py-5">
          Read what our customers love about us.
        </p>
        <ReviewCarousel items={testimonials2} direction="left" speed="slow" />
      </div>
        <p  className=" text-4xl md:text-6xl font-bold mb-5 bg-gradient-to-b from-zinc-100 via-orange-400 to-orange-500 bg-clip-text text-transparent text-center mt-4">
          Loved our product?
        </p>
      <div className="flex  w-[80vw] flex-col items-center justify-center  lg:w-[50vw] md:w[50vw] gap-6 mx-auto  mb-6 pt-10 pb-6 bg-opacity-8 px-4 rounded-lg gradient2 dark:gradient1 shadow shadow-orange-600 dark:shadow-orange-900 border border-secondary">
   
        <p className="text-center text-3xl md:text-5xl font-bold py-2 bg-gradient-to-r bg-clip-text text-transparent from-muted-foreground via-primary-foreground to-muted-foreground">
          Leave a Review 👇
        </p>
      <div className="w-full max-w-lg p-4 md:p-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Manav Malhotra"
                        className="flex h-10 w-full rounded-md border border-orange-500 dark:border-orange-900 placeholder:text-muted-foreground bg-background/75 px-3 py-2 text-sm shadow-inner shadow-orange-400 dark:shadow-orange-900 hover:border-orange-600 hover:transition-all focus:border-orange-600 dark:focus:border-orange-900 focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-orange-500"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
 className="flex h-10 w-full rounded-md border border-orange-500 dark:border-orange-900 placeholder:text-muted-foreground bg-background/75 px-3 py-2 text-sm shadow-inner shadow-orange-400 dark:shadow-orange-900 hover:border-orange-600 hover:transition-all focus:border-orange-600 dark:focus:border-orange-900 focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-orange-500"                        placeholder="manav@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Your Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you loved about our product"
                        className="flex h-10 w-full rounded-md border border-orange-500 dark:border-orange-900 placeholder:text-muted-foreground bg-background/75 px-3 py-2 text-sm shadow-inner shadow-orange-400 dark:shadow-orange-900 hover:border-orange-600 hover:transition-all focus:border-orange-600 dark:focus:border-orange-900 focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-orange-500 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              <b>SUBMIT</b>
            </Button>
          </form>
        </Form>
      </div>
      </div>
    </main>
  );
}
