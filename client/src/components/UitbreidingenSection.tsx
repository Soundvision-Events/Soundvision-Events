/**
 * SoundVision Events — Pakketten & Add-ons Section
 * Packages: Intiem (4h €495), Luxe (4h €650), Elite (5h €895 + 1u gratis)
 * Click-to-select packages and add-ons
 * Live price calculator at bottom — 10% discount shown ONLY in calculator (Luxe & Elite)
 */
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { type PageTheme, DEFAULT_THEME } from "@/lib/pageThemes";

// ── Brand colours
const GLOW_BLUE = "#7eb3ff";
const GLOW_PURPLE = "#6040e0";
const NEON_CYAN_GLOW = "#00d4ff";
const CARD_BG = "linear-gradient(to bottom, #00d4ff 0%, #3a8fff 25%, #5b4af0 50%, #6040e0 75%, #4a00c0 100%)";
const CARD_BORDER = `1.5px solid rgba(0,200,255,0.45)`;
const CARD_SHADOW = `0 0 18px rgba(0,200,255,0.22), 0 0 40px rgba(96,64,224,0.18), inset 0 1px 0 rgba(126,179,255,0.08)`;
const CARD_SHADOW_HOVER = `0 0 32px rgba(0,200,255,0.65), 0 0 70px rgba(96,64,224,0.40), 0 0 120px rgba(0,200,255,0.18), inset 0 1px 0 rgba(0,200,255,0.15)`;
const CARD_BORDER_HOVER = `2px solid ${NEON_CYAN_GLOW}`;
const CARD_BORDER_SELECTED = `2px solid #00ff88`;
const CARD_SHADOW_SELECTED = `0 0 32px rgba(0,255,136,0.55), 0 0 70px rgba(0,255,136,0.25), 0 0 120px rgba(0,200,255,0.18)`;

const packages = [
  {
    id: "intiem",
    name: "INTIEM",
    tagline: "Compact & Krachtig",
    basePrice: 495,
    priceLabel: "vanaf €495,-",
    discount: false,          // no discount for Intiem
    duration: "4 uur",
    extraHour: "€100 / extra uur",
    extraHourIncluded: 0,
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
    basePrice: 650,
    priceLabel: "vanaf €650,-",
    discount: true,           // 10% discount shown in calculator
    duration: "4 uur",
    extraHour: "€100 / extra uur",
    extraHourIncluded: 0,
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
    basePrice: 895,
    priceLabel: "vanaf €895,-",
    discount: true,           // 10% discount shown in calculator
    duration: "5 uur (minimaal)",
    extraHour: "€100 / extra uur",
    extraHourIncluded: 1,     // 1 extra hour included
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
      "1 extra uur inbegrepen",
      "Opbouw & afbouw inbegrepen",
      "Meerdere voorbesprekingen",
      "Muziekwensen + persoonlijke intro + surprises",
    ],
    ideal: "Ideaal voor: Grote bruiloften, grote bedrijfsevents, festivals",
  },
];

const addons = [
  {
    id: "extra-uur",
    icon: "⏱️",
    title: "Extra Uurtarief",
    subtitle: "Per uur",
    price: 100,
    priceLabel: "€100 / uur",
    accentColor: GLOW_BLUE,
    includedIn: [] as string[],
    front: "Verleng uw show naar wens. Geldt voor alle pakketten — de feestsfeer hoeft niet te stoppen.",
    backTitle: "Hoe werkt het?",
    backPoints: [
      "Standaard Intiem & Luxe: 4 uur",
      "Standaard Elite: 5 uur minimaal",
      "Elk extra uur: €100 (incl. BTW)",
      "Vooraf afstemmen in overleg",
      "Flexibel bij te boeken op de avond zelf",
    ],
    backNote: "Van toepassing op alle shows",
  },
  {
    id: "rookmachine",
    icon: "🌫️",
    title: "Laaghangende Rookmachine",
    subtitle: "IJseffect",
    price: 75,
    priceLabel: "€75",
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
    id: "openingsdans",
    icon: "🎵",
    title: "Openingsdans Mix",
    subtitle: "Mashup op maat",
    price: 0,
    priceLabel: "Op aanvraag",
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
    id: "lasershow",
    icon: "🔴",
    title: "Lasershow",
    subtitle: "RGB Full-Color",
    price: 75,
    priceLabel: "€75",
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
    id: "uplights",
    icon: "💡",
    title: "Uplights",
    subtitle: "360° Sfeerverlichting",
    price: 75,
    priceLabel: "€75",
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
      ([entry]) => { if (entry.isIntersecting) { setOpacity(1); setTranslateY(0); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, opacity, translateY };
}

// ── Package flip card (click to select)
function PackageFlipCard({ pkg, index, selected, onSelect, onContact, theme = DEFAULT_THEME }: {
  pkg: typeof packages[0];
  index: number;
  selected: boolean;
  onSelect: () => void;
  onContact: () => void;
  theme?: PageTheme;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, opacity, translateY } = useScrollFade(0.1);

  const scale = pkg.highlight ? 1.06 : 1;
  const zIndex = pkg.highlight ? 10 : 1;

  const borderStyle = selected ? CARD_BORDER_SELECTED : hovered ? CARD_BORDER_HOVER : CARD_BORDER;
  const shadowStyle = selected ? CARD_SHADOW_SELECTED : hovered ? CARD_SHADOW_HOVER : CARD_SHADOW;

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
        cursor: "pointer",
      }}
      onMouseEnter={() => { setFlipped(true); setHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setHovered(false); }}
      onClick={onSelect}
    >
      {/* MEEST GEKOZEN badge */}
      {pkg.highlight && (
        <div style={{
          position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)",
          zIndex: 40, background: `linear-gradient(135deg, ${GLOW_PURPLE}, ${GLOW_BLUE})`,
          color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "0.85rem",
          letterSpacing: "0.15em", padding: "0.4rem 1.75rem", borderRadius: "100px",
          whiteSpace: "nowrap", boxShadow: `0 4px 24px ${GLOW_PURPLE}66, 0 0 12px ${GLOW_BLUE}44`,
          pointerEvents: "none",
        }}>
          MEEST GEKOZEN
        </div>
      )}

      {/* Selected badge */}
      {selected && (
        <div style={{
          position: "absolute", top: pkg.highlight ? "8px" : "-12px", right: "12px",
          zIndex: 40, background: "linear-gradient(135deg, #00ff88, #00cc66)",
          color: "#003322", fontFamily: "'Cinzel', serif", fontSize: "0.75rem",
          letterSpacing: "0.12em", padding: "0.3rem 0.9rem", borderRadius: "100px",
          boxShadow: "0 0 16px rgba(0,255,136,0.6)", pointerEvents: "none",
        }}>
          ✓ GESELECTEERD
        </div>
      )}

      {/* Card wrapper */}
      <div style={{
        position: "absolute", inset: 0, transformStyle: "preserve-3d",
        transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* ── FRONT ── */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden", background: CARD_BG,
          border: borderStyle, borderRadius: "1.5rem", overflow: "hidden",
          boxShadow: shadowStyle, transition: "box-shadow 0.4s ease, border 0.4s ease",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ width: "100%", aspectRatio: "1/1", maxHeight: "55%", borderBottom: `1px solid ${GLOW_BLUE}33`, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <img src={pkg.photoUrl} alt={pkg.photoLabel} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${GLOW_PURPLE}44 100%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.65)", border: `1px solid ${GLOW_BLUE}66`, borderRadius: "999px", padding: "4px 14px", backdropFilter: "blur(6px)" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", margin: 0 }}>{pkg.photoLabel}</p>
            </div>
          </div>

          <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", marginBottom: "0.35rem" }}>
                {pkg.tagline}
              </p>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.55rem", letterSpacing: "0.08em", color: "#f0f4f8", lineHeight: 1, textShadow: `0 0 20px ${GLOW_BLUE}55` }}>
                {pkg.name}
              </h3>
              {/* Price */}
              <div style={{ marginTop: "0.5rem" }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", color: "#00ff88", textShadow: "0 0 12px rgba(0,255,136,0.6)", letterSpacing: "0.05em" }}>
                  {pkg.priceLabel}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "rgba(240,244,248,0.45)", marginLeft: "0.4rem" }}>incl. btw</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.55)" }}>⏱ {pkg.duration}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: GLOW_BLUE, background: `${GLOW_BLUE}15`, border: `1px solid ${GLOW_BLUE}33`, borderRadius: "100px", padding: "2px 8px" }}>
                  {pkg.extraHour}
                </span>
                {pkg.extraHourIncluded > 0 && (
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "#00ff88", background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", borderRadius: "100px", padding: "2px 8px" }}>
                    +{pkg.extraHourIncluded}u inbegrepen
                  </span>
                )}
              </div>
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginTop: "0.75rem" }}>
              Zweef voor details · Klik om te selecteren →
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)",
          background: "linear-gradient(to bottom, #00d4ff 0%, #3a8fff 25%, #5b4af0 50%, #6040e0 75%, #4a00c0 100%)",
          border: borderStyle, borderRadius: "1.5rem", overflow: "hidden",
          boxShadow: shadowStyle, display: "flex", flexDirection: "column", padding: "1.75rem",
        }}>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: GLOW_BLUE, textTransform: "uppercase", marginBottom: "0.25rem" }}>{pkg.tagline}</p>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.35rem", letterSpacing: "0.08em", color: "#f0f4f8", lineHeight: 1, textShadow: `0 0 16px ${GLOW_BLUE}66` }}>{pkg.name}</h3>
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
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.8)", lineHeight: 1.4 }}>{feature}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "0.75rem", padding: "0.6rem 0.9rem", borderRadius: "8px", background: `${GLOW_BLUE}0d`, border: `1px solid ${GLOW_BLUE}22` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: GLOW_BLUE, lineHeight: 1.4 }}>{pkg.ideal}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onContact(); }}
            style={{
              marginTop: "0.75rem", width: "100%", padding: "0.75rem", borderRadius: "8px",
              fontFamily: "'Cinzel', serif", fontSize: "0.95rem", letterSpacing: "0.15em",
              cursor: "pointer", background: `linear-gradient(135deg, ${GLOW_PURPLE}, ${GLOW_BLUE})`,
              color: "#fff", border: "none", boxShadow: `0 4px 20px ${GLOW_PURPLE}44`, transition: "all 0.3s ease",
            }}
          >
            OFFERTE AANVRAGEN
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add-on card (click to select/deselect)
const NEON_FRONT_BG = "linear-gradient(145deg, #1e0055 0%, #2d1a8a 45%, #1a2a9a 100%)";
const NEON_BACK_BG = "linear-gradient(145deg, #160040 0%, #261570 50%, #1530a0 100%)";
const NEON_BORDER = "2px solid rgba(100,120,255,0.60)";
const NEON_BORDER_HOVER = "2px solid #7b8fff";
const NEON_BORDER_SELECTED = "2px solid #00ff88";
const NEON_SHADOW = "0 0 18px rgba(90,100,255,0.35), 0 0 50px rgba(60,0,180,0.20)";
const NEON_SHADOW_HOVER = "0 0 30px rgba(100,130,255,0.75), 0 0 70px rgba(80,0,220,0.40)";
const NEON_SHADOW_SELECTED = "0 0 28px rgba(0,255,136,0.55), 0 0 60px rgba(0,255,136,0.25)";
const NEON_CYAN = "#7eb3ff";
const NEON_CYAN_DIM = "rgba(126,179,255,0.55)";
const NEON_CHECK_BG = "rgba(100,130,255,0.15)";
const NEON_CHECK_BORDER = "rgba(120,150,255,0.50)";

function AddonFlipCard({ addon, index, selected, onToggle, selectedPackageId, theme = DEFAULT_THEME }: {
  addon: typeof addons[0];
  index: number;
  selected: boolean;
  onToggle: () => void;
  selectedPackageId: string | null;
  theme?: PageTheme;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, opacity, translateY } = useScrollFade(0.05);

  // Is this add-on already included in the selected package?
  const isIncluded = selectedPackageId !== null && addon.includedIn.includes(selectedPackageId);

  const borderStyle = isIncluded || selected ? NEON_BORDER_SELECTED : hovered ? NEON_BORDER_HOVER : NEON_BORDER;
  const shadowStyle = isIncluded || selected ? NEON_SHADOW_SELECTED : hovered ? NEON_SHADOW_HOVER : NEON_SHADOW;

  return (
    <div
      ref={ref}
      style={{
        perspective: "1000px", height: "220px", opacity,
        transform: `translateY(${translateY}px)`,
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        cursor: isIncluded ? "default" : "pointer",
      }}
      onMouseEnter={() => { setFlipped(true); setHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setHovered(false); }}
      onClick={() => { if (!isIncluded) onToggle(); }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d",
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* ── FRONT ── */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden", background: NEON_FRONT_BG,
          border: borderStyle, borderRadius: "1.25rem", boxShadow: shadowStyle,
          padding: "1.25rem 1.25rem 1rem", display: "flex", flexDirection: "column",
          justifyContent: "space-between", overflow: "hidden",
          transition: "box-shadow 0.4s ease, border 0.4s ease", backdropFilter: "blur(8px)",
        }}>
          <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: `linear-gradient(90deg, transparent, ${NEON_CYAN}, transparent)`, borderRadius: "999px", boxShadow: `0 0 8px ${NEON_CYAN}` }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "2rem", filter: `drop-shadow(0 0 10px ${NEON_CYAN}88)`, lineHeight: 1 }}>{addon.icon}</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: NEON_CYAN, padding: "0.2rem 0.6rem", border: `1px solid ${NEON_CYAN_DIM}`, borderRadius: "100px", textTransform: "uppercase", background: "rgba(0,200,255,0.08)" }}>
              {addon.subtitle}
            </span>
          </div>

          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", letterSpacing: "0.06em", color: "#e8f8ff", margin: "0.5rem 0 0", textShadow: `0 0 18px ${NEON_CYAN}55, 0 2px 4px rgba(0,0,0,0.9)`, lineHeight: 1.1 }}>
            {addon.title}
          </h3>

          {/* Included / selected badges */}
          {isIncluded && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#0a2e00", background: "linear-gradient(135deg, #7fff4f, #5fdd2a)", border: "1px solid #5fdd2a", borderRadius: "100px", padding: "0.15rem 0.55rem", boxShadow: "0 0 8px rgba(95,221,42,0.50)", marginTop: "0.3rem", width: "fit-content" }}>
              ✓ Inbegrepen in pakket
            </span>
          )}
          {!isIncluded && selected && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#003322", background: "linear-gradient(135deg, #00ff88, #00cc66)", border: "1px solid #00cc66", borderRadius: "100px", padding: "0.15rem 0.55rem", boxShadow: "0 0 8px rgba(0,255,136,0.50)", marginTop: "0.3rem", width: "fit-content" }}>
              ✓ Toegevoegd
            </span>
          )}
          {!isIncluded && addon.includedIn.length > 0 && !selected && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.3rem" }}>
              {addon.includedIn.map((pkg) => (
                <span key={pkg} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#0a2e00", background: "linear-gradient(135deg, #7fff4f, #5fdd2a)", border: "1px solid #5fdd2a", borderRadius: "100px", padding: "0.15rem 0.55rem", boxShadow: "0 0 8px rgba(95,221,42,0.50)" }}>
                  <span>✓</span>{`Inbegrepen bij ${pkg.charAt(0).toUpperCase() + pkg.slice(1)}`}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.05rem", letterSpacing: "0.08em", color: NEON_CYAN, textShadow: `0 0 10px ${NEON_CYAN}99` }}>
              {addon.priceLabel}
            </span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: NEON_CYAN_DIM, textTransform: "uppercase" }}>
              {isIncluded ? "Gratis" : "Klik om toe te voegen →"}
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)",
          background: NEON_BACK_BG, border: borderStyle, borderRadius: "1.25rem",
          boxShadow: shadowStyle, padding: "1.1rem 1.25rem", display: "flex",
          flexDirection: "column", overflow: "hidden", backdropFilter: "blur(10px)",
        }}>
          <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: `linear-gradient(90deg, transparent, ${NEON_CYAN}, transparent)`, borderRadius: "999px", boxShadow: `0 0 8px ${NEON_CYAN}` }} />
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.1rem" }}>{addon.icon}</span>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", letterSpacing: "0.06em", color: "#e8f8ff", margin: 0, textShadow: `0 0 12px ${NEON_CYAN}66` }}>{addon.backTitle}</h3>
            </div>
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${NEON_CYAN}, transparent)`, marginTop: "0.4rem", boxShadow: `0 0 5px ${NEON_CYAN}55` }} />
          </div>
          <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {addon.backPoints.map((point) => (
              <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem" }}>
                <div style={{ width: "13px", height: "13px", borderRadius: "50%", flexShrink: 0, marginTop: "2px", background: NEON_CHECK_BG, border: `1px solid ${NEON_CHECK_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={7} color={NEON_CYAN} />
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.74rem", color: "rgba(220,240,255,0.88)", lineHeight: 1.35 }}>{point}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "0.5rem", padding: "0.4rem 0.65rem", borderRadius: "8px", background: "rgba(0,200,255,0.07)", border: `1px solid ${NEON_CYAN_DIM}` }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", color: NEON_CYAN, lineHeight: 1.4, margin: 0 }}>{addon.backNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Live Price Calculator
function PriceCalculator({ selectedPackageId, selectedAddonIds, onContact, theme = DEFAULT_THEME }: {
  selectedPackageId: string | null;
  selectedAddonIds: string[];
  onContact: () => void;
  theme?: PageTheme;
}) {
  const calcFade = useScrollFade(0.05);

  const selectedPkg = packages.find((p) => p.id === selectedPackageId) ?? null;

  // Base price
  const basePrice = selectedPkg ? selectedPkg.basePrice : 0;

  // Add-ons cost — skip add-ons already included in selected package
  const addonTotal = selectedAddonIds.reduce((sum, addonId) => {
    const addon = addons.find((a) => a.id === addonId);
    if (!addon) return sum;
    if (selectedPackageId && addon.includedIn.includes(selectedPackageId)) return sum; // already included
    return sum + addon.price;
  }, 0);

  const subtotal = basePrice + addonTotal;

  // 10% discount — only for Luxe and Elite, shown only here
  const hasDiscount = selectedPkg?.discount ?? false;
  const discountAmount = hasDiscount ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discountAmount;

  const hasSelection = selectedPackageId !== null;

  return (
    <div
      ref={calcFade.ref}
      style={{
        opacity: calcFade.opacity,
        transform: `translateY(${calcFade.translateY}px)`,
        transition: "opacity 0.8s ease, transform 0.8s ease",
        marginTop: "4rem",
        background: "rgba(0, 30, 60, 0.90)",
        border: "2px solid rgba(0,200,255,0.55)",
        borderRadius: "1.5rem",
        padding: "2.5rem",
        boxShadow: "0 0 40px rgba(0,200,255,0.18), 0 0 80px rgba(0,144,255,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00c8ff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Live Prijsoverzicht
        </p>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", letterSpacing: "0.08em", color: "#f0f4f8", margin: 0, textShadow: "0 0 20px rgba(0,200,255,0.3)" }}>
          Uw Samenstelling
        </h3>
      </div>

      {!hasSelection ? (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.4)", fontStyle: "italic" }}>
            ← Selecteer een pakket hierboven om uw prijs te berekenen
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Left: breakdown */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Package line */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.20)", borderRadius: "0.75rem" }}>
                <div>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: "0.08em", color: "#f0f4f8" }}>
                    {selectedPkg!.name} Show
                  </span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "rgba(240,244,248,0.45)", marginLeft: "0.5rem" }}>
                    ({selectedPkg!.duration})
                  </span>
                </div>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", color: "#00ff88", letterSpacing: "0.05em" }}>
                  €{basePrice},-
                </span>
              </div>

              {/* Add-on lines */}
              {selectedAddonIds.map((addonId) => {
                const addon = addons.find((a) => a.id === addonId);
                if (!addon) return null;
                const isFree = selectedPackageId ? addon.includedIn.includes(selectedPackageId) : false;
                return (
                  <div key={addonId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 1rem", background: "rgba(126,179,255,0.05)", border: "1px solid rgba(126,179,255,0.15)", borderRadius: "0.75rem" }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "rgba(240,244,248,0.75)" }}>
                      + {addon.title}
                    </span>
                    {isFree ? (
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: "#7fff4f", letterSpacing: "0.05em" }}>GRATIS</span>
                    ) : (
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: "#7eb3ff", letterSpacing: "0.05em" }}>€{addon.price},-</span>
                    )}
                  </div>
                );
              })}

              {/* Subtotal (only if add-ons) */}
              {addonTotal > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 1rem", borderTop: "1px solid rgba(0,200,255,0.15)", marginTop: "0.25rem" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.45)" }}>Subtotaal</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "rgba(240,244,248,0.55)" }}>€{subtotal},-</span>
                </div>
              )}

              {/* 10% discount line — ONLY shown here, not on cards */}
              {hasDiscount && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 1rem", background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.30)", borderRadius: "0.75rem" }}>
                  <div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#ffaa00", fontWeight: 600 }}>
                      🎉 Vroegboekkorting 10%
                    </span>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", color: "rgba(255,170,0,0.65)", margin: "2px 0 0" }}>
                      Vraag uw datum aan en ontvang 10% korting
                    </p>
                  </div>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", color: "#ffaa00", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                    − €{discountAmount},-
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: total + CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", textAlign: "center" }}>
            <div style={{ padding: "1.5rem 2rem", background: "rgba(0, 40, 80, 0.90)", border: "2px solid rgba(0,200,255,0.60)", borderRadius: "1.25rem", boxShadow: "0 0 30px rgba(0,200,255,0.22)", width: "100%" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "0.25em", color: "rgba(240,244,248,0.45)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Totaalprijs vanaf
              </p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.4rem" }}>
                {hasDiscount && (
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", color: "rgba(240,244,248,0.3)", textDecoration: "line-through", letterSpacing: "0.05em" }}>
                    €{subtotal},-
                  </span>
                )}
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "2.3rem", color: "#00ff88", textShadow: "0 0 20px rgba(0,255,136,0.6)", letterSpacing: "0.05em", lineHeight: 1 }}>
                  €{total},-
                </span>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "rgba(240,244,248,0.4)", marginTop: "0.4rem" }}>
                Alle prijzen incl. btw
              </p>
              {hasDiscount && (
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "#ffaa00", marginTop: "0.25rem" }}>
                  ✓ Inclusief 10% vroegboekkorting
                </p>
              )}
            </div>

            <button
              onClick={onContact}
              style={{
                width: "100%", padding: "1rem 1.5rem", borderRadius: "0.75rem",
                fontFamily: "'Cinzel', serif", fontSize: "1.1rem", letterSpacing: "0.15em",
                cursor: "pointer", background: "linear-gradient(135deg, #00d4ff 0%, #5b6ef5 50%, #6040e0 100%)",
                color: "#fff", border: "2px solid #00d4ff",
                boxShadow: "0 0 20px rgba(0,212,255,0.4), 0 0 50px rgba(0,212,255,0.15)",
                transition: "all 0.3s ease",
              }}
            >
              Offerte Aanvragen
            </button>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "rgba(240,244,248,0.35)", lineHeight: 1.5 }}>
              Vrijblijvend · Geen verborgen kosten · Direct contact met de DJ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main export
export default function UitbreidingenSection({ showOpeningsdansMix = false, theme = DEFAULT_THEME }: { showOpeningsdansMix?: boolean; theme?: PageTheme }) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const headerFade = useScrollFade(0.2);
  const addonsFade = useScrollFade(0.1);

  const visibleAddons = addons.filter((addon) => addon.id !== "openingsdans" || showOpeningsdansMix);

  return (
    <section id="packages" style={{ position: "relative", padding: "6rem 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 20%, ${GLOW_PURPLE}0d 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 80%, ${GLOW_BLUE}08 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Cinzel', serif", fontSize: "22vw", color: "rgba(115,0,255,0.025)", letterSpacing: "0.1em", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", zIndex: 0 }}>
        SHOWS
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div ref={headerFade.ref} style={{ textAlign: "center", marginBottom: "4rem", opacity: headerFade.opacity, transform: `translateY(${headerFade.translateY}px)`, transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", color: GLOW_BLUE, textTransform: "uppercase" }}>
            Pakketten & Add-ons
          </span>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", letterSpacing: "0.05em", lineHeight: 1.05, color: "#f0f4f8", marginTop: "0.75rem", textShadow: `0 0 40px ${GLOW_BLUE}33` }}>
            ALLROUND DJ SHOWS OP MAAT
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.6)", lineHeight: 1.7, fontWeight: 300, maxWidth: "600px", margin: "1rem auto 0" }}>
            Klik op een pakket om het te selecteren, voeg add-ons toe en zie uw totaalprijs direct onderaan. Alle prijzen incl. btw.
          </p>
        </div>

        {/* ── PACKAGES ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", paddingTop: "2rem", alignItems: "start" }}>
          {packages.map((pkg, i) => (
            <PackageFlipCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              selected={selectedPackageId === pkg.id}
              onSelect={() => setSelectedPackageId(selectedPackageId === pkg.id ? null : pkg.id)}
              onContact={handleContact}
              theme={theme}
            />
          ))}
        </div>

        {/* ── ADD-ONS TITLE ── */}
        <div style={{ margin: "5rem 0 2.5rem", position: "relative", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #00c8ff44, #00c8ff88, #00c8ff44, transparent)", boxShadow: "0 0 8px rgba(0,200,255,0.35)" }} />
          <span style={{ position: "relative", display: "inline-block", background: "#080c10", padding: "0 2rem", fontFamily: "'Cinzel', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", letterSpacing: "0.12em", color: "#00c8ff", textTransform: "uppercase", textShadow: "0 0 24px rgba(0,200,255,0.80), 0 0 60px rgba(0,200,255,0.35), 0 2px 4px rgba(0,0,0,0.9)" }}>
            Add-ons &amp; Extras
          </span>
        </div>

        {/* ── ADD-ONS ── */}
        <div ref={addonsFade.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", opacity: addonsFade.opacity, transform: `translateY(${addonsFade.translateY}px)`, transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          {visibleAddons.map((addon, i) => (
            <AddonFlipCard
              key={addon.id}
              addon={addon}
              index={i}
              selected={selectedAddonIds.includes(addon.id)}
              onToggle={() => toggleAddon(addon.id)}
              selectedPackageId={selectedPackageId}
              theme={theme}
            />
          ))}
        </div>

        {/* ── LIVE CALCULATOR ── */}
        <PriceCalculator
          selectedPackageId={selectedPackageId}
          selectedAddonIds={selectedAddonIds}
          onContact={handleContact}
          theme={theme}
        />

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
