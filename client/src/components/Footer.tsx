/**
 * SoundVision Events — Footer (Enhanced)
 * Full sitemap, Trustoo review widget, contact info, service areas, legal links
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const GLOW_BLUE = "#00c8ff";
const GLOW_PURPLE = "#7300ff";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Load Trustoo widget script
  useEffect(() => {
    const existing = document.querySelector('script[src*="trustoo.nl"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://static.trustoo.nl/widget/widget_v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.85) 15%, #050810 100%)",
        borderTop: `1px solid ${GLOW_BLUE}18`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top glow line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${GLOW_PURPLE}66, ${GLOW_BLUE}88, ${GLOW_PURPLE}66, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Trustoo Widget Section */}
      <div
        style={{
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          padding: "2.5rem 0",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.25em",
              color: `${GLOW_BLUE}99`,
              textTransform: "uppercase",
            }}>
              Beoordeeld door onze klanten
            </p>
          </div>
          {/* Trustoo Widget */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="trustoo-widget"
              data-id="ONJgD-vB6EbwidLkvtbyvjZyloyw81bQnaBPtYozTPP8rw"
              data-language-code="nl"
              data-country-code="NL"
              data-badge="default"
              data-quote="hidden"
              data-size="large"
              data-type="landscape"
              data-border="hidden"
              data-theme="dark"
              data-background="transparent"
              data-google="hidden"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <div style={{ marginBottom: "1.25rem" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/logo_dark_upscaled_50cc37d3.png"
                alt="SoundVision Events"
                style={{ height: "44px", width: "auto" }}
              />
            </div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(240,244,248,0.5)",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "340px",
              marginBottom: "1.5rem",
            }}>
              Professionele allround DJ shows op maat in Groningen en Noord-Nederland. Van intieme bruiloften tot grootschalige bedrijfsfeesten — uw onvergetelijke avond begint hier.
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { icon: <Phone size={14} />, text: "06 22764233", href: "tel:+31622764233" },
                { icon: <Mail size={14} />, text: "info@soundvisionevents.nl", href: "mailto:info@soundvisionevents.nl" },
                { icon: <MapPin size={14} />, text: "Groningen & Noord-Nederland", href: null },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ color: GLOW_BLUE, opacity: 0.7, flexShrink: 0 }}>{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.8rem",
                        color: "rgba(240,244,248,0.5)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GLOW_BLUE)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,244,248,0.5)")}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240,244,248,0.5)",
                    }}>{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[
                { icon: <Instagram size={16} />, href: "https://www.instagram.com/soundvision.events", label: "Instagram" },
                { icon: <Youtube size={16} />, href: "https://youtube.com/@soundvision.events", label: "YouTube" },
                { icon: <Mail size={16} />, href: "mailto:info@soundvisionevents.nl", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: `${GLOW_PURPLE}11`,
                    border: `1px solid ${GLOW_PURPLE}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(240,244,248,0.5)",
                    transition: "all 0.25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = GLOW_BLUE;
                    e.currentTarget.style.color = GLOW_BLUE;
                    e.currentTarget.style.boxShadow = `0 0 12px ${GLOW_BLUE}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${GLOW_PURPLE}33`;
                    e.currentTarget.style.color = "rgba(240,244,248,0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* DJ Shows Sitemap */}
          <div>
            <h4 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.95rem",
              letterSpacing: "0.2em",
              color: "#f0f4f8",
              marginBottom: "1.25rem",
              paddingBottom: "0.5rem",
              borderBottom: `1px solid ${GLOW_BLUE}22`,
            }}>
              DJ SHOWS
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {[
                { label: "All-Round DJ Show", href: "/" },
                { label: "Bruiloft DJ Show", href: "/bruiloft" },
                { label: "Bedrijfsfeesten", href: "/bedrijfsfeesten" },
                { label: "Studentenfeesten", href: "/studentenfeesten" },
                { label: "Privé Feesten", href: "/prive" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(240,244,248,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = GLOW_BLUE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,244,248,0.5)")}
                  >
                    <span style={{ color: `${GLOW_BLUE}55`, fontSize: "0.6rem" }}>▶</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pakketten */}
          <div>
            <h4 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.95rem",
              letterSpacing: "0.2em",
              color: "#f0f4f8",
              marginBottom: "1.25rem",
              paddingBottom: "0.5rem",
              borderBottom: `1px solid ${GLOW_BLUE}22`,
            }}>
              PAKKETTEN
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { label: "Intimate Show", desc: "Tot 4 uur · Compact & Krachtig" },
                { label: "Luxe Show", desc: "Tot 6 uur · Meest Gekozen" },
                { label: "Elite Show", desc: "Tot 8 uur · Spectaculair & Groots" },
              ].map((pkg) => (
                <li key={pkg.label}>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(240,244,248,0.6)",
                    fontWeight: 500,
                  }}>
                    {pkg.label}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(240,244,248,0.3)",
                    marginTop: "2px",
                  }}>
                    {pkg.desc}
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.5rem" }}>
              <button
                className="sv-btn-primary"
                style={{ fontSize: "0.85rem", padding: "0.55rem 1.4rem" }}
                onClick={scrollToContact}
              >
                Offerte Aanvragen
              </button>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h4 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.95rem",
              letterSpacing: "0.2em",
              color: "#f0f4f8",
              marginBottom: "1.25rem",
              paddingBottom: "0.5rem",
              borderBottom: `1px solid ${GLOW_BLUE}22`,
            }}>
              WERKGEBIED
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Groningen",
                "Assen",
                "Leeuwarden",
                "Drachten",
                "Emmen",
                "Meppel",
                "Zwolle",
                "Heel Nederland",
              ].map((city) => (
                <li key={city} style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(240,244,248,0.45)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}>
                  <span style={{ color: `${GLOW_BLUE}55`, fontSize: "0.55rem" }}>◆</span>
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: `1px solid rgba(255,255,255,0.06)`,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(240,244,248,0.3)",
              margin: 0,
            }}>
              © {currentYear} SoundVision Events — DJ Tonicity. Alle rechten voorbehouden.
            </p>
            {/* Legal links */}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Privacybeleid", href: "#" },
                { label: "Algemene Voorwaarden", href: "#" },
                { label: "Cookiebeleid", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(240,244,248,0.3)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GLOW_BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,244,248,0.3)")}
                >
                  {link.label}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.72rem",
            color: "rgba(240,244,248,0.2)",
            margin: 0,
            textAlign: "center",
          }}>
            KvK: [uw KvK-nummer] · BTW: [uw BTW-nummer] · Groningen, Nederland
          </p>
        </div>
      </div>
    </footer>
  );
}
