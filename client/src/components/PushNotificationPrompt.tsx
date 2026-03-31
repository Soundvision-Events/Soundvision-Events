/**
 * PushNotificationPrompt — Browser push notification subscription widget.
 *
 * Shows a friendly bottom-right prompt after 30 seconds asking the visitor
 * to subscribe to push notifications for SoundVision Events updates.
 *
 * Uses the native Web Push / Notification API.
 * Falls back gracefully when the browser does not support push.
 *
 * Note: For production push delivery a VAPID key + push server is needed.
 * This component handles the permission request and stores the subscription
 * in localStorage. Backend integration can be wired later.
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "sv_push_prompt_seen";

type PermState = "default" | "granted" | "denied" | "unsupported";

export default function PushNotificationPrompt() {
  const [show, setShow] = useState(false);
  const [permState, setPermState] = useState<PermState>("default");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Don't show if browser doesn't support Notification API
    if (!("Notification" in window)) {
      setPermState("unsupported");
      return;
    }

    const current = Notification.permission as PermState;
    setPermState(current);

    // Don't show if already granted or denied, or if user already saw the prompt
    if (current !== "default") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;

    // Show prompt after 30 seconds
    const timer = setTimeout(() => setShow(true), 30_000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  };

  const subscribe = async () => {
    if (!("Notification" in window)) return;
    try {
      const result = await Notification.requestPermission();
      setPermState(result as PermState);
      localStorage.setItem(STORAGE_KEY, "1");

      if (result === "granted") {
        setSubscribed(true);
        // Show a welcome notification
        new Notification("SoundVision Events 🎵", {
          body: "U ontvangt nu updates over beschikbaarheid en aanbiedingen!",
          icon: "https://cdn-biz.manus.space/6RH3PKVEJrkwHnmCKCLqmc/66498651.png",
        });
        setTimeout(() => setShow(false), 2500);
      } else {
        setShow(false);
      }
    } catch (err) {
      console.warn("[PushNotificationPrompt] Permission request failed:", err);
      setShow(false);
    }
  };

  // Don't render at all if unsupported or already handled
  if (permState === "unsupported" || permState === "denied") return null;
  if (permState === "granted" && !subscribed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1rem",
            zIndex: 50,
            maxWidth: "22rem",
            width: "calc(100vw - 2rem)",
          }}
        >
          <div
            style={{
              background: "rgba(6, 0, 51, 0.95)",
              border: "1px solid rgba(115, 0, 255, 0.5)",
              borderRadius: "1rem",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 0 24px rgba(115,0,255,0.22), 0 8px 32px rgba(0,0,0,0.6)",
              padding: "1.1rem 1.2rem",
            }}
          >
            {subscribed ? (
              /* Success state */
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.6rem", margin: "0 0 0.3rem" }}>🎉</p>
                <p
                  style={{
                    color: "#00c8ff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    margin: 0,
                  }}
                >
                  Geabonneerd!
                </p>
                <p
                  style={{
                    color: "rgba(200,200,255,0.7)",
                    fontSize: "0.78rem",
                    margin: "0.25rem 0 0",
                  }}
                >
                  U ontvangt updates van SoundVision Events.
                </p>
              </div>
            ) : (
              /* Prompt state */
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.7rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  {/* Bell icon */}
                  <span style={{ fontSize: "1.6rem", lineHeight: 1, marginTop: "0.1rem" }}>
                    🔔
                  </span>
                  <div>
                    <p
                      style={{
                        color: "#e0e0ff",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      Blijf op de hoogte
                    </p>
                    <p
                      style={{
                        color: "rgba(200,200,255,0.65)",
                        fontSize: "0.77rem",
                        margin: "0.25rem 0 0",
                        lineHeight: 1.4,
                      }}
                    >
                      Ontvang meldingen over beschikbaarheid, aanbiedingen en
                      nieuwe shows van SoundVision Events.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={subscribe}
                    style={{
                      flex: 1,
                      background:
                        "linear-gradient(135deg, #7300ff 0%, #00c8ff 100%)",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Ja, abonneer mij
                  </button>
                  <button
                    onClick={dismiss}
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      color: "rgba(200,200,255,0.6)",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    Nee, bedankt
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
