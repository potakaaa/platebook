import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/gemini/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const stream = await streamText({
      model: google("gemini-2.0-flash-001"), // Ensure the correct model format
      messages: buildGoogleGenAIPrompt(messages),
      temperature: 0.5,
    });
    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
