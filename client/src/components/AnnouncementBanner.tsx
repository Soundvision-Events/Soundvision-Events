/**
 * SoundVision Events — Announcement Banner
 * A dismissible banner shown at the top of every page.
 * Content can be changed here or fetched from a tRPC endpoint.
 */
import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

const BANNER_KEY = "sv-banner-dismissed-v1";

const ANNOUNCEMENT = {
  text: "🎉 Nog beschikbaar voor zomer 2026 — Vraag nu uw datum aan en ontvang 10% vroegboekkorting!",
  cta: "Offerte Aanvragen",
  ctaAction: () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  },
};

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if not previously dismissed
    const dismissed = sessionStorage.getItem(BANNER_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(BANNER_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        background: "linear-gradient(90deg, #060033 0%, #35007a 50%, #060033 100%)",
        borderBottom: "1px solid rgba(115, 0, 255, 0.5)",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        boxShadow: "0 2px 16px rgba(115,0,255,0.25)",
        opacity: 0.7,
      }}
    >
      <Sparkles size={14} color="#00c8ff" style={{ flexShrink: 0 }} />

      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#e8eaf6",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          flex: 1,
        }}
      >
        {ANNOUNCEMENT.text}
      </p>

      <button
        onClick={ANNOUNCEMENT.ctaAction}
        style={{
          background: "linear-gradient(135deg, #7300ff, #00c8ff)",
          border: "none",
          borderRadius: "6px",
          padding: "5px 12px",
          fontSize: "12px",
          fontWeight: 700,
          color: "white",
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "0.05em",
          flexShrink: 0,
        }}
      >
        {ANNOUNCEMENT.cta}
      </button>

      <button
        onClick={dismiss}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.5)",
          padding: "2px",
          flexShrink: 0,
          lineHeight: 1,
        }}
        aria-label="Sluiten"
      >
        <X size={14} />
      </button>
    </div>
  );
}
