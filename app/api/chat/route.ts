import { NextRequest } from "next/server";
import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 256,
  responseMimeType: "text/plain",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("message");

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    prompt || "How to say bye in Japanese ?",
  );

  return Response.json({ content: result.response.text() });
}
