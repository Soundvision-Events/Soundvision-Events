/**
 * SoundVision Events — Pakketten & Add-ons Section
 * Packages: Intiem (4h), Luxe (4h), Elite (5h min)
 * Add-ons as flip cards: Extra Uurtarief, Rookmachine, Openingsdans Mix, Lasershow, Uplights
 */
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

// ── Brand colours
const GLOW_BLUE = "#7eb3ff";
const GLOW_PURPLE = "#6040e0";
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
    duration: "4 uur",
    extraHour: "€100 / extra uur",
    highlight: false,
    photoLabel: "Intiem DJ Setup",
    photoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/show-intimate_1e8d3f11.jpg",
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
    duration: "4 uur",
    extraHour: "€100 / extra uur",
    highlight: true,
    photoLabel: "Luxe DJ Setup",
    photoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/show-luxe_ab77481b.jpg",
    features: [
      "Professionele DJ setup (Pioneer CDJ)",
      "Muziek volledig op maat",
      "2x draadloze microfoons",
      "4x actieve speakers (3000W totaal)",
      "Uitgebreide lichtshow (moving heads + PAR)",
      "Uplights inbegrepen",
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
    duration: "5 uur (minimaal)",
    extraHour: "€100 / extra uur",
    highlight: false,
    photoLabel: "Elite DJ Setup",
    photoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/show-elite_c781eb31.png",
    features: [
      "Professionele DJ setup (Pioneer CDJ-3000)",
      "Volledig gepersonaliseerde muziekervaring",
      "4x draadloze microfoons",
      "6x actieve speakers + subwoofers (6000W)",
      "Volledige lichtshow (moving heads + PAR)",
      "Lasershow inbegrepen",
      "Uplights inbegrepen",
      "Opbouw & afbouw inbegrepen",
      "Meerdere voorbesprekingen",
      "Muziekwensen + persoonlijke intro + surprises",
    ],
    ideal: "Ideaal voor: Grote bruiloften, grote bedrijfsevents, festivals",
  },
];

// ── 5 real add-ons with front/back flip card content
// includedIn: packages where this add-on is already included (shown as 'inbegrepen' badge, greyed out)
const addons = [
  {
    icon: "⏱️",
    title: "Extra Uurtarief",
    subtitle: "€100 per uur",
    price: "€100 / uur",
    accentColor: GLOW_BLUE,
    includedIn: [] as string[],
    front: "Verleng uw show naar wens. Geldt voor alle pakketten — de feestsfeer hoeft niet te stoppen.",
    backTitle: "Hoe werkt het?",
    backPoints: [
      "Standaard Intiem & Luxe: 4 uur",
      "Standaard Elite: 5 uur minimaal",
      "Elk extra uur: €100 (excl. BTW)",
      "Vooraf afstemmen in overleg",
      "Flexibel bij te boeken op de avond zelf",
    ],
    backNote: "Van toepassing op alle shows",
  },
  {
    icon: "🌫️",
    title: "Laaghangende Rookmachine",
    subtitle: "IJseffect",
    price: "€75",
    accentColor: "#88ccff",
    includedIn: [] as string[],
    front: "Een spectaculair laaghangende mist die over de dansvloer zweeft — het ultieme ijseffect voor onvergetelijke momenten.",
    backTitle: "Perfect voor",
    backPoints: [
      "Openingsdans op bruiloften",
      "Prachtige fotografie- en video-effecten",
      "Halloween en themafeesten",
      "Dramatische entree van het bruidspaar",
      "Elke gelegenheid die magie verdient",
    ],
    backNote: "Populair effect voor bruiloftsfeesten",
  },
  {
    icon: "🎵",
    title: "Openingsdans Mix",
    subtitle: "Mashup op maat",
    price: "Op aanvraag",
    accentColor: "#ff4488",
    includedIn: [] as string[],
    front: "Een professioneel gemixt mashup van 2 tot 4 nummers — speciaal samengesteld voor uw openingsdans.",
    backTitle: "Wat krijgt u?",
    backPoints: [
      "Mix van 2 tot 4 nummers naar keuze",
      "Professioneel gemixt en gemastered",
      "Vooraf toegestuurd om te oefenen",
      "Afgestemd op uw dansstijl en routine",
      "Exclusief voor uw feest gemaakt",
    ],
    backNote: "Voornamelijk voor bruiloftsfeesten",
  },
  {
    icon: "🔴",
    title: "Lasershow",
    subtitle: "RGB Full-Color",
    price: "€75",
    accentColor: "#ff2244",
    includedIn: ["elite"] as string[],
    front: "Een professionele RGB lasershow die de ruimte vult met kleurrijke lichtstralen en prachtige 3D-animaties.",
    backTitle: "Technische details",
    backPoints: [
      "RGB full-color lasers (rood, groen, blauw)",
      "Gecombineerd met prachtige animaties",
      "3D-effecten gecreëerd in de ruimte",
      "Gesynchroniseerd op de muziek",
      "Veilig gecertificeerd voor publiek",
    ],
    backNote: "Inbegrepen bij Elite · €75 bij andere shows",
  },
  {
    icon: "💡",
    title: "Uplights",
    subtitle: "360° Sfeerverlichting",
    price: "€75",
    accentColor: "#ffaa00",
    includedIn: ["luxe", "elite"] as string[],
    front: "Sfeervolle uplights die de wanden en zaal in kleur zetten — transformeer elke locatie naar uw gewenste sfeer.",
    backTitle: "Toepassingen",
    backPoints: [
      "360° verlichting van de zaal/locatie",
      "Kleur aanpasbaar aan uw thema",
      "Ideaal voor bruiloften en gala's",
      "Professionele positionering inbegrepen",
      "Draadloos en dimbaar",
    ],
    backNote: "Inbegrepen bij Luxe & Elite · €75 bij Intiem",
  },
];

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
        {/* ── FRONT: Photo ── */}
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
          <div style={{ width: "100%", aspectRatio: "1 / 1", maxHeight: "55%", borderBottom: `1px solid ${GLOW_BLUE}33`, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <img
              src={pkg.photoUrl}
              alt={pkg.photoLabel}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${GLOW_PURPLE}44 100%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", background: `rgba(0,0,0,0.65)`, border: `1px solid ${GLOW_BLUE}66`, borderRadius: "999px", padding: "4px 14px", backdropFilter: "blur(6px)" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", margin: 0 }}>{pkg.photoLabel}</p>
            </div>
          </div>

          <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                {pkg.tagline}
              </p>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.08em", color: "#f0f4f8", lineHeight: 1, textShadow: `0 0 20px ${GLOW_BLUE}55` }}>
                {pkg.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.55)" }}>
                  ⏱ {pkg.duration}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: GLOW_BLUE, background: `${GLOW_BLUE}15`, border: `1px solid ${GLOW_BLUE}33`, borderRadius: "100px", padding: "2px 8px" }}>
                  {pkg.extraHour}
                </span>
              </div>
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginTop: "0.75rem" }}>
              Zweef voor details →
            </p>
          </div>

          {hovered && (
            <div style={{ position: "absolute", inset: "-2px", borderRadius: "1.6rem", background: `radial-gradient(ellipse at 50% 0%, ${GLOW_BLUE}18 0%, transparent 70%)`, pointerEvents: "none", zIndex: -1 }} />
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
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", marginBottom: "0.25rem" }}>
              {pkg.tagline}
            </p>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.08em", color: "#f0f4f8", lineHeight: 1, textShadow: `0 0 16px ${GLOW_BLUE}66` }}>
              {pkg.name}
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "rgba(240,244,248,0.55)" }}>⏱ {pkg.duration}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: GLOW_BLUE }}>· {pkg.extraHour}</span>
            </div>
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${GLOW_PURPLE}, ${GLOW_BLUE}, transparent)`, marginTop: "0.75rem", boxShadow: `0 0 8px ${GLOW_BLUE}44` }} />
          </div>

          <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", overflow: "hidden" }}>
            {pkg.features.map((feature) => (
              <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, marginTop: "1px", background: `${GLOW_BLUE}18`, border: `1px solid ${GLOW_BLUE}55`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={9} color={GLOW_BLUE} />
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.8)", lineHeight: 1.4 }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.9rem", borderRadius: "8px", background: `${GLOW_BLUE}0d`, border: `1px solid ${GLOW_BLUE}22` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: GLOW_BLUE, lineHeight: 1.4 }}>
              {pkg.ideal}
            </p>
          </div>

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

          <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${GLOW_PURPLE}, ${GLOW_BLUE}, transparent)`, borderRadius: "999px", marginTop: "0.75rem", boxShadow: `0 0 8px ${GLOW_BLUE}44` }} />
        </div>
      </div>
    </div>
  );
}

// ── Vibrant purple-blue-cyan palette (reference: IMG_0652)
// Background: deep purple #2a0060 → card gradient: mid-blue #4a5af0 → cyan #00d4ff
const NEON_FRONT_BG = "linear-gradient(145deg, #1e0055 0%, #2d1a8a 45%, #1a2a9a 100%)";
const NEON_BACK_BG = "linear-gradient(145deg, #160040 0%, #261570 50%, #1530a0 100%)";
const NEON_BORDER = "2px solid rgba(100,120,255,0.60)";
const NEON_BORDER_HOVER = "2px solid #7b8fff";
const NEON_SHADOW = "0 0 18px rgba(90,100,255,0.35), 0 0 50px rgba(60,0,180,0.20), inset 0 1px 0 rgba(120,140,255,0.12)";
const NEON_SHADOW_HOVER = "0 0 30px rgba(100,130,255,0.75), 0 0 70px rgba(80,0,220,0.40), 0 0 120px rgba(0,200,255,0.20), inset 0 1px 0 rgba(150,170,255,0.18)";
const NEON_CYAN = "#7eb3ff";
const NEON_CYAN_DIM = "rgba(126,179,255,0.55)";
const NEON_CHECK_BG = "rgba(100,130,255,0.15)";
const NEON_CHECK_BORDER = "rgba(120,150,255,0.50)";

// ── Add-on flip card  (compact front: icon + title + price | full detail on back)
function AddonFlipCard({ addon, index }: { addon: typeof addons[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, opacity, translateY } = useScrollFade(0.05);

  return (
    <div
      ref={ref}
      style={{
        perspective: "1000px",
        height: "220px",
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
      onMouseEnter={() => { setFlipped(true); setHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setHovered(false); }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT: compact — icon + title + price + badges ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: NEON_FRONT_BG,
            border: hovered ? NEON_BORDER_HOVER : NEON_BORDER,
            borderRadius: "1.25rem",
            boxShadow: hovered ? NEON_SHADOW_HOVER : NEON_SHADOW,
            padding: "1.25rem 1.25rem 1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            transition: "box-shadow 0.4s ease, border 0.4s ease",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Neon top edge glow */}
          <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: `linear-gradient(90deg, transparent, ${NEON_CYAN}, transparent)`, borderRadius: "999px", boxShadow: `0 0 8px ${NEON_CYAN}` }} />

          {/* Icon + subtitle row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "2rem", filter: `drop-shadow(0 0 10px ${NEON_CYAN}88)`, lineHeight: 1 }}>{addon.icon}</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: NEON_CYAN, padding: "0.2rem 0.6rem", border: `1px solid ${NEON_CYAN_DIM}`, borderRadius: "100px", textTransform: "uppercase", background: "rgba(0,200,255,0.08)" }}>
              {addon.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.35rem", letterSpacing: "0.06em", color: "#e8f8ff", margin: "0.5rem 0 0", textShadow: `0 0 18px ${NEON_CYAN}55, 0 2px 4px rgba(0,0,0,0.9)`, lineHeight: 1.1 }}>
            {addon.title}
          </h3>

          {/* Inbegrepen badges */}
          {addon.includedIn.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.45rem" }}>
              {addon.includedIn.map((pkg) => (
                <span key={pkg} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#0a2e00", background: "linear-gradient(135deg, #7fff4f, #5fdd2a)", border: "1px solid #5fdd2a", borderRadius: "100px", padding: "0.15rem 0.55rem", boxShadow: "0 0 8px rgba(95,221,42,0.50)" }}>
                  <span>✓</span>{`Inbegrepen bij ${pkg.charAt(0).toUpperCase() + pkg.slice(1)}`}
                </span>
              ))}
            </div>
          )}

          {/* Price + hint */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", letterSpacing: "0.08em", color: NEON_CYAN, textShadow: `0 0 10px ${NEON_CYAN}99` }}>
              {addon.price}
            </span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: NEON_CYAN_DIM, textTransform: "uppercase" }}>
              Zweef →
            </span>
          </div>
        </div>

        {/* ── BACK: full detail ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: NEON_BACK_BG,
            border: NEON_BORDER_HOVER,
            borderRadius: "1.25rem",
            boxShadow: NEON_SHADOW_HOVER,
            padding: "1.1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Neon top edge */}
          <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: `linear-gradient(90deg, transparent, ${NEON_CYAN}, transparent)`, borderRadius: "999px", boxShadow: `0 0 8px ${NEON_CYAN}` }} />

          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.1rem" }}>{addon.icon}</span>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.06em", color: "#e8f8ff", margin: 0, textShadow: `0 0 12px ${NEON_CYAN}66` }}>
                {addon.backTitle}
              </h3>
            </div>
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${NEON_CYAN}, transparent)`, marginTop: "0.4rem", boxShadow: `0 0 5px ${NEON_CYAN}55` }} />
          </div>

          <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {addon.backPoints.map((point) => (
              <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem" }}>
                <div style={{ width: "13px", height: "13px", borderRadius: "50%", flexShrink: 0, marginTop: "2px", background: NEON_CHECK_BG, border: `1px solid ${NEON_CHECK_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={7} color={NEON_CYAN} />
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.74rem", color: "rgba(220,240,255,0.88)", lineHeight: 1.35 }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "0.5rem", padding: "0.4rem 0.65rem", borderRadius: "8px", background: "rgba(0,200,255,0.07)", border: `1px solid ${NEON_CYAN_DIM}` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", color: NEON_CYAN, lineHeight: 1.4, margin: 0 }}>
              {addon.backNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UitbreidingenSection({ showOpeningsdansMix = false }: { showOpeningsdansMix?: boolean }) {
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

        {/* ── ADD-ONS TITLE ── */}
        <div style={{ margin: "5rem 0 2.5rem", position: "relative", textAlign: "center" }}>
          {/* Neon divider line */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, #00c8ff44, #00c8ff88, #00c8ff44, transparent)`, boxShadow: "0 0 8px rgba(0,200,255,0.35)" }} />
          {/* Title badge */}
          <span style={{
            position: "relative",
            display: "inline-block",
            background: "#080c10",
            padding: "0 2rem",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            letterSpacing: "0.12em",
            color: "#00c8ff",
            textTransform: "uppercase",
            textShadow: "0 0 24px rgba(0,200,255,0.80), 0 0 60px rgba(0,200,255,0.35), 0 2px 4px rgba(0,0,0,0.9)",
          }}>
            Add-ons &amp; Extras
          </span>
        </div>

        {/* ── ADD-ONS FLIP CARDS ── */}
        <div
          ref={addonsFade.ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            opacity: addonsFade.opacity,
            transform: `translateY(${addonsFade.translateY}px)`,
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {addons
            .filter((addon) => addon.title !== "Openingsdans Mix" || showOpeningsdansMix)
            .map((addon, i) => (
              <AddonFlipCard key={addon.title} addon={addon} index={i} />
            ))}
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

      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 18px ${GLOW_BLUE}22, 0 0 40px ${GLOW_PURPLE}11; }
          50% { box-shadow: 0 0 28px ${GLOW_BLUE}44, 0 0 60px ${GLOW_PURPLE}22; }
        }
      `}</style>
    </section>
  );
}
