/**
 * SoundVision Events — SEO Head Component
 * Per-page dynamic meta tags using react-helmet-async
 */
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
}

const BASE_URL = "https://soundvision-6rh3pkve.manus.space";
const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/logo_dark_aae3c78f.png";

export default function SEOHead({ title, description, path, keywords }: SEOHeadProps) {
  const fullTitle = `${title} | SoundVision Events`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={LOGO_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nl_NL" />

      {/* Twitter Card */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={LOGO_URL} />
    </Helmet>
  );
}
