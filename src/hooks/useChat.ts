import { useState, useCallback } from "react";
import { sendChatMessage, ChatServiceError } from "@/services/chat";

type ChatStatus = "idle" | "loading" | "success" | "error";

export interface ChatState {
  status: ChatStatus;
  reply: string | null;
  error: string | null;
}

export interface UseChatReturn extends ChatState {
  send: (message: string) => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE: ChatState = {
  status: "idle",
  reply: null,
  error: null,
};

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1_000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useChat(): UseChatReturn {
  const [state, setState] = useState<ChatState>(INITIAL_STATE);

  const send = useCallback(async (message: string) => {
    setState({ status: "loading", reply: null, error: null });

    let lastError: ChatServiceError | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Only retry on server errors (5xx), not client errors (4xx) or timeouts
        if (attempt > 0) {
          await sleep(RETRY_DELAY_MS * attempt);
        }

        const { reply } = await sendChatMessage(message);
        setState({ status: "success", reply, error: null });
        return;
      } catch (error) {
        if (error instanceof ChatServiceError) {
          lastError = error;
          // Do not retry on client errors or rate limits
          if (error.status < 500 && error.status !== 0) break;
        } else {
          break;
        }
      }
    }

    setState({
      status: "error",
      reply: null,
      error: lastError?.message ?? "Something went wrong. Please try again.",
    });
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, send, reset };
}
