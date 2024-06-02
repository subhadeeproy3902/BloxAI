"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { WandSparkles, Send } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  prompt: z
    .string()
    .min(100, {
      message: "Description should be atleast 100 characters long",
    })
    .max(550),
});

export function GenAIModal() {
  const [docsCheck, setDocsChecked] = useState<boolean>(false);
  const [flowchartCheck, setFlowchartChecked] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <WandSparkles className="w-4 h-4" />
          <p className="hidden sm:inline">Generate AI</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Assistant!</DialogTitle>
          <DialogDescription>Let me help you!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="name"
                      placeholder="Enter your project description..."
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" text-xs font-semibold text-red-500">
                      <span className="font-bold">Note : </span>
                      Give detailed description of your problem statement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={docsCheck}
                onCheckedChange={() => setDocsChecked(!docsCheck)}
                id="docs"
              />
              <label
                htmlFor="docs"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Generate Documentation
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={flowchartCheck}
                onCheckedChange={() => setFlowchartChecked(!flowchartCheck)}
                id="flowchart"
              />
              <label
                htmlFor="flowchart"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Generate Flowchart
              </label>
            </div>
            <DialogFooter>
              <Button className="flex gap-2" type="submit">
                <p>
                    Generate 
                    </p>
                <Send className="w-[14px] h-[14px]" /> </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
