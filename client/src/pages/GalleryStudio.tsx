import { useEffect, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";

type GalleryCategory =
  | "sfeer"
  | "dj-live"
  | "bruiloft"
  | "bedrijfsfeest"
  | "studentenfeest"
  | "prive";

type CategoryOption = {
  id: GalleryCategory;
  label: string;
  description: string;
};

type StudioConfig = {
  seoPrefix: string;
  maxFull: number;
  maxThumb: number;
  wmText: string;
  wmOpacity: number;
  quality: number;
  defaultCategories: GalleryCategory[];
};

type ProcessedAsset = {
  id: string;
  originalName: string;
  cleanName: string;
  previewUrl: string;
  alt: string;
  seoTitle: string;
  label: string;
  categories: GalleryCategory[];
  fullBlob: Blob;
  thumbBlob: Blob;
  originalSize: number;
  fullSize: number;
  thumbSize: number;
  dimensions: {
    width: number;
    height: number;
  };
};

const STORAGE_KEY = "soundvision-gallery-studio-config-v1";

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: "sfeer",
    label: "DJ Show Sfeer",
    description: "Algemene show-impressies en dansvloerenergie.",
  },
  {
    id: "dj-live",
    label: "DJ Tonicity Live",
    description: "Foto's waarop jij zelf zichtbaar achter de booth staat.",
  },
  {
    id: "bruiloft",
    label: "Bruiloft",
    description: "Bruiloften, first dances en romantische settings.",
  },
  {
    id: "bedrijfsfeest",
    label: "Bedrijfsfeest",
    description: "Corporate events, personeelsfeesten en gala-avonden.",
  },
  {
    id: "studentenfeest",
    label: "Studentenfeest",
    description: "Student parties, introductieweken en campus-events.",
  },
  {
    id: "prive",
    label: "Privé Feest",
    description: "Verjaardagen, jubilea en besloten feesten.",
  },
];

const DEFAULT_CONFIG: StudioConfig = {
  seoPrefix: "soundvision-events-",
  maxFull: 1600,
  maxThumb: 400,
  wmText: "© SoundVision Events",
  wmOpacity: 0.45,
  quality: 0.82,
  defaultCategories: ["sfeer"],
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 100 ? 0 : 1)} ${units[unitIndex]}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getSummaryLabel(categories: GalleryCategory[]) {
  if (categories.length === 0) return "Nog geen categorie";
  return categories
    .map((category) => CATEGORY_OPTIONS.find((item) => item.id === category)?.label ?? category)
    .join(", ");
}

function buildCsv(items: ProcessedAsset[]) {
  const header = [
    "Oorspronkelijke naam",
    "Nieuwe bestandsnaam",
    "Alt-tekst",
    "SEO titel",
    "Label",
    "Categorieën",
    "Vol formaat",
    "Thumbnail",
  ];

  const rows = items.map((item) => [
    item.originalName,
    `${item.cleanName}.webp`,
    item.alt,
    item.seoTitle,
    item.label,
    item.categories.join(","),
    `gallery_images/${item.cleanName}.webp`,
    `gallery_thumbnails/${item.cleanName}.webp`,
  ]);

  return [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";"))
    .join("\n");
}

function buildJsonManifest(items: ProcessedAsset[]) {
  return JSON.stringify(
    items.map((item) => ({
      originalName: item.originalName,
      fileName: `${item.cleanName}.webp`,
      thumbFileName: `${item.cleanName}.webp`,
      alt: item.alt,
      seoTitle: item.seoTitle,
      label: item.label,
      categories: item.categories,
      dimensions: item.dimensions,
      output: {
        full: `gallery_images/${item.cleanName}.webp`,
        thumb: `gallery_thumbnails/${item.cleanName}.webp`,
      },
    })),
    null,
    2,
  );
}

function buildTypeScriptManifest(items: ProcessedAsset[]) {
  const rows = items
    .map(
      (item) => `  {
    src: "__CDN_BASE__/gallery_images/${item.cleanName}.webp",
    thumbSrc: "__CDN_BASE__/gallery_thumbnails/${item.cleanName}.webp",
    alt: ${JSON.stringify(item.alt)},
    seoTitle: ${JSON.stringify(item.seoTitle)},
    label: ${JSON.stringify(item.label)},
    categories: ${JSON.stringify(item.categories)},
  },`,
    )
    .join("\n");

  return `export type GalleryStudioItem = {
  src: string;
  thumbSrc: string;
  alt: string;
  seoTitle: string;
  label: string;
  categories: ("sfeer" | "dj-live" | "bruiloft" | "bedrijfsfeest" | "studentenfeest" | "prive")[];
};

export const GALLERY_STUDIO_ITEMS: GalleryStudioItem[] = [
${rows}
];`;
}

function getImageDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Kon de afmetingen van ${file.name} niet lezen.`));
    };
    img.src = url;
  });
}

function processImage(
  file: File,
  maxWidth: number,
  quality: number,
  forceSquare: boolean,
  wmText: string,
  wmOpacity: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas-context kon niet worden aangemaakt."));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        let width = img.width;
        let height = img.height;

        if (forceSquare) {
          const size = Math.min(width, height);
          canvas.width = maxWidth;
          canvas.height = maxWidth;
          ctx.drawImage(
            img,
            (width - size) / 2,
            (height - size) / 2,
            size,
            size,
            0,
            0,
            maxWidth,
            maxWidth,
          );
        } else {
          const scale = Math.min(maxWidth / width, 1);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
        }

        if (wmText && !forceSquare) {
          const fontSize = Math.max(22, Math.round(canvas.width / 25));
          ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${wmOpacity})`;
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";
          ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
          ctx.shadowBlur = 8;
          ctx.fillText(wmText, canvas.width - fontSize / 2, canvas.height - fontSize / 2);
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error(`WebP-export mislukt voor ${file.name}.`));
              return;
            }
            resolve(blob);
          },
          "image/webp",
          quality,
        );
      };
      img.onerror = () => reject(new Error(`Kon ${file.name} niet verwerken.`));
      img.src = String(event.target?.result ?? "");
    };
    reader.onerror = () => reject(new Error(`Kon ${file.name} niet inlezen.`));
    reader.readAsDataURL(file);
  });
}

function StudioCard({
  item,
  onUpdate,
}: {
  item: ProcessedAsset;
  onUpdate: (id: string, updates: Partial<ProcessedAsset>) => void;
}) {
  return (
    <article className="rounded-3xl border border-cyan-500/15 bg-slate-900/70 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.25)] backdrop-blur-sm">
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="w-full xl:max-w-[220px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80">
            <img
              src={item.previewUrl}
              alt={item.alt}
              className="h-56 w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-3 rounded-2xl border border-white/8 bg-slate-950/60 p-3 text-xs text-slate-400">
            <p>
              <span className="font-semibold text-slate-200">Bestand:</span> {item.cleanName}.webp
            </p>
            <p className="mt-1">
              <span className="font-semibold text-slate-200">Formaat:</span> {item.dimensions.width} × {item.dimensions.height}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-slate-200">Origineel:</span> {formatBytes(item.originalSize)}
            </p>
            <p className="mt-1 text-emerald-400">
              <span className="font-semibold text-emerald-300">WebP:</span> {formatBytes(item.fullSize)}
            </p>
            <p className="mt-1 text-sky-400">
              <span className="font-semibold text-sky-300">Thumb:</span> {formatBytes(item.thumbSize)}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Alt-tekst
              </label>
              <textarea
                value={item.alt}
                onChange={(event) => onUpdate(item.id, { alt: event.target.value })}
                rows={3}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                SEO titel
              </label>
              <input
                value={item.seoTitle}
                onChange={(event) => onUpdate(item.id, { seoTitle: event.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
              <label className="mb-1 mt-4 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Label in gallery
              </label>
              <input
                value={item.label}
                onChange={(event) => onUpdate(item.id, { label: event.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Categorieën</p>
              <p className="text-xs text-slate-500">Meerdere selecties zijn mogelijk.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {CATEGORY_OPTIONS.map((option) => {
                const active = item.categories.includes(option.id);
                return (
                  <button
                    key={`${item.id}-${option.id}`}
                    type="button"
                    onClick={() => {
                      const nextCategories = active
                        ? item.categories.filter((entry) => entry !== option.id)
                        : [...item.categories, option.id];
                      onUpdate(item.id, {
                        categories: nextCategories.length > 0 ? nextCategories : ["sfeer"],
                      });
                    }}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-cyan-400/70 bg-cyan-500/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                        : "border-white/8 bg-slate-950/55 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-900"
                    }`}
                  >
                    <p className="text-sm font-semibold">{option.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-slate-950/60 px-4 py-3 text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-[0.2em] text-slate-300">Klaar voor export</span>
            <p className="mt-2 leading-relaxed">
              Dit item wordt opgenomen in de ZIP-bundel, de SEO CSV, de JSON-manifest en een TypeScript-template voor verdere integratie in je galeriecode.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GalleryStudio() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const [config, setConfig] = useState<StudioConfig>(DEFAULT_CONFIG);
  const [processedItems, setProcessedItems] = useState<ProcessedAsset[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Partial<StudioConfig>;
      setConfig({
        ...DEFAULT_CONFIG,
        ...parsed,
        defaultCategories:
          parsed.defaultCategories && parsed.defaultCategories.length > 0
            ? parsed.defaultCategories
            : DEFAULT_CONFIG.defaultCategories,
      });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const summary = useMemo(() => {
    const totalOriginal = processedItems.reduce((sum, item) => sum + item.originalSize, 0);
    const totalFull = processedItems.reduce((sum, item) => sum + item.fullSize, 0);
    const totalThumb = processedItems.reduce((sum, item) => sum + item.thumbSize, 0);
    const savings = totalOriginal > 0 ? ((totalOriginal - totalFull) / totalOriginal) * 100 : 0;

    return {
      itemCount: processedItems.length,
      totalOriginal,
      totalFull,
      totalThumb,
      savings,
    };
  }, [processedItems]);

  async function handleFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) {
      toast.error("Selecteer minstens één afbeeldingsbestand.");
      return;
    }

    setIsProcessing(true);
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current = [];
    setProcessedItems([]);

    try {
      const nextItems: ProcessedAsset[] = [];

      for (const file of files) {
        const baseName = slugify(file.name) || `gallery-item-${Date.now()}`;
        const cleanName = `${config.seoPrefix ? slugify(config.seoPrefix) + "-" : ""}${baseName}`.replace(/-{2,}/g, "-");
        const readableName = titleCase(cleanName.replace(/-/g, " "));
        const [dimensions, fullBlob, thumbBlob] = await Promise.all([
          getImageDimensions(file),
          processImage(file, config.maxFull, config.quality, false, config.wmText, config.wmOpacity),
          processImage(file, config.maxThumb, config.quality, true, "", 0),
        ]);

        nextItems.push({
          id: `${cleanName}-${file.size}-${nextItems.length}`,
          originalName: file.name,
          cleanName,
          previewUrl: URL.createObjectURL(file),
          alt: `${readableName} tijdens een SoundVision Events DJ show in Groningen en Noord-Nederland`,
          seoTitle: `SoundVision Events — ${readableName}`,
          label: readableName.split(" ").slice(0, 3).join(" "),
          categories: [...config.defaultCategories],
          fullBlob,
          thumbBlob,
          originalSize: file.size,
          fullSize: fullBlob.size,
          thumbSize: thumbBlob.size,
          dimensions,
        });
      }

      previewUrlsRef.current = nextItems.map((item) => item.previewUrl);
      setProcessedItems(nextItems);
      toast.success(`${nextItems.length} afbeelding${nextItems.length === 1 ? "" : "en"} verwerkt.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Onbekende fout tijdens het verwerken.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleDownloadBundle() {
    if (processedItems.length === 0) {
      toast.error("Voeg eerst afbeeldingen toe voordat je een bundel downloadt.");
      return;
    }

    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const fullFolder = zip.folder("gallery_images");
      const thumbFolder = zip.folder("gallery_thumbnails");
      const metadataFolder = zip.folder("metadata");

      processedItems.forEach((item) => {
        fullFolder?.file(`${item.cleanName}.webp`, item.fullBlob);
        thumbFolder?.file(`${item.cleanName}.webp`, item.thumbBlob);
      });

      metadataFolder?.file("seo-data.csv", buildCsv(processedItems));
      metadataFolder?.file("gallery-manifest.json", buildJsonManifest(processedItems));
      metadataFolder?.file("gallery-manifest.ts", buildTypeScriptManifest(processedItems));

      zip.file(
        "README.txt",
        [
          "SoundVision Events Gallery Studio export",
          "",
          "Inhoud:",
          "- gallery_images/: geoptimaliseerde WebP-afbeeldingen",
          "- gallery_thumbnails/: vierkante thumbnails",
          "- metadata/seo-data.csv: SEO, labels en categorieën",
          "- metadata/gallery-manifest.json: machineleesbare gallery-data",
          "- metadata/gallery-manifest.ts: direct bruikbaar als code-template",
          "",
          "Workflow:",
          "1. Upload de WebP-bestanden naar de CDN of webdev-assets.",
          "2. Vervang __CDN_BASE__ in gallery-manifest.ts door je echte CDN-map.",
          "3. Gebruik de metadata voor BentoGallery, GallerySection of toekomstige gallery tooling.",
        ].join("\n"),
      );

      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, `soundvision-gallery-studio-${new Date().toISOString().slice(0, 10)}.zip`);
      toast.success("De galerijbundel is gedownload.");
    } catch {
      toast.error("De ZIP-bundel kon niet worden samengesteld.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleCopyManifest() {
    if (processedItems.length === 0) {
      toast.error("Er is nog geen manifest om te kopiëren.");
      return;
    }

    try {
      await navigator.clipboard.writeText(buildTypeScriptManifest(processedItems));
      toast.success("TypeScript-manifest gekopieerd naar het klembord.");
    } catch {
      toast.error("Kopiëren naar het klembord is niet gelukt.");
    }
  }

  function updateItem(id: string, updates: Partial<ProcessedAsset>) {
    setProcessedItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  }

  const statCards = [
    {
      label: "Verwerkte beelden",
      value: summary.itemCount.toString(),
      detail: "Klaar voor WebP, thumb en metadata-export.",
    },
    {
      label: "Originele payload",
      value: formatBytes(summary.totalOriginal),
      detail: "Totale uploadgrootte van de bronbestanden.",
    },
    {
      label: "Nieuwe WebP payload",
      value: formatBytes(summary.totalFull),
      detail: `Besparing van ${summary.savings.toFixed(0)}% op de hoofdafbeeldingen.`,
    },
    {
      label: "Thumbnail payload",
      value: formatBytes(summary.totalThumb),
      detail: "Vierkante thumbnails voor snellere gallery-overzichten.",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="Gallery Studio"
        description="Permanente gallery workflow voor SoundVision Events: foto's optimaliseren naar WebP, thumbnails genereren, SEO metadata beheren en websiteklare gallery exports maken."
        path="/gallery-studio"
        keywords="gallery studio, afbeeldingen optimaliseren, webp converter, gallery workflow, SoundVision Events, SEO afbeeldingen, thumbnails maken"
      />
      <main className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="sv-fade-up rounded-[2rem] border border-cyan-500/15 bg-slate-950/60 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-300">Gallery Studio</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr,0.8fr] lg:items-end">
              <div>
                <h1 className="font-[Cinzel] text-4xl tracking-[0.08em] text-slate-50 md:text-6xl">
                  DE WEBSITEKLARE
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                    {" "}GALLERY WORKFLOW
                  </span>
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
                  Deze studio integreert jouw browser-based beeldverwerking direct in de SoundVision-websitecodebase. Je zet ruwe foto's om naar geoptimaliseerde WebP-bestanden, maakt vierkante thumbnails, beheert SEO-metadata en exporteert meteen een bundel die klaar is voor CDN-upload en verdere gallery-integratie.
                </p>
              </div>
              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/8 p-5 text-sm leading-relaxed text-slate-300">
                <p className="font-semibold uppercase tracking-[0.2em] text-cyan-200">Toegevoegde waarde</p>
                <p className="mt-3">
                  Naast conversie bevat deze versie ook categoriebeheer, lokale opslag van jouw voorkeuren, SEO-velden per foto en directe export naar CSV, JSON én TypeScript. Daarmee wordt dit niet alleen een optimizer, maar een praktische content-ops tool voor je gallery-systeem.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[360px,1fr]">
            <aside className="sv-fade-up space-y-6 rounded-[2rem] border border-white/8 bg-slate-900/65 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Instellingen</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50">Verwerking & SEO</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    SEO prefix
                  </label>
                  <input
                    value={config.seoPrefix}
                    onChange={(event) => setConfig((current) => ({ ...current, seoPrefix: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Max breedte
                    </label>
                    <input
                      type="number"
                      min={600}
                      max={3200}
                      value={config.maxFull}
                      onChange={(event) => setConfig((current) => ({ ...current, maxFull: Number(event.target.value) || 1600 }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Thumbnail
                    </label>
                    <input
                      type="number"
                      min={150}
                      max={1200}
                      value={config.maxThumb}
                      onChange={(event) => setConfig((current) => ({ ...current, maxThumb: Number(event.target.value) || 400 }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Watermerk
                  </label>
                  <input
                    value={config.wmText}
                    onChange={(event) => setConfig((current) => ({ ...current, wmText: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Transparantie {Math.round(config.wmOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={config.wmOpacity}
                    onChange={(event) => setConfig((current) => ({ ...current, wmOpacity: Number(event.target.value) }))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    WebP kwaliteit {Math.round(config.quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min={0.4}
                    max={1}
                    step={0.01}
                    value={config.quality}
                    onChange={(event) => setConfig((current) => ({ ...current, quality: Number(event.target.value) }))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700"
                  />
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Een bereik rond 78–85% geeft meestal de beste balans tussen kwaliteit en laadsnelheid.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/8 bg-slate-950/55 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Standaard categorieën</p>
                <div className="mt-4 grid gap-3">
                  {CATEGORY_OPTIONS.map((option) => {
                    const active = config.defaultCategories.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setConfig((current) => {
                            const nextCategories = current.defaultCategories.includes(option.id)
                              ? current.defaultCategories.filter((entry) => entry !== option.id)
                              : [...current.defaultCategories, option.id];
                            return {
                              ...current,
                              defaultCategories: nextCategories.length > 0 ? nextCategories : ["sfeer"],
                            };
                          });
                        }}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          active
                            ? "border-cyan-400/70 bg-cyan-500/10 text-cyan-100"
                            : "border-white/8 bg-slate-900/75 text-slate-300 hover:border-cyan-500/40"
                        }`}
                      >
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className="mt-1 text-xs text-slate-400">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div
                className={`sv-fade-up rounded-[2rem] border-2 border-dashed p-10 text-center transition ${
                  isDragging
                    ? "border-cyan-300 bg-cyan-500/10"
                    : "border-cyan-500/35 bg-slate-950/45 hover:border-cyan-400 hover:bg-slate-900/55"
                }`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  void handleFiles(event.dataTransfer.files);
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files) {
                      void handleFiles(event.target.files);
                    }
                  }}
                />
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Uploadzone</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-50">Sleep je foto's hierheen</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                  Of klik om bestanden te kiezen. De studio genereert automatisch geoptimaliseerde WebP-afbeeldingen, square thumbnails, SEO-teksten en metadata die direct bruikbaar zijn in jouw website-workflow.
                </p>
                <div className="mt-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-100">
                  {isProcessing ? "Beelden worden verwerkt…" : "Klik of drop afbeeldingen"}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => (
                  <article
                    key={card.label}
                    className="rounded-3xl border border-white/8 bg-slate-900/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-50">{card.value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.detail}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-[2rem] border border-white/8 bg-slate-900/65 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Output</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-50">Websiteklare export</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
                      De bundel bevat de hoofdbeelden, thumbnails, een SEO CSV, een JSON-manifest en een TypeScript-template. Daarmee kun je razendsnel de CDN vullen en gallery-data in je code verwerken.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => void handleCopyManifest()}
                      className="rounded-full border border-white/10 bg-slate-950/75 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-200"
                    >
                      Kopieer TS manifest
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDownloadBundle()}
                      disabled={isDownloading || processedItems.length === 0}
                      className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDownloading ? "Bundel wordt gemaakt…" : "Download ZIP bundel"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {processedItems.length === 0 ? (
                  <div className="rounded-[2rem] border border-white/8 bg-slate-900/50 px-8 py-12 text-center text-slate-400">
                    Zodra je foto's uploadt, verschijnen hier previews, metadata-velden en categoriebeheer. De huidige standaardcategorieën zijn: {getSummaryLabel(config.defaultCategories)}.
                  </div>
                ) : (
                  processedItems.map((item) => (
                    <StudioCard key={item.id} item={item} onUpdate={updateItem} />
                  ))
                )}
              </div>
            </section>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}
