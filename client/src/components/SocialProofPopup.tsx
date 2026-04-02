/**
 * SocialProofPopup — Rotating "recent booking" notifications
 * Shows a small bottom-left toast once every ~3 minutes to build trust (realistic frequency).
 * Timestamps are generated dynamically at display time based on current clock.
 * All content is in Dutch, referencing Groningen region cities.
 */
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Booking {
  city: string;
  eventType: string;
}

// Only city + eventType — timeAgo is generated dynamically at display time
const BOOKINGS: Booking[] = [
  { city: "Groningen", eventType: "bruiloft" },
  { city: "Assen", eventType: "bedrijfsfeest" },
  { city: "Leeuwarden", eventType: "studentenfeest" },
  { city: "Groningen", eventType: "privéfeest" },
  { city: "Drachten", eventType: "bruiloft" },
  { city: "Emmen", eventType: "bedrijfsfeest" },
  { city: "Zwolle", eventType: "bruiloft" },
  { city: "Hoogeveen", eventType: "privéfeest" },
  { city: "Meppel", eventType: "bruiloft" },
  { city: "Groningen", eventType: "bedrijfsfeest" },
];

const EVENT_ICONS: Record<string, string> = {
  bruiloft: "💍",
  bedrijfsfeest: "🏢",
  studentenfeest: "🎓",
  privéfeest: "🎉",
};

/**
 * Generate a realistic Dutch "time ago" string based on the current time of day.
 * Uses the actual hour so the label always makes sense to the visitor.
 */
function generateTimeAgo(): string {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Between midnight and 07:00 → show "gisteren"
  if (hour < 7) {
    return "gisteren";
  }

  // Pick a random offset between 15 and 180 minutes ago, but never before 07:00
  const minutesSince7 = (hour - 7) * 60 + minute;
  const maxMinutesBack = Math.min(minutesSince7, 180);
  const minMinutesBack = 15;

  if (maxMinutesBack <= minMinutesBack) {
    return "zojuist";
  }

  const minutesAgo = Math.floor(
    minMinutesBack + Math.random() * (maxMinutesBack - minMinutesBack)
  );

  if (minutesAgo < 60) {
    return `${minutesAgo} minuten geleden`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo === 1) return "1 uur geleden";
  return `${hoursAgo} uur geleden`;
}

interface DisplayBooking extends Booking {
  timeAgo: string;
}

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<DisplayBooking | null>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNext = () => {
    const idx = indexRef.current % BOOKINGS.length;
    indexRef.current += 1;
    // Generate a fresh timestamp at the exact moment the popup appears
    setCurrent({ ...BOOKINGS[idx], timeAgo: generateTimeAgo() });
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
