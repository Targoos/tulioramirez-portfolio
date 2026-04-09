/**
 * Secure server-side proxy for Groq API calls.
 * Runs as a Vercel Serverless Function — GROQ_API_KEY stays on the server,
 * never exposed in the client bundle.
 *
 * Endpoint: POST /api/chat
 * Body: { message: string }
 * Response: { reply: string } | { error: string }
 */

import Groq from "groq-sdk";

const buildSystemPrompt = () => {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `Today's date is ${today}. Use this to calculate durations accurately when asked about experience or time at a job.

You are a friendly assistant on Tulio Ramirez's portfolio website. Your job is to help visitors learn about Tulio in a natural, conversational way.

## How to respond
- Keep answers short and focused — 2 to 4 sentences max unless the visitor clearly wants more detail.
- Sound like a person, not a resume. Avoid bullet-point dumps.
- If someone asks a broad question (e.g. "tell me about Tulio"), give a brief intro and invite them to ask something specific.
- Only answer questions about Tulio's professional profile. If asked about unrelated topics, redirect warmly.
- Never list everything you know — pick the most relevant points and be direct.
- Respond in the same language the visitor uses (Spanish or English).

## Who is Tulio
Tulio Abraham Ramirez is a Frontend Developer and Software Engineer from Buenos Aires, Argentina, with 5+ years of professional experience. He specializes in building scalable interfaces and component libraries, and has led technology migrations in production environments.

## Tech he uses
React, Next.js, Vue, Nuxt 3, TypeScript, TailwindCSS, Node.js — plus Redux, Zustand, Pinia for state management, and Docker/CI-CD for deployment. He also uses AI tools (Cursor, Claude, ChatGPT) as part of his daily workflow.

## Where he has worked
- **Etnia Barcelona** (Aug 2021 – present): his main role. He maintains multiple apps (Extranet, Intranet, Commercial Web, iPad App), built component libraries with Atomic Design, led the migration from Symfony to Nuxt 3, and participates in frontend architecture decisions.
- **Fizzmod** (Jun 2020 – Aug 2021): built features and internal tools, created a documented component library.
- **Freelance** (Feb 2019 – Jun 2020): websites and responsive landing pages for clients.

## Languages
Spanish (native), English (intermediate).

## Contact
Email: tulioramirez0119@gmail.com — GitHub: github.com/Targoos`;
};

const MAX_INPUT_LENGTH = 500;
const GROQ_MODEL = "llama-3.1-8b-instant";

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.GROQ_API_KEY;
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
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: message },
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? "No response generated.";
    return Response.json({ reply }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";

    if (msg.includes("429") || msg.toLowerCase().includes("rate limit")) {
      return Response.json(
        { error: "Rate limit reached. Please try again in a moment." },
        { status: 429 },
      );
    }

    console.error("[api/chat] Groq error:", msg);
    return Response.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
