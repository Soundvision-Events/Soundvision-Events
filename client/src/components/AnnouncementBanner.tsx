/**
 * SoundVision Events — Announcement Banner
 * Slide-in floating notification from bottom-right corner.
 * Appears after 2s, does not block the navbar.
 * Dismissed state stored in sessionStorage.
 */
import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

const BANNER_KEY = "sv-banner-dismissed-v2";

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
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_KEY);
    if (!dismissed) {
      // Show after 2 seconds
      const timer = setTimeout(() => {
        setVisible(true);
        // Trigger slide-in animation on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimIn(true));
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setAnimIn(false);
    sessionStorage.setItem(BANNER_KEY, "1");
    // Wait for slide-out animation before unmounting
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes sv-banner-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 9999,
          width: "min(340px, calc(100vw - 40px))",
          background: "linear-gradient(135deg, #0a0030 0%, #1a0060 40%, #0d1a6e 100%)",
          border: "1.5px solid rgba(0, 212, 255, 0.6)",
          borderRadius: "14px",
          padding: "16px 14px 14px 16px",
          boxShadow: "0 0 20px rgba(0,212,255,0.25), 0 0 60px rgba(96,64,224,0.2), 0 8px 32px rgba(0,0,0,0.5)",
          transform: animIn ? "translateX(0)" : "translateX(calc(100% + 30px))",
          opacity: animIn ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease",
        }}
      >
        {/* Top row: icon + close */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
          <Sparkles size={16} color="#00d4ff" style={{ flexShrink: 0, marginTop: "2px" }} />
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "rgba(232, 240, 255, 0.92)",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            {ANNOUNCEMENT.text}
          </p>
          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.45)",
              padding: "0",
              flexShrink: 0,
              lineHeight: 1,
              marginTop: "1px",
            }}
            aria-label="Sluiten"
          >
            <X size={14} />
          </button>
        </div>

        {/* CTA button */}
        <button
          onClick={() => { ANNOUNCEMENT.ctaAction(); dismiss(); }}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #00d4ff 0%, #5b6ef5 50%, #6040e0 100%)",
            backgroundSize: "200% auto",
            animation: "sv-banner-shimmer 3s linear infinite",
            border: "none",
            borderRadius: "8px",
            padding: "9px 16px",
            fontSize: "13px",
            fontWeight: 700,
            color: "white",
            cursor: "pointer",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: "0 0 12px rgba(0,212,255,0.35)",
          }}
        >
          {ANNOUNCEMENT.cta}
        </button>
      </div>
    </>
  );
}
