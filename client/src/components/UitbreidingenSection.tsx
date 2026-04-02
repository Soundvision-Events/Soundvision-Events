/**
 * SoundVision Events — Pakketten & Add-ons Section
 * Packages: Intiem (4h), Luxe (4h), Elite (5h min)
 * Add-ons as flip cards: Extra Uurtarief, Rookmachine, Openingsdans Mix, Lasershow, Uplights
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

// ── Gold sheen constants
const GOLD_FRONT_BG = "linear-gradient(145deg, #2a1a00 0%, #3d2500 20%, #5c3800 40%, #7a4d00 55%, #5c3800 70%, #3d2500 85%, #2a1a00 100%)";
const GOLD_SHEEN = "linear-gradient(105deg, transparent 30%, rgba(255,220,100,0.18) 45%, rgba(255,240,160,0.32) 50%, rgba(255,220,100,0.18) 55%, transparent 70%)";
const GOLD_BACK_BG = "linear-gradient(145deg, #1e1200 0%, #2e1c00 25%, #4a2e00 50%, #2e1c00 75%, #1e1200 100%)";
const GOLD_BORDER = "1.5px solid #c8860a";
const GOLD_BORDER_GLOW = "1.5px solid #f0b030";
const GOLD_SHADOW = "0 4px 24px rgba(180,110,0,0.45), 0 0 40px rgba(200,134,10,0.25), inset 0 1px 0 rgba(255,230,100,0.15)";
const GOLD_SHADOW_HOVER = "0 8px 40px rgba(200,140,0,0.70), 0 0 60px rgba(240,176,48,0.40), 0 0 100px rgba(200,134,10,0.20), inset 0 1px 0 rgba(255,240,120,0.25)";
const GOLD_TEXT = "#f5d97a";
const GOLD_TEXT_DIM = "#c8a040";
const GOLD_CHECK_BG = "rgba(200,134,10,0.20)";
const GOLD_CHECK_BORDER = "rgba(200,134,10,0.60)";

// ── Add-on flip card
function AddonFlipCard({ addon, index }: { addon: typeof addons[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, opacity, translateY } = useScrollFade(0.05);

  return (
    <div
      ref={ref}
      style={{
        perspective: "1000px",
        height: "300px",
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
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: GOLD_FRONT_BG,
            border: hovered ? GOLD_BORDER_GLOW : GOLD_BORDER,
            borderRadius: "1.25rem",
            boxShadow: hovered ? GOLD_SHADOW_HOVER : GOLD_SHADOW,
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            transition: "box-shadow 0.4s ease, border 0.4s ease",
          }}
        >
          {/* Sheen overlay */}
          <div style={{ position: "absolute", inset: 0, background: GOLD_SHEEN, borderRadius: "1.25rem", pointerEvents: "none", transition: "opacity 0.4s ease", opacity: hovered ? 1 : 0.6 }} />
          {/* Top highlight line */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,240,140,0.6), transparent)", borderRadius: "999px" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "2.25rem", filter: "drop-shadow(0 0 12px rgba(255,200,50,0.8))" }}>{addon.icon}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em", color: GOLD_TEXT, padding: "0.25rem 0.75rem", border: "1px solid rgba(200,134,10,0.50)", borderRadius: "100px", textTransform: "uppercase", background: "rgba(200,134,10,0.15)" }}>
                {addon.subtitle}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.06em", color: "#fff8e0", marginBottom: "0.5rem", textShadow: "0 0 20px rgba(255,200,50,0.6), 0 2px 4px rgba(0,0,0,0.8)" }}>
              {addon.title}
            </h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", color: "rgba(245,217,122,0.80)", lineHeight: 1.6, fontWeight: 300 }}>
              {addon.front}
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em", color: "#ffe066", textShadow: "0 0 12px rgba(255,200,50,0.7)" }}>
              {addon.price}
            </span>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: GOLD_TEXT_DIM, textTransform: "uppercase", margin: 0 }}>
              Zweef →
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: GOLD_BACK_BG,
            border: GOLD_BORDER_GLOW,
            borderRadius: "1.25rem",
            boxShadow: GOLD_SHADOW_HOVER,
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Sheen overlay on back */}
          <div style={{ position: "absolute", inset: 0, background: GOLD_SHEEN, borderRadius: "1.25rem", pointerEvents: "none", opacity: 0.5 }} />
          {/* Top highlight */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,240,140,0.7), transparent)", borderRadius: "999px" }} />

          <div style={{ marginBottom: "0.75rem", position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: "1.5rem" }}>{addon.icon}</span>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.06em", color: "#fff8e0", marginTop: "0.25rem", textShadow: "0 0 16px rgba(255,200,50,0.7)" }}>
              {addon.backTitle}
            </h3>
            <div style={{ height: "1px", background: "linear-gradient(90deg, #c8860a, #f0b030, transparent)", marginTop: "0.5rem", boxShadow: "0 0 6px rgba(200,134,10,0.5)" }} />
          </div>

          <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.45rem", position: "relative", zIndex: 1 }}>
            {addon.backPoints.map((point) => (
              <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0, marginTop: "2px", background: GOLD_CHECK_BG, border: `1px solid ${GOLD_CHECK_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={8} color="#f0b030" />
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", color: "rgba(245,217,122,0.90)", lineHeight: 1.4 }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.75rem", borderRadius: "8px", background: "rgba(200,134,10,0.15)", border: "1px solid rgba(200,134,10,0.35)", position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: GOLD_TEXT, lineHeight: 1.4, margin: 0 }}>
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

        {/* ── DIVIDER ── */}
        <div style={{ margin: "5rem 0 3rem", borderTop: `1px solid ${GLOW_BLUE}22`, position: "relative", textAlign: "center" }}>
          <span style={{ position: "relative", top: "-0.75rem", display: "inline-block", background: "#080c10", padding: "0 1.5rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: GLOW_BLUE, textTransform: "uppercase" }}>
            Extra Opties
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
