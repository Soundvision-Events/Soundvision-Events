/**
 * SoundVision Events — Social Proof Toast
 * Shows rotating pop-up notifications like "Iemand uit Groningen heeft zojuist een show geboekt!"
 * Appears after 5s, rotates every 12s, dismissible.
 */
import { useEffect, useState } from "react";
import { X, Music2 } from "lucide-react";

const NOTIFICATIONS = [
  { city: "Groningen", event: "bruiloft", time: "2 minuten geleden" },
  { city: "Amsterdam", event: "bedrijfsfeest", time: "8 minuten geleden" },
  { city: "Assen", event: "studentenfeest", time: "15 minuten geleden" },
  { city: "Leeuwarden", event: "privéfeest", time: "23 minuten geleden" },
  { city: "Drachten", event: "bruiloft", time: "34 minuten geleden" },
  { city: "Emmen", event: "bedrijfsfeest", time: "41 minuten geleden" },
  { city: "Zwolle", event: "studentenfeest", time: "1 uur geleden" },
  { city: "Groningen", event: "privéfeest", time: "2 uur geleden" },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show first toast after 5 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;

    // Rotate to next notification every 12 seconds
    const rotateTimer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setAnimating(false);
      }, 400);
    }, 12000);

    return () => clearInterval(rotateTimer);
  }, [visible, dismissed]);

  if (dismissed || !visible) return null;

  const notif = NOTIFICATIONS[index];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
        maxWidth: "320px",
        transform: animating ? "translateY(8px)" : "translateY(0)",
        opacity: animating ? 0 : 1,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        animation: !animating ? "sv-toast-in 0.5s cubic-bezier(0.23, 1, 0.32, 1)" : undefined,
      }}
    >
      <div
        style={{
          background: "rgba(6, 0, 51, 0.92)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(115, 0, 255, 0.4)",
          borderRadius: "12px",
          padding: "14px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(115,0,255,0.15)",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7300ff, #00c8ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Music2 size={16} color="white" />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 600,
              color: "#f0f4f8",
              lineHeight: 1.4,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Iemand uit {notif.city} heeft zojuist een {notif.event} geboekt!
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "11px",
              color: "rgba(0, 200, 255, 0.8)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {notif.time} · SoundVision Events
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            color: "rgba(255,255,255,0.4)",
            flexShrink: 0,
            lineHeight: 1,
          }}
          aria-label="Sluiten"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
