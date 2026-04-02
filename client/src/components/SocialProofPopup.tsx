/**
 * SocialProofPopup — Rotating "recent booking" notifications
 * Shows a small bottom-left toast once every ~3 minutes to build trust (realistic frequency).
 * All content is in Dutch, referencing Groningen region cities.
 */
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Booking {
  city: string;
  eventType: string;
  timeAgo: string;
}

const BOOKINGS: Booking[] = [
  { city: "Groningen", eventType: "bruiloft", timeAgo: "2 uur geleden" },
  { city: "Assen", eventType: "bedrijfsfeest", timeAgo: "gisteren" },
  { city: "Leeuwarden", eventType: "studentenfeest", timeAgo: "3 uur geleden" },
  { city: "Groningen", eventType: "privéfeest", timeAgo: "vandaag" },
  { city: "Drachten", eventType: "bruiloft", timeAgo: "gisteren" },
  { city: "Emmen", eventType: "bedrijfsfeest", timeAgo: "2 dagen geleden" },
  { city: "Groningen", eventType: "studentenfeest", timeAgo: "1 uur geleden" },
  { city: "Hoogeveen", eventType: "privéfeest", timeAgo: "vandaag" },
  { city: "Meppel", eventType: "bruiloft", timeAgo: "3 uur geleden" },
  { city: "Groningen", eventType: "bedrijfsfeest", timeAgo: "gisteren" },
];

const EVENT_ICONS: Record<string, string> = {
  bruiloft: "💍",
  bedrijfsfeest: "🏢",
  studentenfeest: "🎓",
  privéfeest: "🎉",
};

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<Booking | null>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNext = () => {
    // Pick next booking in rotation (shuffle-like)
    const idx = indexRef.current % BOOKINGS.length;
    indexRef.current += 1;
    setCurrent(BOOKINGS[idx]);
    setVisible(true);

    // Hide after 6 seconds
    timerRef.current = setTimeout(() => {
      setVisible(false);
      // Schedule next popup: once every ~3 minutes (170–190 seconds)
      const delay = 170_000 + Math.random() * 20_000;
      timerRef.current = setTimeout(showNext, delay);
    }, 6_000);
  };

  useEffect(() => {
    // First popup after 30 seconds
    timerRef.current = setTimeout(showNext, 30_000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          key={`${current.city}-${current.eventType}-${indexRef.current}`}
          initial={{ opacity: 0, x: -60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -60, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-6 left-4 z-50 max-w-xs"
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(6, 0, 51, 0.92)",
              border: "1px solid rgba(0, 200, 255, 0.45)",
              borderRadius: "0.875rem",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 18px rgba(0,200,255,0.18), 0 4px 24px rgba(0,0,0,0.55)",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.65rem",
            }}
          >
            {/* Icon */}
            <span style={{ fontSize: "1.5rem", lineHeight: 1, marginTop: "0.1rem" }}>
              {EVENT_ICONS[current.eventType] ?? "🎵"}
            </span>

            {/* Text */}
            <div>
              <p
                style={{
                  color: "#e0e0ff",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  margin: 0,
                }}
              >
                Iemand uit{" "}
                <span style={{ color: "#00c8ff" }}>{current.city}</span> heeft
                zojuist een{" "}
                <span style={{ color: "#b47cff" }}>{current.eventType}</span>{" "}
                geboekt!
              </p>
              <p
                style={{
                  color: "rgba(200,200,255,0.55)",
                  fontSize: "0.72rem",
                  margin: "0.2rem 0 0",
                }}
              >
                {current.timeAgo} · SoundVision Events
              </p>
            </div>

            {/* Neon dot */}
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00c8ff",
                boxShadow: "0 0 6px #00c8ff",
                flexShrink: 0,
                marginTop: "0.35rem",
                animation: "sv-pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
