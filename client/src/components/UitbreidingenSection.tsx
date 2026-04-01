/**
 * SoundVision Events — Pakketten & Add-ons Section
 * Redesigned with:
 * - Scroll-triggered transparency fade-in
 * - Equal purple gradient columns, all same colour
 * - Glowing light-blue borders with hover brightness + aura
 * - MEEST GEKOZEN card slightly larger, brought to front (scale + z-index)
 * - Flip-card on hover: front = DJ setup photo placeholder, back = specs
 */
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

// ── Brand colours
const GLOW_BLUE = "#00c8ff";
const GLOW_PURPLE = "#7300ff";
const CARD_BG = "linear-gradient(160deg, #0d0035 0%, #1a0050 50%, #0a0028 100%)";
const CARD_BORDER = `1px solid ${GLOW_BLUE}44`;
const CARD_SHADOW = `0 0 18px ${GLOW_BLUE}22, 0 0 40px ${GLOW_PURPLE}11`;
const CARD_SHADOW_HOVER = `0 0 30px ${GLOW_BLUE}55, 0 0 70px ${GLOW_PURPLE}33, 0 0 120px ${GLOW_BLUE}15`;
const CARD_BORDER_HOVER = `1.5px solid ${GLOW_BLUE}cc`;

const packages = [
  {
    id: "intiem",
    name: "INTIEM",
    tagline: "Compact & Krachtig",
    price: "Op aanvraag",
    duration: "Tot 4 uur",
    highlight: false,
    photoLabel: "Intiem DJ Setup",
    photoIcon: "🎵",
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
  },
  {
    id: "luxe",
    name: "LUXE",
    tagline: "Meest Gekozen",
    price: "Op aanvraag",
    duration: "Tot 6 uur",
    highlight: true,
    photoLabel: "Luxe DJ Setup",
    photoIcon: "🎛️",
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
  },
  {
    id: "elite",
    name: "ELITE",
    tagline: "Spectaculair & Groots",
    price: "Op aanvraag",
    duration: "Tot 8 uur",
    highlight: false,
    photoLabel: "Elite DJ Setup",
    photoIcon: "🚀",
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
  },
];

const addons = [
  { icon: "🎤", title: "Extra Microfoon", description: "Draadloze microfoon voor speeches of zang door gasten.", category: "Audio" },
  { icon: "🔴", title: "Laser Show", description: "Professionele lasershow die de ruimte vult met kleurrijke lichtstralen.", category: "Licht" },
  { icon: "🚗", title: "Reiskosten", description: "Reiskosten buiten de regio — vraag naar de tarieven voor uw locatie.", category: "Logistiek" },
  { icon: "⏰", title: "Extra Uren", description: "Verleng uw show met extra uren. Beschikbaar voor alle pakketten.", category: "Tijd" },
  { icon: "🎵", title: "Persoonlijk Intro", description: "Een speciaal gemixte intro voor het bruidspaar, verjaardagskind of bedrijf.", category: "Muziek" },
];

const categoryColors: Record<string, string> = {
  Audio: GLOW_BLUE,
  Licht: "#ffaa00",
  Muziek: "#ff4488",
  Logistiek: "#aaaaaa",
  Tijd: "#44aaff",
};

// ── Scroll-fade hook
function useScrollFade(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(40);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpacity(1);
          setTranslateY(0);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, opacity, translateY };
}

// ── Package flip card
function PackageFlipCard({ pkg, index, onContact }: {
  pkg: typeof packages[0];
  index: number;
  onContact: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, opacity, translateY } = useScrollFade(0.1);

  const scale = pkg.highlight ? 1.06 : 1;
  const zIndex = pkg.highlight ? 10 : 1;

  return (
    <div
      ref={ref}
      style={{
        perspective: "1200px",
        height: pkg.highlight ? "520px" : "480px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
        zIndex,
        position: "relative",
      }}
      onMouseEnter={() => { setFlipped(true); setHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setHovered(false); }}
    >
      {/* MEEST GEKOZEN badge */}
      {pkg.highlight && (
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 40,
            background: `linear-gradient(135deg, ${GLOW_PURPLE}, ${GLOW_BLUE})`,
            color: "#fff",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            padding: "0.4rem 1.75rem",
            borderRadius: "100px",
            whiteSpace: "nowrap",
            boxShadow: `0 4px 24px ${GLOW_PURPLE}66, 0 0 12px ${GLOW_BLUE}44`,
            pointerEvents: "none",
          }}
        >
          MEEST GEKOZEN
        </div>
      )}

      {/* Card wrapper — rotates on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT: Photo placeholder ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: CARD_BG,
            border: hovered ? CARD_BORDER_HOVER : CARD_BORDER,
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: hovered ? CARD_SHADOW_HOVER : CARD_SHADOW,
            transition: "box-shadow 0.4s ease, border 0.4s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Photo placeholder — square */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              maxHeight: "55%",
              background: `linear-gradient(135deg, ${GLOW_PURPLE}22 0%, #000020 50%, ${GLOW_BLUE}11 100%)`,
              borderBottom: `1px solid ${GLOW_BLUE}33`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* Grid lines for placeholder feel */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(${GLOW_BLUE}08 1px, transparent 1px),
                linear-gradient(90deg, ${GLOW_BLUE}08 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }} />
            {/* Corner brackets */}
            {[["0","0","right","bottom"],["0","auto","right","auto"],["auto","0","auto","bottom"],["auto","auto","auto","auto"]].map(([t,r,b,l], ci) => (
              <div key={ci} style={{
                position: "absolute",
                top: t === "0" ? "12px" : "auto",
                bottom: b === "bottom" ? "12px" : "auto",
                left: l === "auto" ? "auto" : "12px",
                right: r === "right" ? "12px" : "auto",
                width: "20px",
                height: "20px",
                borderTop: (t === "0") ? `2px solid ${GLOW_BLUE}88` : "none",
                borderBottom: (b === "bottom") ? `2px solid ${GLOW_BLUE}88` : "none",
                borderLeft: (l !== "auto") ? `2px solid ${GLOW_BLUE}88` : "none",
                borderRight: (r === "right") ? `2px solid ${GLOW_BLUE}88` : "none",
              }} />
            ))}
            {/* Icon */}
            <div style={{ fontSize: "3.5rem", position: "relative", zIndex: 1, filter: `drop-shadow(0 0 12px ${GLOW_BLUE}88)` }}>
              {pkg.photoIcon}
            </div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: `${GLOW_BLUE}99`,
              textTransform: "uppercase",
              position: "relative",
              zIndex: 1,
            }}>
              {pkg.photoLabel}
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              position: "relative",
              zIndex: 1,
            }}>
              Foto volgt binnenkort
            </p>
          </div>

          {/* Card bottom info */}
          <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                {pkg.tagline}
              </p>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.08em", color: "#f0f4f8", lineHeight: 1, textShadow: `0 0 20px ${GLOW_BLUE}55` }}>
                {pkg.name}
              </h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.45)", marginTop: "0.25rem" }}>
                {pkg.duration}
              </p>
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginTop: "0.75rem" }}>
              Zweef voor details ▸
            </p>
          </div>

          {/* Glow aura on hover */}
          {hovered && (
            <div style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "1.6rem",
              background: `radial-gradient(ellipse at 50% 0%, ${GLOW_BLUE}18 0%, transparent 70%)`,
              pointerEvents: "none",
              zIndex: -1,
            }} />
          )}
        </div>

        {/* ── BACK: Specs ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(160deg, #1a0050 0%, #0d0035 50%, #200060 100%)`,
            border: CARD_BORDER_HOVER,
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: CARD_SHADOW_HOVER,
            display: "flex",
            flexDirection: "column",
            padding: "1.75rem",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", marginBottom: "0.25rem" }}>
              {pkg.tagline}
            </p>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.08em", color: "#f0f4f8", lineHeight: 1, textShadow: `0 0 16px ${GLOW_BLUE}66` }}>
              {pkg.name}
            </h3>
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${GLOW_PURPLE}, ${GLOW_BLUE}, transparent)`, marginTop: "0.75rem", boxShadow: `0 0 8px ${GLOW_BLUE}44` }} />
          </div>

          {/* Features */}
          <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", overflow: "hidden" }}>
            {pkg.features.map((feature) => (
              <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <div style={{
                  width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                  background: `${GLOW_BLUE}18`, border: `1px solid ${GLOW_BLUE}55`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Check size={9} color={GLOW_BLUE} />
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.8)", lineHeight: 1.4 }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Ideal for */}
          <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.9rem", borderRadius: "8px", background: `${GLOW_BLUE}0d`, border: `1px solid ${GLOW_BLUE}22` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: GLOW_BLUE, lineHeight: 1.4 }}>
              {pkg.ideal}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onContact}
            style={{
              marginTop: "0.75rem",
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.95rem",
              letterSpacing: "0.15em",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${GLOW_PURPLE}, ${GLOW_BLUE})`,
              color: "#fff",
              border: "none",
              boxShadow: `0 4px 20px ${GLOW_PURPLE}44`,
              transition: "all 0.3s ease",
            }}
          >
            OFFERTE AANVRAGEN
          </button>

          {/* Bottom neon line */}
          <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${GLOW_PURPLE}, ${GLOW_BLUE}, transparent)`, borderRadius: "999px", marginTop: "0.75rem", boxShadow: `0 0 8px ${GLOW_BLUE}44` }} />
        </div>
      </div>
    </div>
  );
}

export default function UitbreidingenSection() {
  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const headerFade = useScrollFade(0.2);
  const addonsFade = useScrollFade(0.1);

  return (
    <section id="packages" style={{ position: "relative", padding: "6rem 0", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 20%, ${GLOW_PURPLE}0d 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 80%, ${GLOW_BLUE}08 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />

      {/* Decorative watermark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "22vw", color: "rgba(115,0,255,0.025)", letterSpacing: "0.1em", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", zIndex: 0 }}>
        SHOWS
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

        {/* ── SECTION HEADER ── */}
        <div
          ref={headerFade.ref}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: headerFade.opacity,
            transform: `translateY(${headerFade.translateY}px)`,
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: GLOW_BLUE, textTransform: "uppercase" }}>
            Pakketten & Add-ons
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em", lineHeight: 1.05, color: "#f0f4f8", marginTop: "0.75rem", textShadow: `0 0 40px ${GLOW_BLUE}33` }}>
            ALLROUND DJ SHOWS OP MAAT
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.6)", lineHeight: 1.7, fontWeight: 300, maxWidth: "600px", margin: "1rem auto 0" }}>
            Kies uw pakket en breid het uit met add-ons voor een volledig gepersonaliseerde show-ervaring. Alle prijzen op aanvraag — geen verborgen kosten.
          </p>
        </div>

        {/* ── PACKAGES GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            paddingTop: "2rem",
            alignItems: "start",
          }}
        >
          {packages.map((pkg, i) => (
            <PackageFlipCard key={pkg.id} pkg={pkg} index={i} onContact={handleContact} />
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ margin: "5rem 0 3rem", borderTop: `1px solid ${GLOW_BLUE}22`, position: "relative", textAlign: "center" }}>
          <span style={{ position: "relative", top: "-0.75rem", display: "inline-block", background: "#080c10", padding: "0 1.5rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: GLOW_BLUE, textTransform: "uppercase" }}>
            Extra Opties
          </span>
        </div>

        {/* ── ADD-ONS ── */}
        <div
          ref={addonsFade.ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            opacity: addonsFade.opacity,
            transform: `translateY(${addonsFade.translateY}px)`,
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {addons.map((addon, i) => {
            const color = categoryColors[addon.category] || GLOW_BLUE;
            return (
              <AddonCard key={addon.title} addon={addon} color={color} index={i} />
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.6)", marginBottom: "1rem" }}>
            Wilt u een pakket combineren met add-ons? Neem contact op voor een vrijblijvende offerte.
          </p>
          <button
            onClick={handleContact}
            style={{
              padding: "0.875rem 2.5rem",
              borderRadius: "8px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.15em",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${GLOW_PURPLE}, ${GLOW_BLUE})`,
              color: "#fff",
              border: "none",
              boxShadow: `0 4px 24px ${GLOW_PURPLE}44, 0 0 40px ${GLOW_BLUE}22`,
              transition: "all 0.3s ease",
            }}
          >
            Vraag Naar Mogelijkheden
          </button>
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 18px ${GLOW_BLUE}22, 0 0 40px ${GLOW_PURPLE}11; }
          50% { box-shadow: 0 0 28px ${GLOW_BLUE}44, 0 0 60px ${GLOW_PURPLE}22; }
        }
      `}</style>
    </section>
  );
}

function AddonCard({ addon, color, index }: { addon: typeof addons[0]; color: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, opacity, translateY } = useScrollFade(0.05);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1rem",
        padding: "1.25rem",
        background: hovered ? `linear-gradient(135deg, ${GLOW_PURPLE}18, ${GLOW_BLUE}0d)` : CARD_BG,
        border: hovered ? CARD_BORDER_HOVER : CARD_BORDER,
        boxShadow: hovered ? CARD_SHADOW_HOVER : CARD_SHADOW,
        transition: "all 0.35s ease",
        transform: hovered ? `translateY(-5px) translateY(${translateY}px)` : `translateY(${translateY}px)`,
        opacity,
        cursor: "default",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.75rem", filter: hovered ? `drop-shadow(0 0 8px ${color}88)` : "none", transition: "filter 0.3s ease" }}>{addon.icon}</span>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", color, padding: "0.2rem 0.5rem", border: `1px solid ${color}44`, borderRadius: "100px", textTransform: "uppercase" }}>
          {addon.category}
        </span>
      </div>
      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#f0f4f8", marginBottom: "0.4rem" }}>
        {addon.title}
      </h3>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.55)", lineHeight: 1.6, fontWeight: 300 }}>
        {addon.description}
      </p>
    </div>
  );
}
