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
import { useEffect, useState } from "react";
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
import { remark } from "remark";
import remarkParse from "remark-parse";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

function convertMarkdownToEditorBlocks(markdownAST: any) {
  const blocks: any = [];

  function visit(node: any) {
    switch (node.type) {
      case "heading":
        blocks.push({
          type: "header",
          data: {
            text: node.children
              .map((child: { value: any }) => child.value)
              .join(""),
            level: node.depth,
          },
        });
        break;
      case "paragraph":
        blocks.push({
          type: "paragraph",
          data: {
            text: node.children
              .map((child: { value: any }) => child.value)
              .join(""),
          },
        });
        break;
      case "list":
        blocks.push({
          type: "list",
          data: {
            style: node.ordered ? "ordered" : "unordered",
            items: node.children.map((listItem: { children: any[] }) =>
              listItem.children
                .map((item) =>
                  item.children
                    .map((child: { value: any }) => child.value)
                    .join("")
                )
                .join("")
            ),
          },
        });
        break;
      // Add more cases to handle other Markdown elements like blockquote, code, etc.
      default:
        break;
    }
    if (node.children) {
      node.children.forEach(visit);
    }
  }

  visit(markdownAST);
  return blocks;
}

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
  const [APIerror, setError] = useState(false);
  const [mermaidCode, setMermaidCode] = useState("");
  const [copyModal, setCopyModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  useEffect(() => {
    if (!isDialogOpen) {
      setDocsChecked(false);
      setFlowchartChecked(false);
      setCopyModal(false);
    }
  }, [isDialogOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!docsCheck && !flowchartCheck) {
      setValidation("Select atleast one!");
      return;
    }
    try {
      if (docsCheck) {
        getDocumentationFormHandler(values);
      } else if (flowchartCheck) {
        getFlowchartFormHandler(values);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      setIsDialogOpen(false);
    }
  }

  const getDocumentationFormHandler = async (
    values: z.infer<typeof formSchema>
  ) => {
    setLoading(true);
    try {
      const res1 = await getDocumentation(values.prompt);
      // Parse Markdown to AST using remark
      const parsedMarkdown = remark().use(remarkParse).parse(res1);
      // Convert AST to Editor.js blocks
      const editorBlocks = convertMarkdownToEditorBlocks(parsedMarkdown);

      const editorData = {
        time: new Date().getTime(),
        blocks: editorBlocks,
      };

      setFileData((prevFileData: any) => ({
        ...prevFileData,
        document: JSON.stringify(editorData),
      }));

      toast.success("Documentation Generated!!")

      setLoading(false);
      setIsDialogOpen(false);
    } catch (err) {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const getFlowchartFormHandler = async (
    values: z.infer<typeof formSchema>
  ) => {
    setLoading(true);
    try {
      const res2: string = await getFlowchart(values.prompt);
      const docs = res2
        .replaceAll("`", "")
        .replaceAll("json", "")
        .replaceAll("JSON", "");
      const parsedString = JSON.parse(docs);
      setMermaidCode(parsedString.code);
      toast.success("Flowchart Generated!!")
      setLoading(false);
      setCopyModal(true);
    } catch (err) {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const CopyHandler = () => {
    navigator.clipboard.writeText(mermaidCode);
    toast.success("Code copied!!");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2" onClick={() => setIsDialogOpen(true)}>
          <WandSparkles className="w-4 h-4" />
          <p className="hidden sm:inline">Generate AI</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Assistant!</DialogTitle>
          <DialogDescription>Let me help you!</DialogDescription>
        </DialogHeader>
        {!copyModal && (
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
                    disabled={flowchartCheck}
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
                    disabled={docsCheck}
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

                <p className="text-xs font-semibold text-red-500">
                  {validation}
                </p>
              </div>

              <DialogFooter>
                <Button className="flex gap-2" type="submit">
                  <p>Generate</p>
                  <Send className="w-[14px] h-[14px]" />{" "}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        {loading && (
          <div className="backdrop-blur-sm absolute flex item-center justify-center w-full h-full top-0 left-0">
            <PromptLoader />
          </div>
        )}
        {APIerror && (
          <div className="backdrop-blur-sm absolute flex item-center justify-center w-full h-full top-0 left-0">
            <h1>Error Occured! Please Try again</h1>
            <Button onClick={() => setIsDialogOpen(false)}>Try Again!</Button>
          </div>
        )}
        {copyModal && (
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <p>Mermaid code</p>
              <TooltipProvider delayDuration={400}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={() => CopyHandler()}>Copy!</Button>
                  </TooltipTrigger>
                  <TooltipContent className="flex flex-col">
                    <p>1. Go to more tools in canvas.</p>
                    <p>2. Select <span className=" font-bold">Mermaid to Excalidraw</span>.</p>
                    <p>3. Paste the code.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea className="dark:bg-[#333333] dark:text-gray-400 bg-secondary text-[#333333] w-full p-4 rounded-xl resize-none h-[200px]">
              {mermaidCode}
            </Textarea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
