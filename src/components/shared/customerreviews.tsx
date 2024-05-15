"use client";
import * as React from "react"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import TestimonialSlider from "@/components/ui/testimonials-slider";
import TestimonialSliderCard from "@/components/ui/testimonials-slider-card";

const testimonials = [
  {
    quote:
      "Blox AI has completely transformed the way we visualize and share ideas within our organization. The effortless flowchart and diagram creation tools make it simple for even non-technical team members to create professional-looking visuals.",
    name: "Stacy Stone",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=1",
  },
  {
    quote:
      "Blox AI has become an indispensable tool for our team's workflow. Whether we're brainstorming new ideas, mapping out user journeys, or documenting complex algorithms, Blox AI provides us with the versatility and functionality we need.",
    name: "Andrew Jettpace",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=10",
  },
  {
    quote:
      "Blox AI has revolutionized the way I conceptualize and communicate my ideas. As someone who frequently needs to map out processes and systems, I've found their flowchart and diagram creation tools to be incredibly intuitive and user-friendly.",
    name: "Marnus Stephen",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=9",
  },
  {
    quote:
      "As a developer, I've used several visualization tools, but Blox AI stands out with its intuitive interface and powerful features. The rich text editor and versatile visualizations make documenting and sharing concepts a breeze. The AI explanation feature adds an extra layer of understanding to the diagrams created. Plus, being able to install it as an app on mobile makes it convenient for on-the-go brainstorming sessions. A must-have tool for any tech team!",
    name: "Chace Rodgers",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=7",
  },
  {
    quote:
      "Blox AI has exceeded my expectations with its comprehensive set of features and user-friendly interface. Whether I'm creating wireframes, mind maps, or complex algorithms, Blox AI has all the tools I need. The limited files allotment ensures efficient resource usage, while the tech stack including Next.Js and TailwindCSS ensures smooth performance. I appreciate the attention to detail and the seamless collaboration it enables among team members.",
    name: "Cornelius Sheppard",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=8",
  },
  {
    quote:
      "Blox AI has truly impressed me with its versatility and reliability. Whether I'm working on a simple flowchart or a complex diagram, Blox AI provides the tools I need to bring my ideas to life. The integration of the Gemini AI model for explanations adds a layer of intelligence to the diagrams, making them more insightful. The option to install it as an app on mobile devices ensures that I can access my work anytime, anywhere. I highly recommend Blox AI to anyone looking for a robust visualization tool.",
    name: "Chace Rodgers",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=2",
  },
  {
    quote:
      "I've been using Blox AI for a while now, and it has become an integral part of my workflow. The ease of creating flowcharts and diagrams, coupled with the AI explanation feature, has greatly enhanced my productivity. The collaborative sharing option allows me to effortlessly collaborate with my team members, and the secure workspaces ensure the confidentiality of our projects. Overall, Blox AI has simplified the process of visualizing ideas and communicating them effectively.",
    name: "Cornelius Sheppard",
    role: "CEO at Company",
    imgSrc: "https://i.pravatar.cc/120?img=3",
  },
];

const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    feedback: z.string()
  });
  
  export function TextareaForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
  }
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }
  
  export default function Review() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        feedback: ""
      }
    });
    const handleSubmit = () => {}
    return (
      <main>      
        <div className="flex w-full flex-col items-center p-10">
            <p style={{ paddingTop: '20px', fontSize: '2rem' }}>Read what our customers love about us.</p>
          
          <div className="container">
            <TestimonialSlider testimonials={testimonials} />
          </div> 
          <div className="flex w-full flex-col items-center p-10">
            <p style={{ paddingTop: '20px', fontSize: '2.5rem' }}>Loved our product?</p>
            <p style={{ paddingTop: '20px', fontSize: '2rem' }}>Leave a Review</p>
          </div>
          <div className="flex min-h-screen flex-col items-center justify-between" style={{paddingTop: '5px', paddingLeft: '25px', paddingRight: '25px', paddingBottom: '25px'}}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md  w-full flex flex-col gap-4">
                <FormField control={form.control} 
                name="name" 
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Manav Malhotra" type="text" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} 
                />
  
                <FormField control={form.control} 
                name="email" 
                render={({ field }) => {
                  return <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="manav@example.com" type="email" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} 
                />
  
                <FormField control={form.control} 
                name="feedback" 
                render={({ field }) => {
                  return <FormItem>
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
                }} 
                />
                <Button type="submit" className="w-full"><b>SUBMIT</b></Button>
              </form>
            </Form>
          </div>
        </div>  
      </main>
    );
  }
  