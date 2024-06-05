import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY1 = process.env.NEXT_PUBLIC_GEMINI_API_KEY_DOC as string;
const API_KEY2 = process.env.NEXT_PUBLIC_GEMINI_API_KEY_FLOWCHART as string;

const chatFlowchartHistory = [
  {
    role: "user",
    parts: [
      {
        text: `You are an expert in generating flowcharts. Flowchart should be in mermaid code format. Your task is to create a JSON object of flowchart with object such as format and code. The JSON object should be able to parse. Only provide the mermaid code.`,
      },
    ],
  },
  {
    role: "model",
    parts: [{ text: "How can I help you ?" }],
  },
]

const chatDocsHistory = [
  {
    role: "user",
    parts: [
      {
        text: `You are an expert in generating documentation. Your task is to create a markdown documentation of given problem statement. Do not generate tables and diagrams.`,
      },
    ],
  },
  {
    role: "model",
    parts: [{ text: "How can I help you ?" }],
  },
]


export async function getDocumentation(
  prompt: string
) {
  if (!API_KEY1)
    throw new Error("Invalid Api Key!");

  const genAI = new GoogleGenerativeAI(API_KEY1);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  model.generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
  };

  const chat = model.startChat({
    history: chatDocsHistory,
  });

  const result = await chat.sendMessage(`Problem Statement : ${prompt}.`);
  const response = result.response;
  return response.text();
}

export async function getFlowchart(
  prompt: string
) {
  if (!API_KEY2)
    throw new Error("Invalid Api Key!");

  const genAI = new GoogleGenerativeAI(API_KEY2);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  model.generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
  };

  const chat = model.startChat({
    history: chatFlowchartHistory,
  });

  const result = await chat.sendMessage(`Problem Statement : ${prompt}. Note: Generate in parse able JSON format.`);
  const response = result.response;
  return response.text();
}