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
      {/* Hero video — 40% opacity so YouTube backdrop bleeds through underneath */}
      <div className="absolute inset-0" style={{ opacity: 0.4 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
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
      <div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ paddingTop: '157px', paddingRight: '22px', paddingBottom: '335px', paddingLeft: '21px', height: '1073px' }}
      >
        {/* Main heading: animated logo ring LEFT of h1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 3vw, 2rem)",
            marginBottom: "0.5rem",
          }}
        >
          {/* Animated logo ring — left of title, badge overlaid at bottom */}
          <div className="relative sv-float flex-shrink-0" style={{ paddingBottom: "1.8rem" }}>
            <div
              className="sv-ring-1"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "2px solid transparent",
                background: "linear-gradient(#080c10, #080c10) padding-box, linear-gradient(135deg, #00c8ff, transparent, #ff5500) border-box",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="sv-ring-2"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  position: "absolute",
                }}
              />
              <div
                style={{
                  width: "60px",
                  height: "60px",
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
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                  <path d="M15 30V10l20-4v20" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="30" r="5" stroke="#00c8ff" strokeWidth="2.5"/>
                  <circle cx="30" cy="26" r="5" stroke="#ff5500" strokeWidth="2.5"/>
                </svg>
              </div>
            </div>
            {/* Badge overlay — positioned below the ring, centered */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "#00c8ff",
                  padding: "0.25rem 0.75rem",
                  border: "1px solid rgba(0, 200, 255, 0.4)",
                  borderRadius: "100px",
                  background: "rgba(0, 200, 255, 0.1)",
                  textTransform: "uppercase",
                  backdropFilter: "blur(4px)",
                }}
              >
                All-Round DJ Shows
              </span>
            </div>
          </div>

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

        {/* EVENTS subtitle */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            letterSpacing: "0.4em",
            color: "#f0f0f0",
            marginBottom: "1.5rem",
          }}
        >
          EVENTS
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ paddingTop: "21px" }}>
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
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}
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
