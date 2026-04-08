/**
 * Contact form handler.
 * Validates form fields and sends an email via Resend.
 *
 * Endpoint: POST /api/contact
 * Body: { name: string; email: string; subject: string; message: string }
 * Response: { ok: true } | { error: string }
 */

import { Resend } from "resend";

export const config = { runtime: "nodejs" };

const FROM = "contact@tulioramirez.com";
const TO = "tulioramirez0119@gmail.com";
const MAX_LENGTH = 2000;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    return Response.json({ error: "valid email is required" }, { status: 400 });
  }
  if (typeof subject !== "string" || !subject.trim()) {
    return Response.json({ error: "subject is required" }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }
  if (message.length > MAX_LENGTH) {
    return Response.json({ error: `message exceeds ${MAX_LENGTH} character limit` }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email.trim(),
      subject: `[Portfolio] ${subject.trim()} — ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/contact] Resend error:", msg);
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }
}
