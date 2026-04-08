/**
 * SoundVision Events — Bruiloft Contact Form
 * Dedicated wedding inquiry form with rose accent styling.
 * Reuses the existing contact.submit tRPC procedure.
 * Includes wedding-specific fields: ceremony time, venue, first dance song.
 */
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Phone, Mail, MapPin, Heart, Music, Calendar, Users, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const ROSE        = "#ff3d8a";
const ROSE_SOFT   = "#ff80b3";
const ROSE_GLOW   = "rgba(255,61,138,0.30)";
const ROSE_GLOW_S = "rgba(255,61,138,0.12)";
const ROSE_GLOW_XS = "rgba(255,61,138,0.07)";

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: `1px solid rgba(255,61,138,0.18)`,
  borderRadius: "10px",
  padding: "0.8rem 1rem",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.9rem",
  color: "#f0f4f8",
  outline: "none",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.72rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: ROSE_SOFT,
  marginBottom: "0.4rem",
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
};

function Field({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>
        {icon}
        {label}
        {required && <span style={{ color: ROSE, marginLeft: "2px" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function BruiloftContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    location: "",
    guestCount: "",
    packageType: "",
    firstDanceSong: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Uw bruiloftaanvraag is verstuurd! DJ Tonicity neemt binnen 24 uur contact op.", {
        duration: 6000,
      });
    },
    onError: () => {
      toast.error("Er ging iets mis. Probeer het opnieuw of bel ons direct op 06 22764233.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Vul minimaal uw naam en e-mailadres in.");
      return;
    }
    // Compose a rich message that includes wedding-specific fields
    const weddingDetails = [
      form.firstDanceSong ? `Eerste dans: "${form.firstDanceSong}"` : null,
      form.message ? form.message : null,
    ].filter(Boolean).join("\n\n");

    submitMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      eventType: "Bruiloft",
      eventDate: form.eventDate || undefined,
      location: form.location || undefined,
      packageType: form.packageType || undefined,
      guestCount: form.guestCount || undefined,
      message: weddingDetails || undefined,
    });
  };

  const getFocusStyle = (name: string): React.CSSProperties =>
    focusedField === name
      ? { borderColor: ROSE, boxShadow: `0 0 0 3px ${ROSE_GLOW_S}` }
      : {};

  if (submitted) {
    return (
      <section
        id="bruiloft-contact"
        className="relative py-24 overflow-hidden"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Keyframes for the confirmation animations */}
        <style>{`
          @keyframes svConfirmFadeIn {
            from { opacity: 0; transform: translateY(32px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0)   scale(1);    }
          }
          @keyframes svCheckPulse {
            0%, 100% { filter: drop-shadow(0 0 8px ${ROSE}) drop-shadow(0 0 20px ${ROSE_GLOW}); }
            50%       { filter: drop-shadow(0 0 18px ${ROSE}) drop-shadow(0 0 40px ${ROSE_GLOW}); }
          }
          @keyframes svGlowBurst {
            0%   { opacity: 0.0; transform: scale(0.5); }
            30%  { opacity: 0.5; }
            100% { opacity: 0.0; transform: scale(2.2); }
          }
          @keyframes svStepSlide {
            from { opacity: 0; transform: translateX(-16px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(8,4,20,0.70)", pointerEvents: "none", zIndex: 0 }}
        />

        {/* Radial glow burst behind the card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ROSE_GLOW} 0%, transparent 70%)`,
            animation: "svGlowBurst 1.4s ease-out forwards",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative"
          style={{ zIndex: 1, textAlign: "center", maxWidth: "640px" }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, rgba(20,8,50,0.75), ${ROSE_GLOW_XS})`,
              border: `1px solid ${ROSE}55`,
              borderRadius: "24px",
              padding: "3.5rem 2.5rem",
              boxShadow: `0 0 80px ${ROSE_GLOW_S}, 0 8px 48px rgba(0,0,0,0.55)`,
              animation: "svConfirmFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            {/* Pulsing checkmark */}
            <div style={{ marginBottom: "1.5rem" }}>
              <CheckCircle2
                size={64}
                style={{
                  color: ROSE,
                  margin: "0 auto",
                  display: "block",
                  animation: "svCheckPulse 2s ease-in-out infinite",
                }}
              />
            </div>

            {/* Heading */}
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                color: "#f0f4f8",
                letterSpacing: "0.06em",
                marginBottom: "0.75rem",
              }}
            >
              Aanvraag Ontvangen!
            </h3>

            {/* Accent divider */}
            <div
              style={{
                width: "60px",
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${ROSE}, transparent)`,
                margin: "0 auto 1.25rem",
                borderRadius: "2px",
              }}
            />

            {/* Confirmation text */}
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                color: "rgba(240,244,248,0.80)",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Bedankt voor uw bruiloftaanvraag. DJ Tonicity neemt{" "}
              <strong style={{ color: ROSE_SOFT, fontWeight: 500 }}>binnen 24 uur</strong>{" "}
              persoonlijk contact met u op om uw trouwdag te bespreken.
            </p>

            {/* What happens next — timeline */}
            <div
              style={{
                textAlign: "left",
                background: "rgba(255,61,138,0.06)",
                border: `1px solid ${ROSE}22`,
                borderRadius: "14px",
                padding: "1.25rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  color: ROSE_SOFT,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Wat gebeurt er nu?
              </p>
              {[
                { step: "1", text: "DJ Tonicity bekijkt uw aanvraag en datum" },
                { step: "2", text: "U ontvangt een persoonlijk bericht binnen 24 uur" },
                { step: "3", text: "Vrijblijvend kennismakingsgesprek — online of op locatie" },
                { step: "4", text: "Offerte op maat voor uw trouwdag" },
              ].map((item, i) => (
                <div
                  key={item.step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    marginBottom: i < 3 ? "0.6rem" : 0,
                    animation: `svStepSlide 0.4s ease ${0.3 + i * 0.12}s both`,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${ROSE}, #c0185e)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#fff",
                      marginTop: "1px",
                    }}
                  >
                    {item.step}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.88rem",
                      color: "rgba(240,244,248,0.75)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="tel:+31622764233"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  background: `linear-gradient(135deg, ${ROSE} 0%, #c0185e 100%)`,
                  color: "#fff",
                  borderRadius: "10px",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  boxShadow: `0 0 24px ${ROSE_GLOW}`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 36px ${ROSE_GLOW}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 24px ${ROSE_GLOW}`;
                }}
              >
                <Phone size={16} /> Direct Bellen
              </a>
              <a
                href={`https://wa.me/31622764233?text=${encodeURIComponent("Hallo DJ Tonicity, ik heb zojuist een bruiloftaanvraag ingediend via de website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  background: "transparent",
                  color: ROSE,
                  border: `1.5px solid ${ROSE}`,
                  borderRadius: "10px",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = ROSE_GLOW_S;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="bruiloft-contact"
      className="relative py-24 overflow-hidden"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8,4,20,0.70)", pointerEvents: "none", zIndex: 0 }}
      />
      {/* Rose glow accents */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 10% 30%, ${ROSE_GLOW_XS} 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 90% 70%, rgba(180,0,100,0.06) 0%, transparent 60%)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        {/* Section header */}
        <div className="text-center mb-14 sv-fade-up sv-zoom-reveal">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.35em",
              color: ROSE_SOFT,
              textTransform: "uppercase",
            }}
          >
            Vrijblijvende Offerte
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.05,
              color: "#f0f4f8",
            }}
          >
            VRAAG UW{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ROSE}, #c0185e)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: `drop-shadow(0 0 16px ${ROSE_GLOW})`,
              }}
            >
              BRUILOFT DJ
            </span>{" "}
            AAN
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "rgba(240,244,248,0.6)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Vul het formulier in en ontvang binnen 24 uur een persoonlijke offerte op maat voor uw trouwdag.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* ── Left: contact info strip ── */}
          <div className="lg:col-span-2 sv-fade-up">
            {/* Quick contact */}
            <div
              style={{
                background: `linear-gradient(135deg, rgba(20,8,50,0.50), ${ROSE_GLOW_XS})`,
                border: `1px solid ${ROSE}33`,
                borderRadius: "16px",
                padding: "1.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  color: ROSE_SOFT,
                  marginBottom: "1.25rem",
                }}
              >
                Direct Contact
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: <Phone size={16} color={ROSE} />, label: "Telefoon", value: "06 22764233", href: "tel:+31622764233" },
                  { icon: <Mail size={16} color={ROSE} />, label: "E-mail", value: "info@soundvisionevents.nl", href: "mailto:info@soundvisionevents.nl" },
                  { icon: <MapPin size={16} color={ROSE} />, label: "Regio", value: "Groningen & Noord-Nederland", href: undefined },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "9px",
                        background: ROSE_GLOW_XS,
                        border: `1px solid ${ROSE}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "rgba(240,244,248,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#f0f4f8", textDecoration: "none" }}>
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#f0f4f8" }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why DJ Tonicity for your wedding */}
            <div
              style={{
                background: `linear-gradient(135deg, rgba(20,8,50,0.50), ${ROSE_GLOW_XS})`,
                border: `1px solid ${ROSE}33`,
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  color: ROSE_SOFT,
                  marginBottom: "1.25rem",
                }}
              >
                Waarom DJ Tonicity?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { icon: "💍", text: "Persoonlijk intakegesprek voor uw trouwdag" },
                  { icon: "🎵", text: "Muziek volledig afgestemd op uw smaak" },
                  { icon: "💡", text: "Professionele licht- en geluidsapparatuur" },
                  { icon: "🤝", text: "Geen boekingsbureaus — direct contact" },
                  { icon: "⭐", text: "9.8/10 op Trustoo — 500+ shows ervaring" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "rgba(240,244,248,0.75)", lineHeight: 1.5, fontWeight: 300 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-3 sv-fade-up">
            <form
              onSubmit={handleSubmit}
              style={{
                background: `linear-gradient(135deg, rgba(14,6,35,0.70), rgba(30,8,50,0.50))`,
                border: `1px solid ${ROSE}33`,
                borderRadius: "20px",
                padding: "2.25rem",
                boxShadow: `0 0 60px ${ROSE_GLOW_XS}`,
              }}
            >
              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Uw naam" icon={<Heart size={12} color={ROSE} />} required>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jan & Marie de Vries"
                    required
                    style={{ ...inputBase, ...getFocusStyle("name") }}
                  />
                </Field>
                <Field label="E-mailadres" icon={<Mail size={12} color={ROSE} />} required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="jullie@email.nl"
                    required
                    style={{ ...inputBase, ...getFocusStyle("email") }}
                  />
                </Field>
              </div>

              {/* Row 2: Phone + Date */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Telefoonnummer" icon={<Phone size={12} color={ROSE} />}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="06 12345678"
                    style={{ ...inputBase, ...getFocusStyle("phone") }}
                  />
                </Field>
                <Field label="Trouwdatum" icon={<Calendar size={12} color={ROSE} />}>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("eventDate")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputBase,
                      ...getFocusStyle("eventDate"),
                      colorScheme: "dark",
                    }}
                  />
                </Field>
              </div>

              {/* Row 3: Location + Guest count */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Locatie / Feestzaal" icon={<MapPin size={12} color={ROSE} />}>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("location")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Naam locatie, stad"
                    style={{ ...inputBase, ...getFocusStyle("location") }}
                  />
                </Field>
                <Field label="Aantal gasten" icon={<Users size={12} color={ROSE} />}>
                  <select
                    name="guestCount"
                    value={form.guestCount}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("guestCount")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputBase,
                      ...getFocusStyle("guestCount"),
                      cursor: "pointer",
                    }}
                  >
                    <option value="" style={{ background: "#0d0520" }}>Selecteer...</option>
                    <option value="tot 50" style={{ background: "#0d0520" }}>Tot 50 gasten</option>
                    <option value="50-100" style={{ background: "#0d0520" }}>50 – 100 gasten</option>
                    <option value="100-150" style={{ background: "#0d0520" }}>100 – 150 gasten</option>
                    <option value="150-200" style={{ background: "#0d0520" }}>150 – 200 gasten</option>
                    <option value="200+" style={{ background: "#0d0520" }}>200+ gasten</option>
                  </select>
                </Field>
              </div>

              {/* Row 4: Package */}
              <div className="mb-4">
                <Field label="Gewenst pakket" icon={<Music size={12} color={ROSE} />}>
                  <select
                    name="packageType"
                    value={form.packageType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("packageType")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...inputBase,
                      ...getFocusStyle("packageType"),
                      cursor: "pointer",
                    }}
                  >
                    <option value="" style={{ background: "#0d0520" }}>Selecteer een pakket...</option>
                    <option value="Intiem" style={{ background: "#0d0520" }}>Intiem — Compact show (tot 80 pers.)</option>
                    <option value="Luxe" style={{ background: "#0d0520" }}>Luxe — Complete show (tot 150 pers.) ★ Meest gekozen</option>
                    <option value="Elite" style={{ background: "#0d0520" }}>Elite — Premium show (150+ pers.)</option>
                    <option value="Weet ik nog niet" style={{ background: "#0d0520" }}>Weet ik nog niet — advies gewenst</option>
                  </select>
                </Field>
              </div>

              {/* Row 5: First dance song */}
              <div className="mb-4">
                <Field label="Eerste dans nummer (optioneel)" icon={<Heart size={12} color={ROSE} />}>
                  <input
                    type="text"
                    name="firstDanceSong"
                    value={form.firstDanceSong}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("firstDanceSong")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Artiest — Titel van het nummer"
                    style={{ ...inputBase, ...getFocusStyle("firstDanceSong") }}
                  />
                </Field>
              </div>

              {/* Row 6: Message */}
              <div className="mb-6">
                <Field label="Overige wensen of vragen" icon={<MessageSquare size={12} color={ROSE} />}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Vertel ons meer over uw trouwdag, sfeer, muziekwensen..."
                    rows={4}
                    style={{
                      ...inputBase,
                      ...getFocusStyle("message"),
                      resize: "vertical",
                      minHeight: "100px",
                    }}
                  />
                </Field>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitMutation.isPending}
                style={{
                  width: "100%",
                  padding: "1rem 2rem",
                  background: submitMutation.isPending
                    ? "rgba(255,61,138,0.4)"
                    : `linear-gradient(135deg, ${ROSE} 0%, #c0185e 100%)`,
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1rem",
                  letterSpacing: "0.12em",
                  cursor: submitMutation.isPending ? "not-allowed" : "pointer",
                  boxShadow: submitMutation.isPending ? "none" : `0 0 28px ${ROSE_GLOW}, 0 4px 20px rgba(0,0,0,0.4)`,
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                }}
                onMouseEnter={(e) => {
                  if (!submitMutation.isPending) {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 45px ${ROSE_GLOW}, 0 6px 30px rgba(0,0,0,0.5)`;
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${ROSE_GLOW}, 0 4px 20px rgba(0,0,0,0.4)`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <Send size={18} />
                {submitMutation.isPending ? "Versturen..." : "Stuur Bruiloftaanvraag"}
              </button>

              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(240,244,248,0.35)",
                  textAlign: "center",
                  marginTop: "1rem",
                  lineHeight: 1.5,
                }}
              >
                Uw gegevens worden vertrouwelijk behandeld en nooit gedeeld met derden.
                DJ Tonicity reageert persoonlijk binnen 24 uur.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
