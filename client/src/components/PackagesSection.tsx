/**
 * SoundVision Events — Packages Section
 * Flip cards: front = photo + key highlights, back = full features + CTA
 */
import { Check } from "lucide-react";

const INTIEM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/intiem_show_template_v2_75b64794.png";
const LUXE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/luxe_show_template_16cc28b3.png";
const ELITE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/elite_show_template_cc6cd11c.png";

const packages = [
  {
    id: "intiem",
    name: "INTIEM",
    tagline: "Compact & Krachtig",
    price: "vanaf €495,-",
    duration: "4 uur · €100/extra uur",
    highlight: false,
    color: "#0090ff",
    image: INTIEM_IMG,
    highlights: [
      { icon: "👥", text: "Capaciteit 50 – 100 personen" },
      { icon: "💡", text: "4 RGB parspots + 2x mini movinghead spots" },
      { icon: "🎛️", text: "Unieke LED DJ Booth · Pioneer XDJ-AZ (nieuwste model)" },
    ],
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
    price: "vanaf €650,-",
    duration: "4 uur · €100/extra uur",
    highlight: true,
    color: "#00c8ff",
    image: LUXE_IMG,
    highlights: [
      { icon: "👥", text: "Capaciteit 100 – 200 personen" },
      { icon: "💡", text: "8 RGB parspots + 2x mini movinghead + 2x Hybride movinghead groot" },
      { icon: "🎛️", text: "Unieke LED DJ Booth · Pioneer XDJ-AZ (nieuwste model)" },
      { icon: "🔊", text: "Hoogwaardige geluidsinstallatie (QSC)" },
    ],
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
    price: "vanaf €895,-",
    duration: "5 uur min · +1u gratis",
    highlight: false,
    color: "#ff5500",
    image: ELITE_IMG,
    highlights: [
      { icon: "👥", text: "Capaciteit 200+ personen" },
      { icon: "💡", text: "8 RGB parspots + 2x mini movinghead + 4x Hybride movinghead groot" },
      { icon: "🌫️", text: "Rookmachine met LED-verlichte rookoutput" },
      { icon: "🎛️", text: "Unieke LED DJ Booth · Pioneer XDJ-AZ (nieuwste model)" },
      { icon: "🔊", text: "Hoogwaardige geluidsinstallatie (QSC 6KW)" },
    ],
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
      className="relative py-24 overflow-hidden sv-parallax"
      style={{ position: "relative" }}
    >
      {/* Deep teal section overlay — parallax bg layer */}
      <div
        className="absolute inset-0 sv-parallax-bg"
        data-parallax-speed="0.12"
        style={{
          background: "linear-gradient(180deg, rgba(0,60,70,0.30) 0%, rgba(0,40,55,0.30) 50%, rgba(0,30,45,0.30) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Radial accent glow at top — parallax bg layer */}
      <div
        className="absolute inset-0 sv-parallax-bg"
        data-parallax-speed="0.22"
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
            Drie zorgvuldig samengestelde pakketten voor elk type evenement en budget. Hover over een kaart voor alle details.
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(240, 244, 248, 0.35)",
              letterSpacing: "0.05em",
            }}
          >
            ↕ Hover over een kaart voor alle details
          </p>
        </div>

        {/* Flip card grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className="sv-fade-up"
              style={{
                animationDelay: `${i * 0.15}s`,
                perspective: "1200px",
                height: "580px",
              }}
            >
              {/* Flip container */}
              <div
                className="sv-flip-card-inner"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "rotateY(180deg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg)";
                }}
              >
                {/* ── FRONT FACE ── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: pkg.highlight
                      ? "linear-gradient(135deg, rgba(0,200,255,0.10), rgba(0,144,255,0.06))"
                      : "rgba(12, 18, 28, 0.85)",
                    border: `1px solid ${pkg.highlight ? "rgba(0,200,255,0.40)" : "rgba(255,255,255,0.09)"}`,
                    boxShadow: pkg.highlight
                      ? "0 0 40px rgba(0,200,255,0.14), 0 0 80px rgba(0,200,255,0.06)"
                      : "0 8px 32px rgba(0,0,0,0.4)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* "MEEST GEKOZEN" badge */}
                  {pkg.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                        color: "#080c10",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        padding: "0.3rem 1.1rem",
                        borderRadius: "0 0 10px 10px",
                        whiteSpace: "nowrap",
                        zIndex: 10,
                      }}
                    >
                      MEEST GEKOZEN
                    </div>
                  )}

                  {/* Show photo — fills top half */}
                  <div style={{ position: "relative", height: "260px", flexShrink: 0 }}>
                    <img
                      src={pkg.image}
                      alt={`${pkg.name} DJ show setup`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                    {/* Gradient overlay bottom of photo */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(10,15,21,0) 40%, rgba(10,15,21,0.88) 100%)",
                      }}
                    />
                    {/* Package name badge top-right */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: `linear-gradient(135deg, ${pkg.color}cc, ${pkg.color}88)`,
                        color: "#fff",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        padding: "0.2rem 0.7rem",
                        borderRadius: "100px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {pkg.name} SHOW
                    </div>
                    {/* Package title bottom of photo */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.2em",
                          color: pkg.color,
                          textTransform: "uppercase",
                          marginBottom: "2px",
                        }}
                      >
                        {pkg.tagline}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: "1.6rem",
                          letterSpacing: "0.08em",
                          color: "#f0f4f8",
                          lineHeight: 1,
                        }}
                      >
                        {pkg.name}
                      </div>
                    </div>
                  </div>

                  {/* Key highlights — fills bottom half */}
                  <div
                    style={{
                      flex: 1,
                      padding: "1.1rem 1.25rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Price row */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: `1px solid ${pkg.color}22` }}>
                      <span style={{ fontFamily: "'Champagne & Limousines', serif", fontSize: "1.35rem", fontWeight: 700, color: pkg.highlight ? "#00c8ff" : pkg.color, letterSpacing: "0.04em", textShadow: `0 0 14px ${pkg.color}66` }}>
                        {pkg.price}
                      </span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "rgba(240,244,248,0.4)" }}>incl. btw</span>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", color: `${pkg.color}88`, marginLeft: "auto", letterSpacing: "0.05em" }}>{pkg.duration}</span>
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {pkg.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                            marginBottom: idx < pkg.highlights.length - 1 ? "0.6rem" : 0,
                          }}
                        >
                          <span style={{ fontSize: "0.9rem", lineHeight: 1.4, flexShrink: 0, marginTop: "1px" }}>
                            {h.icon}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "0.82rem",
                              color: "rgba(240,244,248,0.85)",
                              lineHeight: 1.45,
                            }}
                          >
                            {h.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover hint */}
                    <div
                      style={{
                        marginTop: "0.75rem",
                        textAlign: "center",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.7rem",
                        color: `${pkg.color}99`,
                        letterSpacing: "0.08em",
                      }}
                    >
                      ↕ Hover voor alle details
                    </div>
                  </div>
                </div>

                {/* ── BACK FACE ── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: pkg.highlight
                      ? "linear-gradient(160deg, rgba(0,200,255,0.12), rgba(0,144,255,0.07), rgba(8,12,20,0.97))"
                      : "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(8,12,20,0.97))",
                    border: `1px solid ${pkg.highlight ? "rgba(0,200,255,0.40)" : `${pkg.color}33`}`,
                    boxShadow: `0 0 40px ${pkg.color}22, 0 8px 32px rgba(0,0,0,0.5)`,
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.5rem",
                  }}
                >
                  {/* Back header */}
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{pkg.icon}</div>
                    <h3
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.5rem",
                        letterSpacing: "0.08em",
                        color: "#f0f4f8",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: pkg.color,
                        }}
                      >
                        {pkg.price}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.75rem",
                          color: "rgba(240,244,248,0.4)",
                          padding: "0.15rem 0.5rem",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "100px",
                        }}
                      >
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      flex: 1,
                      overflowY: "auto",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          marginBottom: "0.45rem",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: `${pkg.color}22`,
                            border: `1px solid ${pkg.color}66`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          <Check size={9} color={pkg.color} />
                        </div>
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "0.8rem",
                            color: "rgba(240,244,248,0.75)",
                            lineHeight: 1.45,
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Ideal for */}
                  <div
                    style={{
                      marginBottom: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "8px",
                      background: `${pkg.color}0d`,
                      border: `1px solid ${pkg.color}22`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.75rem",
                        color: pkg.color,
                        lineHeight: 1.4,
                        margin: 0,
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
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.85rem",
                      letterSpacing: "0.15em",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      background: pkg.highlight
                        ? "linear-gradient(135deg, #00c8ff, #0090ff)"
                        : `linear-gradient(135deg, ${pkg.color}33, ${pkg.color}11)`,
                      color: pkg.highlight ? "#080c10" : pkg.color,
                      border: pkg.highlight ? "none" : `1px solid ${pkg.color}66`,
                    }}
                  >
                    OFFERTE AANVRAGEN
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
        <div
          className="mt-20 sv-fade-up"
          style={{
            background: "linear-gradient(135deg, rgba(20,0,60,0.85) 0%, rgba(0,10,40,0.90) 100%)",
            border: "1px solid rgba(0,200,255,0.18)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(0,200,255,0.06), 0 0 120px rgba(115,0,255,0.04)",
          }}
        >
          {/* Table header */}
          <div
            style={{
              padding: "2rem 2rem 1.25rem",
              textAlign: "center",
              borderBottom: "1px solid rgba(0,200,255,0.12)",
            }}
          >
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(0,200,255,0.6)",
                marginBottom: "0.5rem",
              }}
            >
              Overzicht
            </p>
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                letterSpacing: "0.08em",
                color: "#f0f4f8",
                margin: 0,
              }}
            >
              PAKKET{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                VERGELIJKING
              </span>
            </h3>
          </div>

          {/* Responsive table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "1.25rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,244,248,0.4)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      width: "30%",
                    }}
                  >
                    Kenmerk
                  </th>
                  {[
                    { name: "INTIEM", color: "#0090ff", price: "v.a. €495,-", highlight: false },
                    { name: "LUXE", color: "#00c8ff", price: "v.a. €650,-", highlight: true },
                    { name: "ELITE", color: "#ff5500", price: "v.a. €895,-", highlight: false },
                  ].map((col) => (
                    <th
                      key={col.name}
                      style={{
                        padding: "1.25rem 1rem",
                        textAlign: "center",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        borderLeft: `1px solid ${col.color}22`,
                        background: col.highlight
                          ? "rgba(0,200,255,0.06)"
                          : "transparent",
                        position: "relative",
                        width: "23.3%",
                      }}
                    >
                      {col.highlight && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background: "linear-gradient(90deg, #00c8ff, #0090ff)",
                            boxShadow: "0 0 12px rgba(0,200,255,0.6)",
                          }}
                        />
                      )}
                      <div
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: "1.1rem",
                          letterSpacing: "0.12em",
                          color: col.color,
                          textShadow: `0 0 12px ${col.color}66`,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {col.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(240,244,248,0.75)",
                          fontWeight: 600,
                        }}
                      >
                        {col.price}
                      </div>
                      {col.highlight && (
                        <div
                          style={{
                            display: "inline-block",
                            marginTop: "0.4rem",
                            padding: "0.15rem 0.6rem",
                            borderRadius: "999px",
                            background: "rgba(0,200,255,0.15)",
                            border: "1px solid rgba(0,200,255,0.4)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.12em",
                            color: "#00c8ff",
                            textTransform: "uppercase",
                          }}
                        >
                          Meest gekozen
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Capaciteit",
                    intiem: "50 – 100 pers.",
                    luxe: "100 – 200 pers.",
                    elite: "200+ pers.",
                  },
                  {
                    feature: "Duur",
                    intiem: "4 uur",
                    luxe: "4 uur",
                    elite: "5 uur min.",
                  },
                  {
                    feature: "Vermogen geluid",
                    intiem: "1.500 W",
                    luxe: "3.000 W (QSC)",
                    elite: "6.000 W (QSC)",
                  },
                  {
                    feature: "Speakers",
                    intiem: "2× actief",
                    luxe: "4× actief",
                    elite: "6× actief + sub",
                  },
                  {
                    feature: "DJ Setup",
                    intiem: "Pioneer XDJ-AZ",
                    luxe: "Pioneer CDJ",
                    elite: "Pioneer CDJ-3000",
                  },
                  {
                    feature: "LED DJ Booth",
                    intiem: "✓",
                    luxe: "✓",
                    elite: "✓",
                  },
                  {
                    feature: "PAR spots",
                    intiem: "4× RGB",
                    luxe: "8× RGB",
                    elite: "8× RGB",
                  },
                  {
                    feature: "Moving heads",
                    intiem: "2× mini",
                    luxe: "2× mini + 2× groot",
                    elite: "2× mini + 4× groot",
                  },
                  {
                    feature: "Rookmachine",
                    intiem: "—",
                    luxe: "✓",
                    elite: "✓ + LED-rook",
                  },
                  {
                    feature: "Microfoons",
                    intiem: "1× draadloos",
                    luxe: "2× draadloos",
                    elite: "4× draadloos",
                  },
                  {
                    feature: "Voorbesprekingen",
                    intiem: "1×",
                    luxe: "Uitgebreid",
                    elite: "Meerdere",
                  },
                  {
                    feature: "Extra uur",
                    intiem: "€100,-",
                    luxe: "€100,-",
                    elite: "+1u gratis",
                  },
                ].map((row, ri) => (
                  <tr
                    key={row.feature}
                    style={{
                      background: ri % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.85rem 1.5rem",
                        fontSize: "0.85rem",
                        color: "rgba(240,244,248,0.55)",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontWeight: 500,
                      }}
                    >
                      {row.feature}
                    </td>
                    {[
                      { val: row.intiem, color: "#0090ff", highlight: false },
                      { val: row.luxe,   color: "#00c8ff", highlight: true },
                      { val: row.elite,  color: "#ff5500", highlight: false },
                    ].map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: "0.85rem 1rem",
                          textAlign: "center",
                          fontSize: "0.85rem",
                          color: cell.val === "—" ? "rgba(240,244,248,0.2)" : cell.val === "✓" ? cell.color : "rgba(240,244,248,0.8)",
                          fontWeight: cell.val === "✓" ? 700 : 400,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          borderLeft: `1px solid ${cell.color}18`,
                          background: cell.highlight ? "rgba(0,200,255,0.03)" : "transparent",
                          textShadow: cell.val === "✓" ? `0 0 8px ${cell.color}88` : "none",
                        }}
                      >
                        {cell.val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "30% 23.3% 23.3% 23.3%",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "1.25rem 0",
            }}
          >
            <div
              style={{
                padding: "0 1.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240,244,248,0.35)",
                  letterSpacing: "0.08em",
                }}
              >
                Vrijblijvende offerte
              </span>
            </div>
            {[
              { name: "INTIEM", color: "#0090ff", highlight: false },
              { name: "LUXE",   color: "#00c8ff", highlight: true },
              { name: "ELITE",  color: "#ff5500", highlight: false },
            ].map((col) => (
              <div
                key={col.name}
                style={{
                  padding: "0 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: `1px solid ${col.color}22`,
                  background: col.highlight ? "rgba(0,200,255,0.03)" : "transparent",
                }}
              >
                <button
                  onClick={handleContact}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "8px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: col.highlight
                      ? "linear-gradient(135deg, #00c8ff, #0090ff)"
                      : `linear-gradient(135deg, ${col.color}33, ${col.color}11)`,
                    color: col.highlight ? "#080c10" : col.color,
                    border: col.highlight ? "none" : `1px solid ${col.color}66`,
                    boxShadow: col.highlight ? "0 0 20px rgba(0,200,255,0.3)" : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  AANVRAGEN
                </button>
              </div>
            ))}
          </div>
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
