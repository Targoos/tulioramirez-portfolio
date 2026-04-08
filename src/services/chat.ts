/**
 * Client-side service for calling the /api/chat proxy.
 * The API key never touches this file — it lives in the Vercel serverless function.
 */

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatError {
  error: string;
}

const CHAT_ENDPOINT = "/api/chat";
const REQUEST_TIMEOUT_MS = 30_000;

export class ChatServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ChatServiceError";
  }
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message } satisfies ChatRequest),
      signal: controller.signal,
    });

    const data = (await res.json()) as ChatResponse | ChatError;

    if (!res.ok) {
      const errorMsg = "error" in data ? data.error : "Unexpected error";
      throw new ChatServiceError(errorMsg, res.status);
    }

    return data as ChatResponse;
  } catch (error) {
    if (error instanceof ChatServiceError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ChatServiceError("Request timed out. Please try again.", 408);
    }

    throw new ChatServiceError("Network error. Please check your connection.", 0);
  } finally {
    clearTimeout(timeoutId);
  }
}
