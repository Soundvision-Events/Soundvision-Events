/**
 * SoundVision Events — BentoGallery
 * Asymmetric bento-style photo grid using CSS grid-template-areas.
 * Layout (desktop, 4 cols × 2 rows):
 *   ┌──────────────┬─────────┬─────────┐
 *   │              │    b    │    c    │
 *   │      a       ├─────────┴─────────┤
 *   │  (2col×2row) │    e  (wide 2col) │
 *   ├──────────────┴───────────────────┤
 *   │              d  (full width)     │
 *   └──────────────────────────────────┘
 */

interface BentoItem {
  src: string;
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

const DEFAULT_ITEMS: BentoItem[] = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj-show-1-2x_JzPjSqAKqcKZZxjEEFJxLd.webp",
    alt: "DJ Show",
    label: "Sfeer & Energie",
    area: "a",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj-equipment-2x_7YnFqWLqPHXVBkJsVAYLJP.webp",
    alt: "DJ Equipment",
    label: "Professionele Apparatuur",
    area: "b",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/party-dj-2x_RLBxVBqWLqPHXVBkJsVAYLJP.webp",
    alt: "Party DJ",
    label: "Dansende Gasten",
    area: "c",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/wedding-dj-DqtALdSvgWVVw3zhZFPk6b.webp",
    alt: "Wedding DJ",
    label: "Onvergetelijke Momenten",
    area: "d",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/corporate-event-2x_JzPjSqAKqcKZZxjEEFJxLd.webp",
    alt: "Corporate Event",
    label: "Bedrijfsfeest",
    area: "e",
  },
];

export default function BentoGallery({
  accentColor = "#00c8ff",
  title = "ONZE SHOWS",
  subtitle = "Impressies",
  items = DEFAULT_ITEMS,
}: BentoGalleryProps) {
  const glowRgba = `${accentColor}33`;
  const glowStrong = `${accentColor}66`;

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: 'rgba(117, 102, 115, 0.50)' }}
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
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
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
                  {" "}{word}
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
          {items.map((item) => (
            <div
              key={item.area}
              className="relative overflow-hidden rounded-2xl group"
              style={{
                gridArea: item.area,
                border: `1px solid ${glowRgba}`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                background: "rgba(255,255,255,0.03)",
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
              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                className="group-hover:scale-110"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.src = `https://placehold.co/800x600/0a0f15/444?text=${encodeURIComponent(item.alt)}`;
                }}
              />

              {/* Dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,12,16,0.88) 0%, rgba(8,12,16,0.2) 50%, transparent 100%)",
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
                }}
              />

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1.1rem",
                  right: "1.1rem",
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
                }}
              />
            </div>
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
