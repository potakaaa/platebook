import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/gemini/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const runtime = "edge";
export const dynamic = "force-dynamic";

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
    console.log("Incoming messages:", messages);

    const stream = await streamText({
      model: google("gemini-2.0-flash-lite-preview-02-05"), // Ensure the correct model format
      messages: buildGoogleGenAIPrompt(messages),
      temperature: 0.5,
    });

    console.log("Streaming response initialized...");

    return stream.toDataStreamResponse({
      headers: {
        "Transfer-Encoding": "chunked",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred.", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
