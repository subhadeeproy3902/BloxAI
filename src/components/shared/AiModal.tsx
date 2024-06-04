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
import { getDocumentation, getFlowchart } from "@/config/gemini";
import PromptLoader from "./PromptLoader";
import { FILE } from "@/app/dashboard/_components/FileList";

const formSchema = z.object({
  prompt: z
    .string()
    // .min(100, {
    //   message: "Description should be atleast 100 characters long",
    // })
    .max(550),
});

type Props = {
  setFileData: React.Dispatch<React.SetStateAction<any>>;
};

export function GenAIModal({ setFileData }: Props) {
  const [docsCheck, setDocsChecked] = useState<boolean>(false);
  const [flowchartCheck, setFlowchartChecked] = useState<boolean>(false);
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [APIerror,setError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      setLoading(true);
      if (!docsCheck && !flowchartCheck) setValidation("Select atleast one!");
      else {
        let getData1 = true;
        let getData2 = true;


        if(docsCheck) {
          const res1 = await getDocumentation(values.prompt);

          

          const editorData = {
            time: new Date().getTime(),
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: res1.replaceAll("\n","<br/>"),
                },
              },
            ],
          };

          setFileData((prevFileData: any) => ({
            ...prevFileData,
            document: JSON.stringify(editorData),
          }));

          if(res1){
          getData1 = false;
          }
        }else{
          getData1 = false;
        }

        if(flowchartCheck){
          const res2:string = await getFlowchart(values.prompt);
          const docs = res2.replaceAll("`","").replaceAll("json","").replaceAll("JSON","")
          const parsedString  = JSON.parse(docs);
          console.log(parsedString)
          if(res2){
            getData2 = false;
          }
        }else{
          getData2 = false;
        }

        if (!getData1 && !getData2) {
          setLoading(false);
          setIsDialogOpen(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true)
      setIsDialogOpen(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2" onClick={() => setIsDialogOpen(true)}>
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
            <div className="flex flex-col gap-4">
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

              <p className="text-xs font-semibold text-red-500">{validation}</p>
            </div>

            <DialogFooter>
              <Button className="flex gap-2" type="submit">
                <p>Generate</p>
                <Send className="w-[14px] h-[14px]" />{" "}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        {loading && (
          <div className="backdrop-blur-sm absolute flex item-center justify-center w-full h-full top-0 left-0">
            <PromptLoader />
          </div>
        )}
        {APIerror && (
          <div className="backdrop-blur-sm absolute flex item-center justify-center w-full h-full top-0 left-0">
            <h1>Error Occured! Please Try again</h1>
            <Button onClick={()=>setIsDialogOpen(false)}>
              Try Again!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
