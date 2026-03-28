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
      style={{ backgroundColor: "#080c10" }}
    >
      {/* Background video loop */}
      <div className="absolute inset-0">
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
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,16,0.50) 0%, rgba(8,12,16,0.35) 40%, rgba(8,12,16,0.60) 80%, rgba(8,12,16,0.85) 100%)",
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
        {/* Animated logo ring */}
        <div className="relative inline-block mb-8 sv-float">
          {/* Outer rotating ring */}
          <div
            className="sv-ring-1"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              border: "2px solid transparent",
              background: "linear-gradient(#080c10, #080c10) padding-box, linear-gradient(135deg, #00c8ff, transparent, #ff5500) border-box",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {/* Inner ring */}
            <div
              className="sv-ring-2"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "1px solid rgba(0, 200, 255, 0.3)",
                position: "absolute",
              }}
            />
            {/* Logo center */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(255,85,0,0.1))",
                border: "1px solid rgba(0,200,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M15 30V10l20-4v20" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="30" r="5" stroke="#00c8ff" strokeWidth="2.5"/>
                <circle cx="30" cy="26" r="5" stroke="#ff5500" strokeWidth="2.5"/>
              </svg>
            </div>
          </div>
        </div>

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

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            letterSpacing: "0.05em",
            lineHeight: 1,
            color: "#f0f4f8",
            marginBottom: "0.5rem",
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
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
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
