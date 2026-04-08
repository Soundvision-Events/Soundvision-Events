/**
 * SoundVision Events — BentoGallery
 * Asymmetric bento-style photo/video grid using CSS grid-template-areas.
 * Layout (desktop, 3 cols × 2 rows):
 *   ┌──────────────┬─────────┬─────────┐
 *   │              │    b    │    c    │
 *   │      a       ├─────────┴─────────┤
 *   │  (2col×2row) │    e  (wide 2col) │
 *   └──────────────┴───────────────────┘
 * Each cell supports multiple images that auto-cycle with a fade transition.
 * Each cell cycles independently at a staggered interval so they never all
 * switch at the same time.
 */
import { useEffect, useRef, useState } from "react";

interface BentoItem {
  /** Primary image URL — required */
  src: string;
  /** Additional images that cycle after the primary */
  extraSrcs?: string[];
  videoSrc?: string;
  alt: string;
  label: string;
  /** CSS grid-area name: "a" | "b" | "c" | "d" | "e" */
  area: "a" | "b" | "c" | "d" | "e";
}

interface BentoGalleryProps {
  accentColor?: string;
  title?: string;
  subtitle?: string;
  items?: BentoItem[];
}

// ─── CDN base ────────────────────────────────────────────────────────────────
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc";

const DEFAULT_ITEMS: BentoItem[] = [
  {
    // Area a: large hero — DJ Tonicity at the decks + extra show shots
    src: `${CDN}/DSC_5501_54b2e5f0.webp`,
    extraSrcs: [
      `${CDN}/SV2025-08-23.22,47,53@SoundvisionEvents_2d137e52.webp`,
      `${CDN}/DSC_3938_5eeaf311.webp`,
      `${CDN}/DSC_3915_7845b38d.webp`,
    ],
    alt: "DJ Tonicity achter de decks",
    label: "DJ Tonicity — Allround DJ Shows",
    area: "a",
  },
  {
    // Area b: elite show dance floor + jubileum
    src: `${CDN}/DSC_5410_467814ae.webp`,
    extraSrcs: [
      `${CDN}/DSC_4888_340bc278.webp`,
      `${CDN}/IMG_00008_f89cf707.webp`,
    ],
    alt: "Elite Show Dansvloer",
    label: "Elite Show — Grote Dansvloer",
    area: "b",
  },
  {
    // Area c: corporate/karaoke + private party vibes
    src: `${CDN}/IMG_4943_73f62d8d.jpg`,
    extraSrcs: [
      `${CDN}/DSC_3887_94802f82.webp`,
      `${CDN}/DSC_3864_96d64945.webp`,
      `${CDN}/dsc_3145_1a11f028.jpg`,
    ],
    alt: "Bedrijfsfeest met karaoke",
    label: "Bedrijfsfeest — Karaoke & Entertainment",
    area: "c",
  },
  {
    // Area e: wide — branded SoundVision show + bruiloft
    src: `${CDN}/SV2025-09-19-DSC_8785EVENTS_7d68b142.webp`,
    extraSrcs: [
      `${CDN}/DSC_5501_54b2e5f0.webp`,
      `${CDN}/IMG_0007_d5030403.webp`,
      `${CDN}/DSC_2172_397932df.webp`,
    ],
    alt: "SoundVision Events Show",
    label: "SoundVision Events — Allround DJ Show",
    area: "e",
  },
];

// ─── Single cycling cell ──────────────────────────────────────────────────────
function BentoCell({
  item,
  accentColor,
  glowRgba,
  glowStrong,
  cycleInterval,
}: {
  item: BentoItem;
  accentColor: string;
  glowRgba: string;
  glowStrong: string;
  /** ms between photo switches */
  cycleInterval: number;
}) {
  const allSrcs = [item.src, ...(item.extraSrcs ?? [])];
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadingIdx, setFadingIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (allSrcs.length <= 1) return;

    timerRef.current = setTimeout(function tick() {
      setFadingIdx((prev) => {
        // start fade-out of current
        return prev ?? activeIdx;
      });
      setActiveIdx((prev) => (prev + 1) % allSrcs.length);
      // after fade completes, clear the fading layer
      setTimeout(() => setFadingIdx(null), 800);
      timerRef.current = setTimeout(tick, cycleInterval);
    }, cycleInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleInterval, allSrcs.length]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl group sv-tilt"
      style={{
        gridArea: item.area,
        border: `1px solid ${glowRgba}`,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        background: "rgba(20, 8, 50, 0.30)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = glowStrong;
        e.currentTarget.style.boxShadow = `0 0 28px ${glowRgba}, 0 8px 32px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = glowRgba;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* All images stacked; only active one is visible */}
      {allSrcs.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={idx === 0 ? item.alt : `${item.alt} ${idx + 1}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.8s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            opacity: idx === activeIdx ? 1 : 0,
            transform: idx === activeIdx ? "scale(1.0)" : "scale(1.04)",
            zIndex: idx === activeIdx ? 2 : idx === fadingIdx ? 1 : 0,
          }}
          className={idx === activeIdx ? "group-hover:scale-105" : ""}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.src = `https://placehold.co/800x600/0a0f15/444?text=${encodeURIComponent(item.alt)}`;
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,12,16,0.88) 0%, rgba(8,12,16,0.2) 50%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* Accent tint on hover */}
      <div
        className="opacity-0 group-hover:opacity-100"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${accentColor}22 0%, transparent 60%)`,
          transition: "opacity 0.3s ease",
          zIndex: 4,
        }}
      />

      {/* Photo counter dots */}
      {allSrcs.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            display: "flex",
            gap: "4px",
            zIndex: 5,
          }}
        >
          {allSrcs.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === activeIdx ? "14px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: idx === activeIdx ? accentColor : "rgba(255,255,255,0.35)",
                transition: "width 0.4s ease, background 0.4s ease",
                boxShadow: idx === activeIdx ? `0 0 6px ${accentColor}` : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1.1rem",
          right: "1.1rem",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#f0f4f8",
            margin: 0,
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          {item.label}
        </p>
      </div>

      {/* Corner accent dot */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: accentColor,
          boxShadow: `0 0 8px ${accentColor}`,
          opacity: 0.75,
          zIndex: 5,
        }}
      />
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export default function BentoGallery({
  accentColor = "#00c8ff",
  title = "ONZE SHOWS",
  subtitle = "Impressies",
  items = DEFAULT_ITEMS,
}: BentoGalleryProps) {
  const glowRgba = `${accentColor}33`;
  const glowStrong = `${accentColor}66`;

  // Stagger intervals so cells don't all switch at the same time
  const INTERVALS = [4500, 5200, 4800, 5600];

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "rgba(3, 3, 3, 0.45)", paddingTop: "83px", marginTop: "44px" }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${glowRgba} 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sv-fade-up sv-zoom-reveal">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: accentColor,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.05,
              color: "#f0f4f8",
            }}
          >
            {title.split(" ").map((word, i) =>
              i === title.split(" ").length - 1 ? (
                <span
                  key={i}
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {" "}
                  {word}
                </span>
              ) : (
                <span key={i}>{i > 0 ? " " : ""}{word}</span>
              )
            )}
          </h2>
        </div>

        {/* ── Asymmetric bento grid ── */}
        <div
          className="sv-fade-up sv-zoom-reveal bento-grid"
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "260px 200px",
            gridTemplateAreas: `
              "a b c"
              "a e e"
            `,
          }}
        >
          {items.map((item, idx) => (
            <BentoCell
              key={item.area}
              item={item}
              accentColor={accentColor}
              glowRgba={glowRgba}
              glowStrong={glowStrong}
              cycleInterval={INTERVALS[idx % INTERVALS.length]}
            />
          ))}
        </div>

        {/* Mobile responsive styles */}
        <style>{`
          @media (max-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr 1fr !important;
              grid-template-rows: 160px 160px 160px !important;
              grid-template-areas:
                "a a"
                "b c"
                "e e" !important;
            }
          }
          @media (min-width: 641px) and (max-width: 900px) {
            .bento-grid {
              grid-template-columns: 1fr 1fr !important;
              grid-template-rows: 220px 180px !important;
              grid-template-areas:
                "a b"
                "e e" !important;
            }
          }
        `}</style>

        {/* Upload CTA */}
        <div className="text-center mt-10 sv-fade-up">
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(240,244,248,0.45)",
              fontStyle: "italic",
            }}
          >
            Eigen foto's van uw evenement? Neem contact op om uw show te laten zien.
          </p>
        </div>
      </div>
    </section>
  );
}
