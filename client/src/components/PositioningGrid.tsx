import { useEffect, useState } from "react";

/**
 * DEV TOOL — Full-page positioning grid overlay
 * Shows horizontal lines every 100px with pixel & percentage labels on both sides.
 * Fixed over the entire page (nav to footer). Remove from App.tsx when done.
 */
export default function PositioningGrid() {
  // Only render in development / local preview — never on the published live site
  if (!import.meta.env.DEV) return null;

  const [pageHeight, setPageHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const update = () => {
      setPageHeight(document.documentElement.scrollHeight);
      setScrollY(window.scrollY);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    // Re-measure after images/sections load
    const t = setTimeout(update, 1500);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, []);

  if (pageHeight === 0) return null;

  const step = 100; // px between lines
  const lines = Array.from({ length: Math.floor(pageHeight / step) }, (_, i) => (i + 1) * step);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${pageHeight}px`,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {lines.map((py) => {
        const pct = ((py / pageHeight) * 100).toFixed(1);
        const isHundred = py % 500 === 0;
        return (
          <div
            key={py}
            style={{
              position: "absolute",
              top: `${py}px`,
              left: 0,
              right: 0,
              height: "1px",
              borderTop: isHundred
                ? "1px solid rgba(0,220,255,0.55)"
                : "1px dashed rgba(255,255,255,0.18)",
            }}
          >
            {/* Left label */}
            <span
              style={{
                position: "absolute",
                left: "6px",
                top: "-11px",
                fontFamily: "monospace",
                fontSize: "10px",
                color: isHundred ? "rgba(0,220,255,0.95)" : "rgba(255,255,255,0.60)",
                background: "rgba(0,0,0,0.65)",
                padding: "1px 4px",
                borderRadius: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {py}px · {pct}%
            </span>
            {/* Right label */}
            <span
              style={{
                position: "absolute",
                right: "6px",
                top: "-11px",
                fontFamily: "monospace",
                fontSize: "10px",
                color: isHundred ? "rgba(0,220,255,0.95)" : "rgba(255,255,255,0.60)",
                background: "rgba(0,0,0,0.65)",
                padding: "1px 4px",
                borderRadius: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {py}px · {pct}%
            </span>
          </div>
        );
      })}

      {/* Viewport bottom indicator — shows current scroll position */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,80,80,0.7)",
          zIndex: 10000,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "4px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "monospace",
          fontSize: "11px",
          color: "rgba(255,120,120,1)",
          background: "rgba(0,0,0,0.75)",
          padding: "2px 8px",
          borderRadius: "4px",
          zIndex: 10000,
          whiteSpace: "nowrap",
        }}
      >
        scroll: {scrollY}px · viewport bottom: {scrollY + window.innerHeight}px
      </div>
    </div>
  );
}
