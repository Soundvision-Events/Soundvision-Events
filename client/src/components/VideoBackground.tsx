/**
 * SoundVision Events — Video Background
 * Plays a self-hosted looping video as a full-screen fixed background.
 * Autoplay, muted, looped — no external dependencies (no YouTube iframe).
 *
 * Current backdrop: openart custom animation (user-uploaded)
 * CDN-hosted loop, ~5MB
 *
 * Scroll behaviour: backdrop is always fully visible (no fade-in).
 * Parallax and smooth scroll effects are handled by useParallax hook.
 */

interface VideoBackgroundProps {
  /** CDN URL of the background video */
  src?: string;
  /** Overlay darkness 0–1 — default 0.30 */
  overlayOpacity?: number;
  /** Poster image shown before video loads */
  poster?: string;
}

const DEFAULT_SRC =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/backdrop-v3-hd_d354f7b7.mp4";

export default function VideoBackground({
  src = DEFAULT_SRC,
  overlayOpacity = 0.30,
}: VideoBackgroundProps) {
  return (
    <div style={{ opacity: 1 }}>
      {/* Video element — fixed behind all content */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay to keep text readable */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
