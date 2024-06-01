"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useForm as uForm, ValidationError } from '@formspree/react';

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
      issue: ""
    }
  });
  const [state, handleSubmit2] = uForm("mqkrveda");

  const handleForm = () => {
    // Display success message and reset the form
    setSuccessMessage("Thank you for submitting the form! We will get back to you soon.");
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await handleSubmit2(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      setServerError("There was an issue submitting the form. Please try again.");
    }
  };

  // Effect hook to reset success message on form submit success
  useEffect(() => {
    if (state.succeeded) {
      handleForm();
    }
  }, [state.succeeded]);

  return (
    <main>
      <div className="flex w-full flex-col items-center p-10">
        <p style={{ paddingTop: "20px", fontSize: "2rem" }}>
          Facing an issue? Fill up the form below 👇
        </p>
        <div
          className="flex w-full flex-col items-center justify-between"
          style={{
            paddingTop: "20px",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingBottom: "25px",
          }}
        >
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 my-4 rounded relative" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative" role="alert">
              <span className="block sm:inline">{serverError}</span>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-md w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" type="text" {...field} />
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
                          placeholder="johndoe@example.com"
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
                name="issue"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Issue</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about your issue in details here"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button type="submit" className="w-full" disabled={state.submitting}>
                <b>SUBMIT</b>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}