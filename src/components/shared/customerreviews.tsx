"use client";
import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';
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
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  feedback: z.string().nonempty("Feedback is required"),
  feedbackType: z.string().nonempty("Feedback type is required"),
  otherFeedback: z.string().optional(),
});

export default function Review() {
  const [showOtherFeedback, setShowOtherFeedback] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
      feedbackType: "",
      otherFeedback: "",
    },
  });

  const handleFeedbackTypeChange = (value: string) => {
    setShowOtherFeedback(value === "Other");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        values,
        process.env.NEXT_PUBLIC_EMAILJS_API_KEY!
      );
      alert("Thank you! Your review has been received.");
      form.reset();
    } catch (error) {
      console.error("Failed to send feedback:", error);
      alert("Failed to send feedback. Please try again later.");
    }
  };

  return (
    <main className="flex flex-col items-center p-4 md:p-10 w-full bg-gray-100">
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl md:text-4xl font-semibold py-5 text-gray-800">
          Read what our customers love about us.
        </p>
        <ReviewCarousel items={testimonials2} direction="left" speed="slow" />
      </div>
      <div className="flex w-full text-2xl flex-col items-center p-10 md:text-sm">
        <p className="text-xl md:text-2xl py-5 opacity-75 text-gray-600">
          Loved our product?
        </p>
        <p className="text-3xl md:text-5xl font-bold py-2 bg-gradient-to-r bg-clip-text text-transparent from-muted-foreground via-primary-foreground to-muted-foreground">
          Leave a Review 👇
        </p>
      </div>
      <div className="w-full max-w-lg mb-2 p-4 md:p-10 bg-white shadow-lg rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manav Malhotra"
                      type="text"
                      {...field}
                      className="border border-gray-300 focus:ring-primary-500 focus:border-primary-500 rounded-md px-4 py-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="manav@example.com"
                      type="email"
                      {...field}
                      className="border border-gray-300 focus:ring-primary-500 focus:border-primary-500 rounded-md px-4 py-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedbackType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Feedback Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFeedbackTypeChange(e.target.value);
                      }}
                      className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Feedback Type</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Question">Question</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            {showOtherFeedback && (
              <FormField
                control={form.control}
                name="otherFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Other Feedback</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please specify"
                        type="text"
                        {...field}
                        className="border border-gray-300 focus:ring-primary-500 focus:border-primary-500 rounded-md px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you loved about our product"
                      className="resize-none border border-gray-300 focus:ring-primary-500 focus:border-primary-500 rounded-md px-4 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition duration-300">
              <b>SUBMIT</b>
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
