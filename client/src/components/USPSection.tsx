/**
 * SoundVision Events — USP Section
 * 4 core selling points displayed as neon-glowing flip cards.
 * Accepts optional `theme` prop to apply per-page color palette.
 */
import { useState } from "react";
import { type PageTheme, DEFAULT_THEME } from "@/lib/pageThemes";

interface USPCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const USPS: USPCard[] = [
  {
    icon: <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>🤝</span>,
    title: "Persoonlijk Contact",
    subtitle: "Direct met de DJ",
    description:
      "U spreekt altijd rechtstreeks met DJ Tonicity — geen callcenters, geen tussenpersonen. Duidelijke communicatie en volledige afstemming op uw wensen.",
  },
  {
    icon: <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>✨</span>,
    title: "DJ Shows op Maat",
    subtitle: "Uw feest, uw regels",
    description:
      "Geluid, licht en muziek volledig afgestemd op uw locatie, gasten en gewenste sfeer. Elk feest is uniek — de show ook.",
  },
  {
    icon: <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>🎵</span>,
    title: "Ervaren Allround DJ",
    subtitle: "Crowd-reading pro",
    description:
      "Jarenlange ervaring op bruiloften, bedrijfsfeesten en studentenfeesten. DJ Tonicity leest de zaal en zorgt voor maximale energie op het juiste moment.",
  },
  {
    icon: <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>🎛️</span>,
    title: "Geen Boekingsbureaus",
    subtitle: "Direct & transparant",
    description:
      "Geen extra kosten, geen omwegen. U boekt rechtstreeks bij SoundVision Events — sneller schakelen, eerlijkere prijs, persoonlijker resultaat.",
  },
];

function FlipCard({ card, index, theme }: { card: USPCard; index: number; theme: PageTheme }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative sv-fade-up"
      style={{ perspective: "1000px", height: "clamp(240px, 30vw, 280px)", minHeight: "240px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchEnd={(e) => { e.preventDefault(); setFlipped(f => !f); }}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
      role="button"
      aria-label={card.title}
    >
      <div
        style={{
          position: "absolute", inset: 0, transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: theme.cardGradient,
            border: `1.5px solid ${theme.accent}66`,
            borderRadius: "1.5rem",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "1.25rem", padding: "2rem",
            boxShadow: `0 0 18px ${theme.glowSubtle}, 0 0 40px ${theme.glowSubtle}, inset 0 1px 0 ${theme.accentSoft}18`,
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.accent}18 0%, transparent 70%)`,
              border: `1.5px solid ${theme.accent}66`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: theme.accentSoft,
              boxShadow: `0 0 20px ${theme.glow}, 0 0 40px ${theme.glow}`,
              animation: "neonPulse 2.5s ease-in-out infinite",
            }}
          >
            {card.icon}
          </div>

          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "'Cinzel', serif", fontSize: "1.1rem",
                letterSpacing: "0.06em", color: "#f0f4f8", marginBottom: "0.25rem",
                textShadow: `0 0 12px ${theme.accent}88`,
              }}
            >
              {card.title}
            </h3>
            <p style={{ fontSize: "0.75rem", color: theme.accent, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>
              {card.subtitle}
            </p>
          </div>

          <p style={{ fontSize: "0.65rem", color: "#ffffff33", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Zweef / tik voor meer ▸
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: theme.cardGradient,
            border: `2px solid ${theme.accent}`,
            borderRadius: "1.5rem",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "1rem", padding: "2rem",
            boxShadow: `0 0 32px ${theme.glow}, 0 0 70px ${theme.glowSubtle}, 0 0 120px ${theme.glowSubtle}`,
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', serif", fontSize: "2.2rem", lineHeight: 1,
              color: theme.accentSoft, textShadow: `0 0 20px ${theme.accent}, 0 0 40px ${theme.accent}88`,
              opacity: 0.25, position: "absolute", top: "1rem", right: "1.5rem",
            }}
          >
            0{index + 1}
          </div>

          <h3
            style={{
              fontFamily: "'Cinzel', serif", fontSize: "1.2rem",
              letterSpacing: "0.06em", color: "#f50a87",
              fontWeight: 700,
              textShadow: "0 0 15px rgba(245,10,135,0.7)", textAlign: "center",
            }}
          >
            {card.title}
          </h3>

          <p style={{ fontSize: "0.9rem", color: "#d0d8e4", lineHeight: 1.7, textAlign: "center", fontFamily: "'Outfit', sans-serif" }}>
            {card.description}
          </p>

          <div
            style={{
              height: "2px", width: "60%",
              background: `linear-gradient(90deg, transparent, ${theme.secondary}, ${theme.accent}, transparent)`,
              boxShadow: `0 0 8px ${theme.secondary}, 0 0 16px ${theme.accent}44`,
              borderRadius: "999px", marginTop: "0.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function USPSection({ theme = DEFAULT_THEME }: { theme?: PageTheme }) {
  return (
    <section
      style={{
        padding: "6rem 0", position: "relative", overflow: "hidden",
        paddingTop: "65px", paddingBottom: "53px", marginTop: "0px", marginBottom: "0px",
      }}
    >
      {/* Colour overlay layer — only this layer gets opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#02212c",
          opacity: 0.8,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", opacity: 1, position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "16px", letterSpacing: "0.1em", textTransform: "none",
              color: theme.accent, marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif",
              maxWidth: "700px", margin: "0 auto 0.75rem", lineHeight: 1.6,
            }}
          >
            DJ Tonicity is betrokken bij het totaal plaatje vanaf het eerste intake gesprek. Door professionelle feedback / inzicht m.b.t. uw unieke feest ideeën eerst concreet te maken. Pas dan is de voorbereiding doeltreffend!
          </p>
          <h2
            style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(1.7rem, 4vw, 2.7rem)",
              letterSpacing: "0.05em", color: "#f0f4f8", lineHeight: 1.15,
              textShadow: `0 0 40px ${theme.glowSubtle}`,
              marginBottom: "1.5rem",
            }}
          >
            4 kernwaarden, 1 visie
          </h2>
          {/* 4 kernwaarden pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            {[
              { icon: "🤝", label: "Persoonlijk Contact" },
              { icon: "✨", label: "Shows op Maat" },
              { icon: "🎵", label: "Ervaren Allround DJ" },
              { icon: "🎛️", label: "Geen Boekingsbureaus" },
            ].map((kw) => (
              <div
                key={kw.label}
                className="sv-pill sv-pill-hover"
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: "rgba(0,200,255,0.08)",
                  border: `1px solid ${theme.accent}44`,
                  borderRadius: "999px",
                  padding: "0.35rem 1rem",
                  fontSize: "0.85rem",
                  color: theme.accent,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                <span>{kw.icon}</span>
                <span>{kw.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sv-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {USPS.map((card, i) => (
            <FlipCard key={card.title} card={card} index={i} theme={theme} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 15px var(--glow), 0 0 30px var(--glow); opacity: 1; }
          50% { box-shadow: 0 0 25px var(--glow), 0 0 50px var(--glow); opacity: 0.85; }
        }
        .sv-pill {
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          cursor: default;
        }
        .sv-pill:hover {
          transform: translateY(-3px) scale(1.06);
          background: rgba(0,200,255,0.18) !important;
          box-shadow: 0 0 12px rgba(0,200,255,0.35), 0 4px 16px rgba(0,0,0,0.3);
          border-color: rgba(0,200,255,0.8) !important;
        }
      `}</style>
    </section>
  );
}
