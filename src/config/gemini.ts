import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

async function runChat(
  prompt: string,
  generateDocs: boolean,
  generateFlowchart: boolean
) {
  if (!API_KEY || API_KEY === "your-gemini-api-key")
    throw new Error("Invalid Api Key!");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  model.generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
  };

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `You are expert in generating documentation and flowcharts. While generating documentation add detailed working of given prompt and generate the flowcharts in mermaid code format. Generate the flowchart in the mermaid code format.`,
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "How can I help you ?" }],
      },
    ],
  });

  let newPrompt;

  if (generateDocs && generateFlowchart) {
    newPrompt = `Generate documentation as well as flowchart for following problem statement. Problem Statement : ${prompt}`;
  } else if (generateDocs) {
    newPrompt = `Generate documentation for following problem statement. Problem Statement : ${prompt}`;
  } else if (generateFlowchart) {
    newPrompt = `Generate flowchart for following problem statement. Problem Statement : ${prompt}`;
  }

  if(!generateDocs && !generateFlowchart) throw new Error("No options selected!");

  const result = await chat.sendMessage(newPrompt!);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;
