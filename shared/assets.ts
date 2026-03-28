/**
 * SoundVision Events — Shared Asset Library
 *
 * All static assets (icons, images, videos) are hosted on the CDN.
 * Import from this file anywhere in the project to use them.
 *
 * Usage example:
 *   import { ICONS } from "@shared/assets";
 *   <img src={ICONS.turntable.url} alt={ICONS.turntable.label} />
 */

export interface AssetEntry {
  url: string;
  label: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Anime-style icon pack — 2048×2048px PNG with transparent background
// Soft lighting / ethereal glow / anime-inspired aesthetic
// ---------------------------------------------------------------------------
export const ICONS: Record<string, AssetEntry> = {
  fire: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_fire_fb70ea64.png",
    label: "Anime Fire",
    description: "Smooth orange/yellow gradients, ethereal feel",
  },
  heart: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_heart_82e6d4ab.png",
    label: "Anime Heart",
    description: "Liquid light texture, vibrant red passion",
  },
  lightning: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_lightning_e92b8a67.png",
    label: "Anime Lightning",
    description: "Golden glow with soft electric sparks",
  },
  microphone: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_microphone_aa412901.png",
    label: "Anime Microphone",
    description: "Golden/silver glow, professional anime look",
  },
  musicNote: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_music_note_e36bd017.png",
    label: "Anime Music Note",
    description: "Soft pastel glow, neon pink and blue",
  },
  rocket: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_rocket_80e1c8ce.png",
    label: "Anime Rocket",
    description: "Neon fire trail, high-energy launch",
  },
  speaker: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_speaker_4b356813.png",
    label: "Anime Speaker",
    description: "Glowing sound waves, matte black finish",
  },
  star: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_star_8f6a17c1.png",
    label: "Anime Star",
    description: "Iridescent diamond star with light particles",
  },
  turntable: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_turntable_a6e305c0.png",
    label: "Anime Turntable",
    description: "Neon blue accents, sleek metallic anime style",
  },
  visionEye: {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_vision_eye_711e8ca4.png",
    label: "Vision Eye",
    description: "Futuristic cyan iris, sleek metallic frame",
  },
};

// ---------------------------------------------------------------------------
// Convenience array — useful for mapping over all icons
// ---------------------------------------------------------------------------
export const ALL_ICONS: (AssetEntry & { key: string })[] = Object.entries(ICONS).map(
  ([key, entry]) => ({ key, ...entry })
);
