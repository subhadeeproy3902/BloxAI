import { useState } from "react";
import axios from "axios";

function GeminiChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_API_GENERATIVE_LANGUAGE_CLIENT}`,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      setAnswer(response?.data?.candidates[0]?.content?.parts[0]?.text || "");
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-white h-screen p-3">
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2"
      >
        <h1 className="text-3xl text-center">Gemini Chat</h1>
        <textarea
          required
          className="border rounded w-11/12 my-2 min-h-fit p-3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
          disabled={generatingAnswer}
        >
          Generate answer
        </button>
      </form>
      <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
        <p className="p-3">{answer}</p>
      </div>
    </div>
  );
}

export default GeminiChat;
