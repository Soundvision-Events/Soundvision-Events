/**
 * SoundVision Events — Gallery Section
 * Visual showcase of DJ shows
 */
const galleryItems = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/IMG_1491_53158840.JPG",
    alt: "SoundVision Events DJ Setup",
    label: "Pro Setup",
    span: "col-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/SVE_2397_ef203da9.JPG",
    alt: "Bruiloft First Dance",
    label: "Bruiloft",
    span: "col-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/DSC_6823_e9156075.JPG",
    alt: "Feest Dansende Gasten",
    label: "Feest",
    span: "col-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/IMG_0594_406b4f4b.jpeg",
    alt: "SoundVision Events DJ Booth",
    label: "DJ Show",
    span: "col-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/SVE_0332_79cfa0ac.jpeg",
    alt: "Dansende Gasten Feest",
    label: "Dancefloor",
    span: "col-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/IMG_5942_8ab37864.JPG",
    alt: "Kerstfeest Groot Evenement",
    label: "Kerstfeest",
    span: "col-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/fad4a453-baae-46ec-82da-34b744b41097_79c96b83.jpg",
    alt: "DJ in Blue Light",
    label: "Studio Setup",
    span: "col-span-1",
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-24 overflow-hidden"
    >
      {/* 50% dark overlay — lets YouTube backdrop show through */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8, 12, 16, 0.30)", pointerEvents: "none", zIndex: 0 }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sv-fade-up">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#00c8ff",
              textTransform: "uppercase",
            }}
          >
            Galerij
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.05,
              color: "#f0f4f8",
            }}
          >
            DE SHOW IN
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}BEELD
            </span>
          </h2>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-3 gap-3 sv-fade-up">
          {galleryItems.map((item) => (
            <div
              key={item.alt}
              className={`group relative rounded-xl overflow-hidden ${item.span}`}
              style={{
                aspectRatio: item.span === "col-span-2" ? "16/7" : "4/3",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                cursor: "pointer",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(8,12,16,0.8) 0%, transparent 60%)",
                }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(0, 200, 255, 0.08)",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  borderRadius: "0.75rem",
                }}
              />
              {/* Label */}
              <div className="absolute bottom-4 left-4">
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    color: "#f0f4f8",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube video link */}
        <div className="text-center mt-10 sv-fade-up">
          <p
            className="mb-4"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "rgba(240, 244, 248, 0.6)",
            }}
          >
            Bekijk ook onze video's op YouTube
          </p>
          <a
            href="https://youtube.com/@soundvision.events"
            target="_blank"
            rel="noopener noreferrer"
            className="sv-btn-secondary inline-block"
            style={{ textDecoration: "none" }}
          >
            Bekijk YouTube Kanaal
          </a>
        </div>
      </div>
    </section>
  );
}
