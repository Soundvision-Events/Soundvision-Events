/**
 * SoundVision Events — Hero Section
 * Full-screen hero with animated ring, looping background VIDEO, and CTA
 */
export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Hero video — 60% opacity so YouTube backdrop bleeds through underneath */}
      <div className="absolute inset-0" style={{ opacity: 0.4 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          poster="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/hero-bg-k7KfhYH7TSMYQdtgs3D6zf.webp"
        >
          <source
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/hero-loop-new_5528fae7.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      {/* Light gradient overlay — keeps text readable while both videos show through */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,16,0.08) 0%, rgba(8,12,16,0.02) 40%, rgba(8,12,16,0.15) 80%, rgba(8,12,16,0.40) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Cyan radial glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at center, rgba(0,200,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#00c8ff",
              padding: "0.4rem 1.2rem",
              border: "1px solid rgba(0, 200, 255, 0.3)",
              borderRadius: "100px",
              background: "rgba(0, 200, 255, 0.08)",
              textTransform: "uppercase",
            }}
          >
            All-Round DJ Shows — Noord-Nederland
          </span>
        </div>

        {/* Main heading with turntable icon on the left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.5rem, 2vw, 1.5rem)",
            marginBottom: "0.5rem",
          }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_turntable_a6e305c0.png"
            alt="Vinyl Turntable"
            className="sv-vinyl-spin"
            style={{
              width: "clamp(60px, 8vw, 120px)",
              height: "clamp(60px, 8vw, 120px)",
              objectFit: "contain",
              filter: "drop-shadow(0 0 20px rgba(0,200,255,0.6))",
              flexShrink: 0,
            }}
          />
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              letterSpacing: "0.05em",
              lineHeight: 1,
              color: "#f0f4f8",
              margin: 0,
            }}
          >
            SOUND
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VISION
            </span>
          </h1>
        </div>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            letterSpacing: "0.4em",
            color: "rgba(240, 244, 248, 0.6)",
            marginBottom: "1.5rem",
          }}
        >
          EVENTS
        </h2>

        {/* Subtitle with inline lightning icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            maxWidth: "720px",
            margin: "0 auto 2.5rem",
          }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_lightning_e92b8a67.png"
            alt="Lightning"
            className="sv-lightning"
            style={{
              width: '100px',
              height: '95px',
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '33px',
              color: "#04f1ca",
              lineHeight: 1.5,
              fontWeight: 100,
              opacity: 1,
              margin: 0,
              textAlign: "left",
            }}
          >
            Uw Persoonlijke Allround DJ &amp; Partner,{" "}
            <br />
            Van Algemeen tot Ziens
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="sv-btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
            onClick={() => handleScroll("#packages")}
          >
            Bekijk Pakketten
          </button>
          <button
            className="sv-btn-secondary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
            onClick={() => handleScroll("#contact")}
          >
            Neem Contact Op
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-8 mt-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: '0px', paddingRight: '22px', paddingBottom: '125px' }}
        >
          {[
            { value: "500+", label: "Shows Gespeeld" },
            { value: "15+", label: "Jaar Ervaring" },
            { value: "3", label: "Show Pakketten" },
            { value: "100%", label: "Tevredenheid" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.5rem",
                  color: "#00c8ff",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240, 244, 248, 0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: "float 2s ease-in-out infinite" }}
      >
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(0,200,255,0.8), transparent)",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}
