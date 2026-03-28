/**
 * SoundVision Events — Add-ons Section
 * Optional extras to enhance any show package
 */

const addons = [
  {
    icon: "🎤",
    title: "Extra Microfoon",
    description: "Draadloze microfoon voor speeches, zang of presentatie door gasten.",
    category: "Audio",
  },
  {
    icon: "💨",
    title: "CO2 Jets",
    description: "Spectaculaire CO2 jets voor een explosief effect op het hoogtepunt van de avond.",
    category: "Effecten",
  },
  {
    icon: "🎊",
    title: "Confetti Kanon",
    description: "Kleurrijke confetti explosie voor een feestelijk moment — perfect voor de eerste dans of een verrassing.",
    category: "Effecten",
  },
  {
    icon: "💡",
    title: "Extra Moving Heads",
    description: "Aanvullende moving head spots voor een nog indrukwekkendere lichtshow.",
    category: "Licht",
  },
  {
    icon: "🔴",
    title: "Laser Show",
    description: "Professionele lasershow die de ruimte vult met kleurrijke lichtstralen.",
    category: "Licht",
  },
  {
    icon: "📺",
    title: "LED Scherm / Backdrop",
    description: "LED backdrop of scherm voor visuele content, foto's of video's tijdens uw feest.",
    category: "Visueel",
  },
  {
    icon: "📸",
    title: "Fotobooth",
    description: "Interactieve fotobooth met rekwisieten voor leuke herinneringen voor uw gasten.",
    category: "Entertainment",
  },
  {
    icon: "🎸",
    title: "Live Muzikant",
    description: "Combinatie van live muzikant (saxofoon, gitaar, etc.) met DJ set voor een unieke ervaring.",
    category: "Muziek",
  },
  {
    icon: "🎙️",
    title: "MC Service",
    description: "Professionele MC/presentator voor aankondigingen, spelletjes en het leiden van het programma.",
    category: "Entertainment",
  },
  {
    icon: "🚗",
    title: "Reiskosten",
    description: "Reiskosten buiten de regio — vraag naar de tarieven voor uw locatie.",
    category: "Logistiek",
  },
  {
    icon: "⏰",
    title: "Extra Uren",
    description: "Verleng uw show met extra uren. Beschikbaar voor alle pakketten.",
    category: "Tijd",
  },
  {
    icon: "🎵",
    title: "Persoonlijk Intro",
    description: "Een speciaal gemixte intro voor het bruidspaar, verjaardagskind of bedrijf.",
    category: "Muziek",
  },
];

const categoryColors: Record<string, string> = {
  Audio: "#00c8ff",
  Effecten: "#ff5500",
  Licht: "#ffaa00",
  Visueel: "#aa44ff",
  Entertainment: "#00ff88",
  Muziek: "#ff4488",
  Logistiek: "#aaaaaa",
  Tijd: "#44aaff",
};

export default function AddOnsSection() {
  return (
    <section
      id="addons"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#080c10" }}
    >
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(255, 85, 0, 0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 sv-fade-up">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#ff5500",
              textTransform: "uppercase",
            }}
          >
            Uitbreidingen
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.05,
              color: "#f0f4f8",
            }}
          >
            MAAK UW SHOW
            <span
              style={{
                background: "linear-gradient(135deg, #ff5500, #ffaa00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}NOG GROTER
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
            Combineer elk pakket met één of meerdere add-ons voor een volledig gepersonaliseerde show-ervaring. Alle prijzen op aanvraag.
          </p>
        </div>

        {/* Add-ons grid — 4 columns on large */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* Add-on cards */}
          {addons.map((addon, i) => {
            const color = categoryColors[addon.category] || "#00c8ff";
            return (
              <div
                key={addon.title}
                className="sv-fade-up group rounded-xl p-5"
                style={{
                  animationDelay: `${(i % 4) * 0.1}s`,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}0d`;
                  e.currentTarget.style.borderColor = `${color}33`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Category badge */}
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontSize: "1.75rem" }}>{addon.icon}</span>
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: color,
                      padding: "0.2rem 0.5rem",
                      border: `1px solid ${color}44`,
                      borderRadius: "100px",
                      textTransform: "uppercase",
                    }}
                  >
                    {addon.category}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#f0f4f8",
                    marginBottom: "0.5rem",
                  }}
                >
                  {addon.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(240, 244, 248, 0.55)",
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  {addon.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sv-fade-up">
          <p
            className="mb-4"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "rgba(240, 244, 248, 0.6)",
            }}
          >
            Wilt u een specifieke add-on combineren met uw pakket?
          </p>
          <button
            className="sv-btn-amber"
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Vraag Naar Mogelijkheden
          </button>
        </div>
      </div>
    </section>
  );
}
