/**
 * SoundVision Events — Browser Push Notification Opt-In
 * Shows a subtle opt-in prompt after 30s on the page.
 * Uses the native Notification API — no external service needed.
 * On grant, a welcome notification is shown immediately.
 */
import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

const PUSH_KEY = "sv-push-asked";

export default function PushNotificationOptIn() {
  const [show, setShow] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // Only show if browser supports notifications and user hasn't been asked
    if (!("Notification" in window)) return;
    if (Notification.permission !== "default") return;
    const asked = localStorage.getItem(PUSH_KEY);
    if (asked) return;

    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    localStorage.setItem(PUSH_KEY, "1");
    setShow(false);

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setGranted(true);
      // Show a welcome notification
      new Notification("SoundVision Events 🎵", {
        body: "Bedankt! U ontvangt nu updates over beschikbaarheid en aanbiedingen.",
        icon: "/favicon.ico",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem(PUSH_KEY, "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9998,
        maxWidth: "340px",
        animation: "sv-toast-in 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div
        style={{
          background: "rgba(6, 0, 51, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 200, 255, 0.35)",
          borderRadius: "14px",
          padding: "18px 20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 24px rgba(0,200,255,0.12)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00c8ff, #0090ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bell size={16} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 700,
                color: "#f0f4f8",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Blijf op de hoogte
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "rgba(0,200,255,0.8)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              SoundVision Events
            </p>
          </div>
          <button
            onClick={handleDecline}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              padding: "2px",
              lineHeight: 1,
            }}
          >
            <X size={14} />
          </button>
        </div>

        <p
          style={{
            margin: "0 0 14px",
            fontSize: "13px",
            color: "rgba(240,244,248,0.85)",
            lineHeight: 1.5,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Ontvang meldingen over beschikbaarheid, aanbiedingen en nieuwe show-pakketten.
        </p>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleAccept}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #00c8ff, #0090ff)",
              border: "none",
              borderRadius: "8px",
              padding: "9px 0",
              fontSize: "13px",
              fontWeight: 700,
              color: "white",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Ja, ik wil updates
          </button>
          <button
            onClick={handleDecline}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              padding: "9px 0",
              fontSize: "13px",
              color: "rgba(240,244,248,0.7)",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Nee, bedankt
          </button>
        </div>
      </div>
    </div>
  );
}
