import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/i18n";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function ChatBubble() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: t.chat.greeting },
  ]);
  const [input, setInput] = useState("");
  const { send, status, reply, error, reset } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", text: t.chat.greeting }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Scroll to bottom on new messages or loading state
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Append assistant reply or error to message list
  useEffect(() => {
    if (status === "success" && reply) {
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      reset();
    }
    if (status === "error" && error) {
      setMessages((prev) => [...prev, { role: "assistant", text: error }]);
      reset();
    }
  }, [status, reply, error, reset]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const msg = input.trim();
      if (!msg || status === "loading") return;
      setMessages((prev) => [...prev, { role: "user", text: msg }]);
      setInput("");
      await send(msg);
    },
    [input, status, send],
  );

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={t.chat.buttonLabel}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed bottom-44 right-4 md:bottom-24 md:right-6 z-50 w-80 sm:w-96 flex flex-col bg-surface border border-outline-variant/30 shadow-[4px_4px_0px_#E8FF47]"
            style={{ maxHeight: "min(480px, calc(100vh - 200px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/20 shrink-0">
              <div>
                <p className="font-headline text-2xl text-primary leading-none tracking-wide">
                  ASSISTANT_01
                </p>
                <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant mt-1">
                  {t.chat.subtitle}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t.chat.close}
                className="text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 font-body text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-on-primary"
                        : "bg-background border border-outline-variant/30 text-on-surface"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {status === "loading" && (
                <div className="flex justify-start">
                  <div className="bg-background border border-outline-variant/30 px-4 py-3">
                    <span className="font-label text-[10px] text-primary tracking-widest animate-pulse">
                      {t.chat.processing}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 items-end px-5 py-4 border-t border-outline-variant/20 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status === "loading"}
                placeholder={t.chat.placeholder}
                className="flex-1 bg-transparent border-0 border-b border-outline-variant py-2 px-0 text-on-surface font-body text-sm placeholder:text-outline-variant/40 focus:ring-0 focus:border-primary outline-none disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === "loading"}
                aria-label="Send"
                className="bg-primary text-on-primary p-2 hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t.chat.buttonLabel}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 flex items-center justify-center transition-colors duration-200 shadow-[3px_3px_0px_#FF6B35] ${
          isOpen ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot size={22} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
