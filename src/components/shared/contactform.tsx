"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  issue: z.string().max(500, {
    message: "Describe your issue within 500 characters.",
  }),
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

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      issue: ""
    }
  });

  const handleSubmit = () => {}

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-md  w-full flex flex-col gap-4"
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