/**
 * SoundVision Events — USP Section
 * 4 core selling points displayed as neon-glowing flip cards.
 * Front: large icon + title with neon glow.
 * Back (on hover): description with a pulsing neon border.
 * Layout: horizontal row on desktop, 2×2 grid on mobile.
 */
import { useState } from "react";

interface USPCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  color: string;       // neon accent color
  glowColor: string;   // rgba for box-shadow
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
    color: "#00c8ff",
    glowColor: "rgba(0,200,255,0.35)",
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
    color: "#7c3aed",
    glowColor: "rgba(124,58,237,0.35)",
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
    color: "#ff5500",
    glowColor: "rgba(255,85,0,0.35)",
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
    color: "#00ff88",
    glowColor: "rgba(0,255,136,0.35)",
  },
];

function FlipCard({ card, index }: { card: USPCard; index: number }) {
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
      {/* Card wrapper — rotates on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, rgba(30,10,60,0.30) 0%, rgba(10,20,60,0.30) 100%)",
            border: `1px solid ${card.color}33`,
            borderRadius: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "2rem",
            boxShadow: `0 0 0 1px ${card.color}22, inset 0 1px 0 ${card.color}11`,
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Neon icon circle */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${card.color}18 0%, transparent 70%)`,
              border: `1.5px solid ${card.color}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: card.color,
              boxShadow: `0 0 20px ${card.glowColor}, 0 0 40px ${card.glowColor}`,
              animation: "neonPulse 2.5s ease-in-out infinite",
            }}
          >
            {card.icon}
          </div>

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "0.08em",
                color: "#f0f4f8",
                marginBottom: "0.25rem",
                textShadow: `0 0 12px ${card.color}88`,
              }}
            >
              {card.title}
            </h3>
            <p style={{ fontSize: "0.75rem", color: card.color, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>
              {card.subtitle}
            </p>
          </div>

          {/* Hover hint */}
          <p style={{ fontSize: "0.65rem", color: "#ffffff33", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Zweef voor meer ▸
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${card.color}18 0%, rgba(30,10,60,0.35) 60%)`,
            border: `1.5px solid ${card.color}88`,
            borderRadius: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            boxShadow: `0 0 30px ${card.glowColor}, 0 0 60px ${card.glowColor}`,
            backgroundColor: 'rgba(40,10,80,0.30)',
          }}
        >
          {/* Neon number badge */}
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "3rem",
              lineHeight: 1,
              color: card.color,
              textShadow: `0 0 20px ${card.color}, 0 0 40px ${card.color}88`,
              opacity: 0.25,
              position: "absolute",
              top: "1rem",
              right: "1.5rem",
            }}
          >
            0{index + 1}
          </div>

          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem",
              letterSpacing: "0.08em",
              color: card.color,
              textShadow: `0 0 15px ${card.color}`,
              textAlign: "center",
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: "0.9rem",
              color: "#d0d8e4",
              lineHeight: 1.7,
              textAlign: "center",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {card.description}
          </p>

          {/* Bottom neon line */}
          <div
            style={{
              height: "2px",
              width: "60%",
              background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
              boxShadow: `0 0 8px ${card.color}`,
              borderRadius: "999px",
              marginTop: "0.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function USPSection() {
  return (
    <section
      style={{
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
        paddingTop: '65px',
        paddingBottom: '53px',
        marginTop: '-225px',
      }}
    >
      {/* Subtle background grid — hidden */}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#00c8ff",
              marginBottom: "0.75rem",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Waarom SoundVision Events
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "0.06em",
              color: "#f0f4f8",
              lineHeight: 1.1,
              textShadow: "0 0 40px rgba(0,200,255,0.2)",
            }}
          >
            Ónze Visie, Úw Beleving
          </h2>
        </div>

        {/* 4 Flip Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {USPS.map((card, i) => (
            <FlipCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Neon pulse keyframe */}
      <style>{`
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 15px var(--glow), 0 0 30px var(--glow); opacity: 1; }
          50% { box-shadow: 0 0 25px var(--glow), 0 0 50px var(--glow); opacity: 0.85; }
        }
      `}</style>
    </section>
  );
}
