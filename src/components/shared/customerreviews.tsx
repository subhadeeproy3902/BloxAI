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
    <div className="flex flex-col items-center p-4 md:p-10 w-full">
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl md:text-4xl font-semibold py-5">
          Read what our customers love about us.
        </p>
        <ReviewCarousel items={testimonials2} />
      </div>
      <div className="flex w-full text-2xl flex-col items-center p-10 md:text-sm">
        <p className="text-xl md:text-2xl py-5 opacity-75">
          Loved our product?
        </p>
        <p className="text-3xl md:text-5xl font-bold py-2 bg-gradient-to-r bg-clip-text text-transparent from-muted-foreground via-primary-foreground to-muted-foreground">
          Leave a Review 👇
        </p>
      </div>
      <div className="w-full max-w-lg mb-2 p-4 md:p-10">
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
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manav Malhotra"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="manav@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedbackType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFeedbackTypeChange(e.target.value);
                      }}
                      className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Feedback Type</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Appreciation">Appreciation</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showOtherFeedback && (
              <FormField
                control={form.control}
                name="otherFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Feedback</FormLabel>
                    <FormControl>
                      <Input placeholder="Your feedback" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please leave your feedback here"

            <FormField
              control={form.control}
              name="feedbackType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFeedbackTypeChange(e.target.value);
                      }}
                      className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Feedback Type</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Question">Question</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showOtherFeedback && (
              <FormField
                control={form.control}
                name="otherFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Feedback</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please specify"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you loved about our product"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
            <Button type="submit" className="w-full">
              <b>SUBMIT</b>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
