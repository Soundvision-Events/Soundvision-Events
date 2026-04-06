/**
 * SoundVision Events — YouTube Video Background
 * Uses the YouTube IFrame Player API for reliable autoplay on all browsers.
 * Autoplay, muted, looped, no controls, no branding overlay.
 *
 * The player is scaled up and centered (the "cover" technique) so it always
 * fills the viewport regardless of aspect ratio, with a dark overlay on top
 * to keep text readable.
 *
 * Available backdrop options:
 *   Option A — QsqbmKPngSU  (laser show / crowd energy)
 *   Option B — lNLeRmnkug8  (glowing particles / atmospheric)
 *   Option C — B0TjyJIIWLA
 *   Option D — wLsU8GaKFJY  (correct backdrop — currently active on home)
 *
 * Event pages use their own videoId via props.
 */

import { useEffect, useRef, useState } from "react";

interface YouTubeBackgroundProps {
  /** YouTube video ID */
  videoId?: string;
  /** Start time in seconds — default 297 */
  startAt?: number;
  /** Overlay darkness 0–1 — default 0.35 */
  overlayOpacity?: number;
}

/* ─── Load the YT IFrame API script once globally ─── */
let ytApiReady = false;
let ytApiCallbacks: (() => void)[] = [];

function ensureYTApi(cb: () => void) {
  if (ytApiReady && (window as any).YT?.Player) {
    cb();
    return;
  }
  ytApiCallbacks.push(cb);
  if (document.getElementById("yt-iframe-api")) return;

  const tag = document.createElement("script");
  tag.id = "yt-iframe-api";
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  (window as any).onYouTubeIframeAPIReady = () => {
    ytApiReady = true;
    ytApiCallbacks.forEach((fn) => fn());
    ytApiCallbacks = [];
  };
}

export default function YouTubeBackground({
  videoId = "wLsU8GaKFJY",
  startAt = 297,
  overlayOpacity = 0.35,
}: YouTubeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a unique div for the player
    const playerId = `yt-bg-${videoId}-${Math.random().toString(36).slice(2, 8)}`;
    const playerDiv = document.createElement("div");
    playerDiv.id = playerId;
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(playerDiv);

    ensureYTApi(() => {
      if (!document.getElementById(playerId)) return;

      playerRef.current = new (window as any).YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          start: startAt,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
            setReady(true);
          },
          onStateChange: (event: any) => {
            const YT = (window as any).YT;
            // If video ends or is paused, restart it
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(startAt, true);
              event.target.playVideo();
            }
            if (event.data === YT.PlayerState.PAUSED) {
              event.target.playVideo();
            }
          },
          onError: (event: any) => {
            console.warn("[YouTubeBackground] Player error:", event.data);
          },
        },
      });
    });

    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore cleanup errors
      }
      playerRef.current = null;
    };
  }, [videoId, startAt]);

  return (
    <>
      {/* YouTube player container — scaled to cover the full viewport */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          ref={containerRef}
          style={{
            /* Cover technique: scale the 16:9 player to always fill the viewport */
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "calc(100vw + 200px)",
            height: "calc(100vh + 200px)",
            minWidth: "calc((100vh + 200px) * 16 / 9)",
            minHeight: "calc((100vw + 200px) * 9 / 16)",
            transform: "translate(-50%, -50%)",
            opacity: ready ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
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
