/**
 * SoundVision Events — AI Chatbot
 * Floating chat bubble that opens a chat panel.
 * Uses the server-side LLM helper via tRPC for SoundVision-specific answers.
 */
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hoi! 👋 Ik ben de SoundVision assistent. Stel me gerust een vraag over de DJ shows, pakketten of beschikbaarheid!",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setIsTyping(false);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, er ging iets mis. Probeer het opnieuw of neem direct contact op via WhatsApp." },
      ]);
      setIsTyping(false);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    chatMutation.mutate({
      messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "1.5rem",
            width: "340px",
            maxHeight: "480px",
            zIndex: 10000,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(160deg, #0d1117 0%, #0a0f1e 100%)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "0.875rem 1rem",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                }}
              />
              <span style={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}>
                SoundVision Assistent
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.875rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                      : "rgba(255,255,255,0.07)",
                    color: "white",
                    fontSize: "0.8125rem",
                    lineHeight: "1.5",
                    border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "0.5rem 0.875rem",
                    borderRadius: "12px 12px 12px 2px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#7c3aed",
                        animation: "sv-dot-bounce 1.2s infinite",
                        animationDelay: `${i * 0.2}s`,
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Stel een vraag..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                borderRadius: "8px",
                padding: "0.5rem 0.75rem",
                color: "white",
                fontSize: "0.8125rem",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                border: "none",
                borderRadius: "8px",
                padding: "0.5rem 0.75rem",
                cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
                opacity: input.trim() && !isTyping ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating chat bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Chat met SoundVision"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "5.5rem",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: open
            ? "linear-gradient(135deg, #2563eb, #7c3aed)"
            : "linear-gradient(135deg, #7c3aed, #00c8ff)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(124, 58, 237, 0.5)",
          cursor: "pointer",
          zIndex: 9999,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(124, 58, 237, 0.7)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(124, 58, 237, 0.5)";
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Dot bounce keyframes */}
      <style>{`
        @keyframes sv-dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
