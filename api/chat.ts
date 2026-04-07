/**
 * Secure server-side proxy for Gemini API calls.
 * Runs as a Vercel Edge Function — GEMINI_API_KEY stays on the server,
 * never exposed in the client bundle.
 *
 * Endpoint: POST /api/chat
 * Body: { message: string }
 * Response: { reply: string } | { error: string }
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `You are Tulio Ramirez's portfolio assistant. Your role is to answer
questions about Tulio's professional experience, skills, and projects in a concise,
professional, and friendly way. Only answer questions related to his work and portfolio.
If asked about unrelated topics, politely redirect to his professional profile.`;

const MAX_INPUT_LENGTH = 500;
const GEMINI_MODEL = "gemini-2.0-flash";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("message" in body) ||
    typeof (body as Record<string, unknown>).message !== "string"
  ) {
    return Response.json({ error: "message field is required" }, { status: 400 });
  }

  const message = ((body as Record<string, unknown>).message as string).trim();

  if (!message) {
    return Response.json({ error: "message cannot be empty" }, { status: 400 });
  }

  if (message.length > MAX_INPUT_LENGTH) {
    return Response.json(
      { error: `message exceeds ${MAX_INPUT_LENGTH} character limit` },
      { status: 400 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return Response.json({ reply }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("429") || message.toLowerCase().includes("quota")) {
      return Response.json(
        { error: "Rate limit reached. Please try again in a moment." },
        { status: 429 },
      );
    }

    if (message.includes("400")) {
      return Response.json({ error: "Invalid request to AI service." }, { status: 400 });
    }

    console.error("[api/chat] Gemini error:", message);
    return Response.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
