/**
 * SoundVision Events — Packages Section
 * Intiem / Luxe / Elite DJ show packages with glassmorphism cards
 * Elite package features the lights video showcase
 */
import { Check } from "lucide-react";

const LIGHTS_VIDEO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/Lights_change_colours_202603270757-5eMFKZjbLFBcMUFMcBxFzH.mp4";

const packages = [
  {
    id: "intiem",
    name: "INTIEM",
    tagline: "Compact & Krachtig",
    price: "Op aanvraag",
    duration: "Tot 4 uur",
    highlight: false,
    color: "#0090ff",
    video: null,
    features: [
      "Professionele DJ setup (Pioneer)",
      "Muziek op maat voor uw feest",
      "Draadloze microfoon",
      "2x actieve speakers (1500W)",
      "Basis lichtshow (4x PAR LED)",
      "Opbouw & afbouw inbegrepen",
      "Voorbesprekingsgesprek",
      "Muziekwensen lijst",
    ],
    ideal: "Ideaal voor: Kleine feesten, verjaardagen, huisfeesten",
    icon: "🎵",
  },
  {
    id: "luxe",
    name: "LUXE",
    tagline: "Meest Gekozen",
    price: "Op aanvraag",
    duration: "Tot 6 uur",
    highlight: true,
    color: "#00c8ff",
    video: null,
    features: [
      "Professionele DJ setup (Pioneer CDJ)",
      "Muziek volledig op maat",
      "2x draadloze microfoons",
      "4x actieve speakers (3000W totaal)",
      "Uitgebreide lichtshow (moving heads + PAR)",
      "Rookmachine",
      "Professionele DJ booth",
      "Opbouw & afbouw inbegrepen",
      "Uitgebreid voorbesprekingsgesprek",
      "Muziekwensen lijst + persoonlijke intro",
    ],
    ideal: "Ideaal voor: Bruiloften, bedrijfsfeesten, verjaardagen",
    icon: "🎛️",
  },
  {
    id: "elite",
    name: "ELITE",
    tagline: "Spectaculair & Groots",
    price: "Op aanvraag",
    duration: "Tot 8 uur",
    highlight: false,
    color: "#ff5500",
    video: LIGHTS_VIDEO_URL,
    features: [
      "Professionele DJ setup (Pioneer CDJ-3000)",
      "Volledig gepersonaliseerde muziekervaring",
      "4x draadloze microfoons",
      "6x actieve speakers + subwoofers (6000W)",
      "Volledige lichtshow (moving heads, lasers, strobes)",
      "Rookmachines",
      "Opbouw & afbouw inbegrepen",
      "Meerdere voorbesprekingen",
      "Muziekwensen + persoonlijke intro + surprises",
    ],
    ideal: "Ideaal voor: Grote bruiloften, grote bedrijfsevents, festivals",
    icon: "🚀",
  },
];

export default function PackagesSection() {
  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="packages"
      className="relative py-24 overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Deep teal section overlay — sits above the YouTube background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,60,70,0.55) 0%, rgba(0,40,55,0.60) 50%, rgba(0,30,45,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Radial accent glow at top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(0, 200, 200, 0.12) 0%, transparent 60%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Large decorative text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "20vw",
          color: "rgba(255, 255, 255, 0.015)",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        SHOWS
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 sv-fade-up">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#00c8ff",
              textTransform: "uppercase",
            }}
          >
            Pakketten
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
            KIES UW
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}PERFECTE SHOW
            </span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "rgba(240, 244, 248, 0.6)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Drie zorgvuldig samengestelde pakketten voor elk type evenement en budget. Alle prijzen zijn op aanvraag — neem contact op voor een vrijblijvende offerte.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`sv-fade-up relative rounded-2xl flex flex-col overflow-hidden ${pkg.highlight ? "sv-package-featured" : ""}`}
              style={{
                animationDelay: `${i * 0.15}s`,
                background: pkg.highlight
                  ? "linear-gradient(135deg, rgba(0, 200, 255, 0.08), rgba(0, 144, 255, 0.05))"
                  : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${pkg.highlight ? "rgba(0, 200, 255, 0.35)" : "rgba(255, 255, 255, 0.07)"}`,
                boxShadow: pkg.highlight
                  ? "0 0 40px rgba(0, 200, 255, 0.12), 0 0 80px rgba(0, 200, 255, 0.05)"
                  : "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!pkg.highlight) {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = `${pkg.color}44`;
                } else {
                  e.currentTarget.style.transform = "translateY(-6px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                if (!pkg.highlight) {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                }
              }}
            >
              {/* Elite package: video showcase at top */}
              {pkg.video && (
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: "180px", flexShrink: 0 }}
                >
                  <video
                    src={pkg.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Gradient overlay so card content blends in */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, rgba(10,15,21,0) 40%, rgba(10,15,21,0.95) 100%)",
                    }}
                  />
                  {/* Elite badge on video */}
                  <div
                    className="absolute top-3 right-3"
                    style={{
                      background: "linear-gradient(135deg, #ff5500, #ff8800)",
                      color: "#fff",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.15em",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "100px",
                    }}
                  >
                    ELITE SHOW
                  </div>
                </div>
              )}

              {/* Most popular badge */}
              {pkg.highlight && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  style={{
                    background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                    color: "#080c10",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    padding: "0.35rem 1.25rem",
                    borderRadius: "100px",
                    whiteSpace: "nowrap",
                  }}
                >
                  MEEST GEKOZEN
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Package header */}
                <div className="mb-6">
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{pkg.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      color: pkg.color,
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pkg.tagline}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "2rem",
                      letterSpacing: "0.08em",
                      color: "#f0f4f8",
                      lineHeight: 1,
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <div
                    className="mt-3 flex items-center gap-3"
                    style={{
                      paddingBottom: "1.25rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: pkg.color,
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.8rem",
                        color: "rgba(240, 244, 248, 0.4)",
                        padding: "0.2rem 0.6rem",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "100px",
                      }}
                    >
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-3 flex-1 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 mt-0.5"
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: `${pkg.color}22`,
                          border: `1px solid ${pkg.color}66`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={10} color={pkg.color} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.875rem",
                          color: "rgba(240, 244, 248, 0.75)",
                          lineHeight: 1.5,
                          opacity: 1,
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Ideal for */}
                <div
                  className="mb-6 p-3 rounded-lg"
                  style={{
                    background: `${pkg.color}0d`,
                    border: `1px solid ${pkg.color}22`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: pkg.color,
                      lineHeight: 1.5,
                    }}
                  >
                    {pkg.ideal}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleContact}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.5rem",
                    borderRadius: "8px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1rem",
                    letterSpacing: "0.15em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: pkg.highlight
                      ? "linear-gradient(135deg, #00c8ff, #0090ff)"
                      : "transparent",
                    color: pkg.highlight ? "#080c10" : pkg.color,
                    border: pkg.highlight ? "none" : `1px solid ${pkg.color}66`,
                  }}
                  onMouseEnter={(e) => {
                    if (!pkg.highlight) {
                      (e.currentTarget as HTMLButtonElement).style.background = `${pkg.color}22`;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = pkg.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.highlight) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = `${pkg.color}66`;
                    }
                  }}
                >
                  OFFERTE AANVRAGEN
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12 sv-fade-up">
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(240, 244, 248, 0.4)",
            }}
          >
            Alle pakketten zijn uitbreidbaar met{" "}
            <span style={{ color: "#00c8ff" }}>add-ons</span>. Prijzen op aanvraag — geen verborgen kosten.
          </p>
        </div>
      </div>
    </section>
  );
}
