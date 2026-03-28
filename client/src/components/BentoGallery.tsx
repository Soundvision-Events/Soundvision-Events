/**
 * SoundVision Events — BentoGallery
 * A reusable bento-grid gallery section with configurable accent color.
 * Each page provides its own accent color and optional custom images.
 */

interface BentoItem {
  src: string;
  alt: string;
  label: string;
  /** Grid span class — e.g. "col-span-2 row-span-2", "col-span-1 row-span-1" */
  span?: string;
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
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj-equipment-2x_7YnFqWLqPHXVBkJsVAYLJP.webp",
    alt: "DJ Equipment",
    label: "Professionele Apparatuur",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/party-dj-2x_RLBxVBqWLqPHXVBkJsVAYLJP.webp",
    alt: "Party DJ",
    label: "Dansende Gasten",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/wedding-dj-DqtALdSvgWVVw3zhZFPk6b.webp",
    alt: "Wedding DJ",
    label: "Onvergetelijke Momenten",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/corporate-event-2x_JzPjSqAKqcKZZxjEEFJxLd.webp",
    alt: "Corporate Event",
    label: "Bedrijfsfeest",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj-show-2-2x_JzPjSqAKqcKZZxjEEFJxLd.webp",
    alt: "DJ Show 2",
    label: "Lichtshow",
    span: "col-span-1 row-span-1",
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
      style={{ backgroundColor: "transparent" }}
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
        <div className="text-center mb-12 sv-fade-up">
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

        {/* Bento grid */}
        <div
          className="grid grid-cols-3 gap-3 sv-fade-up"
          style={{ gridAutoRows: "200px" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${item.span || "col-span-1 row-span-1"}`}
              style={{
                border: `1px solid ${glowRgba}`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = glowStrong;
                e.currentTarget.style.boxShadow = `0 0 24px ${glowRgba}, 0 8px 32px rgba(0,0,0,0.4)`;
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
                  transition: "transform 0.5s ease",
                }}
                className="group-hover:scale-110"
                onError={(e) => {
                  // Fallback gradient if image fails to load
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,12,16,0.85) 0%, rgba(8,12,16,0.2) 50%, transparent 100%)",
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Accent color overlay on hover */}
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
                  left: "1rem",
                  right: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: accentColor,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.25rem",
                    opacity: 0,
                    transform: "translateY(6px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                  className="group-hover:opacity-100 group-hover:translate-y-0"
                />
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#f0f4f8",
                    margin: 0,
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
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: accentColor,
                  boxShadow: `0 0 8px ${accentColor}`,
                  opacity: 0.7,
                }}
              />
            </div>
          ))}
        </div>

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
