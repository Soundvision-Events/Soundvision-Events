/**
 * SoundVision Events — YouTube Video Background
 * Embeds a YouTube video as a full-screen fixed background behind all content.
 * Autoplay, muted, looped, no controls, no branding overlay.
 *
 * The iframe is scaled up and centered (the "cover" technique) so it always
 * fills the viewport regardless of aspect ratio, with a dark overlay on top
 * to keep text readable.
 */

interface YouTubeBackgroundProps {
  /** YouTube video ID */
  videoId?: string;
  /** Start time in seconds — default 5 */
  startAt?: number;
  /** Overlay darkness 0–1 — default 0.55 */
  overlayOpacity?: number;
}

export default function YouTubeBackground({
  videoId = "iGpuQ0ioPrM",
  startAt = 5,
  overlayOpacity = 0.55,
}: YouTubeBackgroundProps) {
  const src =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&controls=0&showinfo=0&rel=0&modestbranding=1` +
    `&iv_load_policy=3&disablekb=1&fs=0&start=${startAt}` +
    `&enablejsapi=0&playsinline=1`;

  return (
    <>
      {/* YouTube iframe — scaled to cover the full viewport */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={src}
          title="Background video"
          allow="autoplay; encrypted-media"
          style={{
            /* Cover technique: scale the 16:9 iframe to always fill the viewport */
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "calc(100vw + 200px)",
            height: "calc(100vh + 200px)",
            minWidth: "calc((100vh + 200px) * 16 / 9)",
            minHeight: "calc((100vw + 200px) * 9 / 16)",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
          frameBorder="0"
        />
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
    </>
  );
}
