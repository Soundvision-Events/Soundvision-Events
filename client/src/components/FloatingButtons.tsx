/**
 * SoundVision Events — Floating Action Buttons
 *
 * Bottom-LEFT: WhatsApp button with expandable chat panel for instant messaging
 * Bottom-RIGHT: Back-to-top button (appears after 300px scroll)
 *
 * Both are rendered via PageLayout so they appear on every page.
 */
import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "31622764233";

export default function FloatingButtons() {
  const [scrolled, setScrolled] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus input when panel opens
  useEffect(() => {
    if (waOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [waOpen]);

  const sendWhatsApp = () => {
    const text = message.trim() || "Hallo! Ik heb interesse in een DJ show van SoundVision Events.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setWaOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendWhatsApp();
    if (e.key === "Escape") setWaOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── BOTTOM-LEFT: WhatsApp expandable chat ── */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0",
        }}
      >
        {/* Expandable chat panel */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: waOpen ? "220px" : "0",
            opacity: waOpen ? 1 : 0,
            transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            marginBottom: waOpen ? "0.625rem" : "0",
            width: "300px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(160deg, #0d1a0f 0%, #0a1a0d 100%)",
              border: "1px solid rgba(37, 211, 102, 0.35)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(37, 211, 102, 0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#25D366",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              {/* WhatsApp icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.2 }}>
                  SoundVision Events
                </div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.7rem" }}>
                  Antwoordt meestal snel
                </div>
              </div>
              <button
                onClick={() => setWaOpen(false)}
                style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: "2px" }}
              >
                ×
              </button>
            </div>

            {/* Greeting bubble */}
            <div style={{ padding: "0.75rem 1rem 0.5rem" }}>
              <div
                style={{
                  background: "rgba(37, 211, 102, 0.12)",
                  border: "1px solid rgba(37, 211, 102, 0.2)",
                  borderRadius: "0 12px 12px 12px",
                  padding: "0.5rem 0.75rem",
                  color: "#e0ffe8",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  display: "inline-block",
                  maxWidth: "85%",
                }}
              >
                👋 Hoi! Stuur ons een bericht en we reageren zo snel mogelijk.
              </div>
            </div>

            {/* Input row */}
            <div
              style={{
                padding: "0.5rem 0.75rem 0.75rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Typ een bericht..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  borderRadius: "20px",
                  padding: "0.45rem 0.875rem",
                  color: "white",
                  fontSize: "0.8125rem",
                  outline: "none",
                }}
              />
              <button
                onClick={sendWhatsApp}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#25D366",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp trigger button */}
        <button
          onClick={() => setWaOpen((v) => !v)}
          title="Chat via WhatsApp"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            backgroundColor: "#25D366",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: waOpen
              ? "0 6px 24px rgba(37, 211, 102, 0.65)"
              : "0 4px 16px rgba(37, 211, 102, 0.45)",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          {waOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── BOTTOM-RIGHT: Back to top + AI Chat (always visible after scroll) ── */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          alignItems: "center",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(1rem)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
      >
        {/* Back to top */}
        <button
          onClick={scrollToTop}
          title="Terug naar boven"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #00c8ff)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(124, 58, 237, 0.45)",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            color: "white",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(124, 58, 237, 0.65)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(124, 58, 237, 0.45)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </>
  );
}
