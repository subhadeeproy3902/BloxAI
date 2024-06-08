"use client";
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
import { useState, useEffect } from "react";
import { useForm as uForm, ValidationError } from "@formspree/react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { Github } from "lucide-react";
import { Youtube } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  issue: z.string().max(500, {
    message: "Describe your issue within 500 characters.",
  }),
});

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      issue: "",
    },
  });
  const [state, handleSubmit2] = uForm("mqkrveda");

  const handleForm = () => {
    // Display success message and reset the form
    setSuccessMessage(
      "Thank you for submitting the form! We will get back to you soon."
    );
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await handleSubmit2(values);
    } catch (error) {
      setServerError(
        "There was an issue submitting the form. Please try again."
      );
    }
  };

  // Effect hook to reset success message on form submit success
  useEffect(() => {
    if (state.succeeded) {
      handleForm();
    }
  }, [state.succeeded]);

  return (
    <section className="w-full px-2 max-w-screen-md">
      <h2 className="text-4xl md:text-6xl font-bold mb-5 bg-gradient-to-br from-gray-400 via-orange-600 to-orange-700 bg-clip-text text-transparent text-center mt-4">
        Let&apos;s Get in Touch
      </h2>
      <p className="text-muted-foreground mb-6 text-center">
        Fill out the form below and we&apos;ll get back to you as soon as
        possible.
      </p>
      <div className="grid items-start w-full gap-12 mx-auto lg:grid-cols-2 lg:px-12 mb-6 pt-10 pb-6 bg-opacity-8 px-4 rounded-lg gradient1 shadow shadow-orange-900 border border-secondary">
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 my-4 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {serverError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-slate-300"
          >
            <div className="space-y-4 text-lg">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <label className="text-lg text-foreground/75">
                        Full Name
                      </label>
                      <FormControl>
                        <input
                          placeholder="John Doe"
                          className="flex h-10 w-full rounded-md border border-orange-900 bg-background/75 px-3 py-2 text-sm shadow-inner shadow-orange-900 hover:border-orange-600 hover:transition-all focus:border-orange-900 focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-orange-500"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="space-y-4 text-lg">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <label className="text-lg text-foreground/75">
                        Email Address
                      </label>
                      <FormControl>
                        <input
                          placeholder="johndoe@example.com"
                          className="flex h-10 w-full rounded-md border border-orange-900 bg-background/75 px-3 py-2 text-sm shadow-inner shadow-orange-900 hover:border-orange-600 hover:transition-all focus:border-orange-900 focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-orange-500"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="space-y-4 text-lg">
              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <label className="text-lg text-foreground/75">
                        Issue
                      </label>
                      <FormControl>
                        <textarea
                          placeholder="Tell us a little bit about your issue in details here"
                          className="min-h-[110px] mb-5 shadow-inner shadow-orange-900
                flex w-full rounded-md border border-orange-900 bg-background/75 px-3 py-2 text-sm ring-offset-background   placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:border-orange-600 hover:transition-all focus:border-orange-900 focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-br relative group/btn from-orange-800 to-orange-500 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] py-2 hover:from-orange-700 hover:to-orange-800 hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] duration-300 ease-in-out text-center transition-all"
              disabled={state.submitting}
            >
              <b>SUBMIT</b>
              <Send className="inline mx-2 h-4" />
            </Button>
          </form>
        </Form>
        <div>
          <h3 className="text-2xl font-semibold mb-10 text-muted-foreground">
            Connect with Us
          </h3>
          <div className="flex gap-8 mb-12">
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full border border-orange-600 shadow-inner shadow-orange-800 hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <Mail className="w-5 h-5" />
            </Link>
            <div className="text-md text-slate-300">
              <p>Email to us at </p>
              <p>subha9.5@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-8 mb-12">
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full border border-orange-600 shadow-inner shadow-orange-800 hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <Phone className="w-5 h-5" />
            </Link>
            <div className="text-md text-slate-300">
              <p>Call us at </p>
              <p>+91 86373 73116</p>
            </div>
          </div>

          <div className="flex gap-8 mb-12">
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full border border-orange-600 shadow-inner shadow-orange-800 hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU"
            >
              <MessageCircleMore className="w-5 h-5" />
            </Link>
            <div className="text-md text-slate-300">
              <p>Chat with us at </p>
              <p className="underline">
                <a href="https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU">
                  Here
                </a>
              </p>
            </div>
          </div>

          <div className="flex space-x-12 py-7">
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-800 border border-orange-600 hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <Youtube className="w-5 h-5 text-white" />
            </Link>
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-800 border border-orange-600 hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="#"
            >
              <Instagram className="w-5 h-5 text-white" />
            </Link>
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-800 border border-orange-700  hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="https://www.linkedin.com/in/subhadeep3902/"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </Link>
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-800 border border-orange-700 hover:shadow-md hover:shadow-orange-500 hover:transition hover:duration-300 hover:ease-in-out"
              href="https://github.com/subhadeeproy3902/BloxAI"
            >
              <Github className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
