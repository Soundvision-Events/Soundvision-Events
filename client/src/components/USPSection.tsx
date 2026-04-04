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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Persoonlijk Contact",
    subtitle: "Direct met de DJ",
    description:
      "U spreekt altijd rechtstreeks met DJ Tonicity — geen callcenters, geen tussenpersonen. Duidelijke communicatie en volledige afstemming op uw wensen.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "DJ Shows op Maat",
    subtitle: "Uw feest, uw regels",
    description:
      "Geluid, licht en muziek volledig afgestemd op uw locatie, gasten en gewenste sfeer. Elk feest is uniek — de show ook.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: "Ervaren Allround DJ",
    subtitle: "Crowd-reading pro",
    description:
      "Jarenlange ervaring op bruiloften, bedrijfsfeesten en studentenfeesten. DJ Tonicity leest de zaal en zorgt voor maximale energie op het juiste moment.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
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
      className="relative"
      style={{ perspective: "1000px", height: "280px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
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
            Zweef voor meer ▸
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
              letterSpacing: "0.06em", color: theme.accentSoft,
              textShadow: `0 0 15px ${theme.accent}`, textAlign: "center",
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", opacity: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase",
              color: theme.accent, marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif",
            }}
          >
            Waarom SoundVision Events
          </p>
          <h2
            style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(1.7rem, 4vw, 2.7rem)",
              letterSpacing: "0.05em", color: "#f0f4f8", lineHeight: 1.15,
              textShadow: `0 0 40px ${theme.glowSubtle}`,
            }}
          >
            Ónze Visie, Úw Beleving
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
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
      `}</style>
    </section>
  );
}
