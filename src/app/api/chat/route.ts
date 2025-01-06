import { NextRequest } from "next/server";
import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: "output in HTML. Not full but content only",
});

const generationConfig: GenerationConfig = {
  temperature: 0.5,
  topP: 0.7,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("message");

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessageStream(
    prompt || "How to say bye in Japanese ?",
  );
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        let chunkText = chunk.text();

        if (chunkText.startsWith("html")) chunkText = chunkText.slice(4);
        if (chunkText.includes("```")) chunkText = chunkText.replace("```", "");
        controller.enqueue(new TextEncoder().encode(chunkText));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain", // Change if you're sending HTML or another content type
      "Transfer-Encoding": "chunked",
    },
  });
}
