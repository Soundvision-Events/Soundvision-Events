/**
 * SoundVision Events — SEO Component
 * Injects per-page meta tags, Open Graph, Twitter Card and JSON-LD structured data.
 * Wrap each page with <SEO ... /> for maximum search engine visibility.
 */
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.soundvisionevents.nl";
const DEFAULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/logo_dark_aae3c78f.png";
const SITE_NAME = "SoundVision Events";

interface SEOProps {
  title: string;
  description: string;
  path?: string;           // e.g. "/bruiloft"
  image?: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
}

export default function SEO({ title, description, path = "/", image = DEFAULT_IMAGE, jsonLd, noIndex = false }: SEOProps) {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = title.includes("SoundVision") ? title : `${title} | SoundVision Events`;

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

/* ── Pre-built JSON-LD schemas ── */

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SoundVision Events",
  "alternateName": "DJ Tonicity",
  "description": "Professionele allround DJ shows voor bruiloften, bedrijfsfeesten, studentenfeesten en privéfeesten in Groningen, Drenthe, Friesland en Overijssel.",
  "url": SITE_URL,
  "logo": DEFAULT_IMAGE,
  "image": DEFAULT_IMAGE,
  "telephone": "+31622764233",
  "email": "info@soundvisionevents.nl",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Groningen",
    "addressCountry": "NL"
  },
  "areaServed": ["Groningen", "Drenthe", "Friesland", "Overijssel"],
  "priceRange": "Op aanvraag",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.8",
    "bestRating": "10",
    "worstRating": "1",
    "ratingCount": "50",
    "reviewAspect": "Trustoo"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "23:00"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wat kost een DJ show van SoundVision Events?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De prijs van een DJ show hangt af van het pakket, de duur en de locatie. Neem contact op voor een vrijblijvende offerte op maat."
      }
    },
    {
      "@type": "Question",
      "name": "In welke regio's is SoundVision Events actief?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SoundVision Events is actief in Groningen, Drenthe, Friesland en Overijssel. Op aanvraag ook buiten deze regio's."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik muziekwensen doorgeven?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, SoundVision Events werkt altijd met een persoonlijk muziekwensenformulier zodat jouw feest een unieke soundtrack krijgt."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe ver van tevoren moet ik boeken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voor bruiloften adviseren we minimaal 6-12 maanden van tevoren te boeken. Voor andere feesten is 2-3 maanden van tevoren doorgaans voldoende."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is de Trustoo score van SoundVision Events?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SoundVision Events heeft een Trustoo score van 9.8 op 10, gebaseerd op beoordelingen van echte klanten."
      }
    }
  ]
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": `${SITE_URL}${item.path}`
  }))
});
