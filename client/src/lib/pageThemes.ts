/**
 * SoundVision Events — Per-Page Color Themes
 * Each page derives its accent palette from its YouTube backdrop video mood.
 * Used by UitbreidingenSection, USPSection, and section components via `theme` prop.
 */

export interface PageTheme {
  /** Primary accent — borders, glow, icon highlights */
  accent: string;
  /** Softer version of accent for text */
  accentSoft: string;
  /** Secondary accent — gradient end / deep tone */
  secondary: string;
  /** Card gradient: top → bottom */
  cardGradient: string;
  /** Button gradient */
  btnGradient: string;
  /** Glow rgba for box-shadow */
  glow: string;
  /** Subtle glow for backgrounds */
  glowSubtle: string;
  /** Section title color */
  titleColor: string;
}

export const PAGE_THEMES: Record<string, PageTheme> = {
  /** Home — midnight blue/cyan (NwhOxUrjZcU) */
  home: {
    accent:      "#00d4ff",
    accentSoft:  "#7eb3ff",
    secondary:   "#5b4af0",
    cardGradient: "linear-gradient(to bottom, #00d4ff 0%, #3a8fff 25%, #5b4af0 50%, #6040e0 75%, #4a00c0 100%)",
    btnGradient:  "linear-gradient(135deg, #00d4ff 0%, #5b6ef5 50%, #6040e0 100%)",
    glow:         "rgba(0,212,255,0.45)",
    glowSubtle:   "rgba(0,212,255,0.12)",
    titleColor:   "#00d4ff",
  },

  /** Bruiloft — romantic rose/magenta (c7qIEesCHFE) */
  bruiloft: {
    accent:      "#ff3d8a",
    accentSoft:  "#ff80b3",
    secondary:   "#9b1060",
    cardGradient: "linear-gradient(to bottom, #ff3d8a 0%, #d4206a 25%, #8b1050 50%, #5e0038 75%, #3a0025 100%)",
    btnGradient:  "linear-gradient(135deg, #ff3d8a 0%, #c0185e 50%, #7a0040 100%)",
    glow:         "rgba(255,61,138,0.45)",
    glowSubtle:   "rgba(255,61,138,0.12)",
    titleColor:   "#ff80b3",
  },

  /** Bedrijfsfeesten — electric blue/gold (WbRaePTyQDU) */
  bedrijfsfeesten: {
    accent:      "#0090ff",
    accentSoft:  "#60b8ff",
    secondary:   "#ffaa00",
    cardGradient: "linear-gradient(to bottom, #0090ff 0%, #0060cc 25%, #003d99 50%, #ffaa00 85%, #cc7700 100%)",
    btnGradient:  "linear-gradient(135deg, #0090ff 0%, #0060cc 50%, #ffaa00 100%)",
    glow:         "rgba(0,144,255,0.45)",
    glowSubtle:   "rgba(0,144,255,0.12)",
    titleColor:   "#60b8ff",
  },

  /** Studentenfeesten — neon orange/yellow energy (NwhOxUrjZcU orange mood) */
  studentenfeesten: {
    accent:      "#ff5500",
    accentSoft:  "#ff8844",
    secondary:   "#ffcc00",
    cardGradient: "linear-gradient(to bottom, #ff5500 0%, #cc3300 25%, #992200 50%, #ffcc00 85%, #cc9900 100%)",
    btnGradient:  "linear-gradient(135deg, #ff5500 0%, #cc3300 50%, #ffcc00 100%)",
    glow:         "rgba(255,85,0,0.45)",
    glowSubtle:   "rgba(255,85,0,0.12)",
    titleColor:   "#ff8844",
  },

  /** Privé — elegant violet/lavender (7koSYjb5jdo) */
  prive: {
    accent:      "#9b59b6",
    accentSoft:  "#c39bd3",
    secondary:   "#5e00bd",
    cardGradient: "linear-gradient(to bottom, #c39bd3 0%, #9b59b6 25%, #6c3483 50%, #5e00bd 75%, #3a0070 100%)",
    btnGradient:  "linear-gradient(135deg, #c39bd3 0%, #9b59b6 50%, #5e00bd 100%)",
    glow:         "rgba(155,89,182,0.45)",
    glowSubtle:   "rgba(155,89,182,0.12)",
    titleColor:   "#c39bd3",
  },
};

export const DEFAULT_THEME = PAGE_THEMES.home;
