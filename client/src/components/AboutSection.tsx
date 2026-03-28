/**
 * SoundVision Events — About Section
 * DJ Tonicity introduction with asymmetric layout
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#0a0f15" }}
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-5"
        style={{
          background: "radial-gradient(ellipse at right center, #00c8ff 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative sv-fade-up order-2 lg:order-1">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(0, 200, 255, 0.2)",
                boxShadow: "0 0 40px rgba(0, 200, 255, 0.1)",
              }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj-tonicity_upscaled_7a714cfd.jpg"
                alt="DJ Tonicity — SoundVision Events"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(8,12,16,0.8) 0%, transparent 50%)",
                }}
              />
              {/* Name badge */}
              <div
                className="absolute bottom-6 left-6"
                style={{
                  background: "rgba(8, 12, 16, 0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  borderRadius: "8px",
                  padding: "0.75rem 1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    letterSpacing: "0.08em",
                    color: "#f0f4f8",
                    lineHeight: 1,
                  }}
                >
                  DJ TONICITY
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    color: "#00c8ff",
                    marginTop: "2px",
                  }}
                >
                  ALLROUND DJ @ SOUNDVISION EVENTS
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #ff5500 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <div className="sv-fade-up">
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "#00c8ff",
                  textTransform: "uppercase",
                }}
              >
                Over DJ Tonicity (Bert)
              </span>
              <h2
                className="mt-3 mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.05,
                  color: "#f0f4f8",
                }}
              >
                UW ALLROUND DJ
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  VOOR ELKE GELEGENHEID
                </span>
              </h2>
            </div>

            <div className="sv-fade-up space-y-4">
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(240, 244, 248, 0.75)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Welkom bij SoundVision Events. Ik ben DJ Tonicity, uw allround DJ in Groningen en Noord-Nederland. Met meer dan 10 jaar ervaring in de DJ-wereld zorg ik ervoor dat uw feest een onvergetelijke ervaring wordt — van Groningen tot Friesland, Drenthe en Overijssel.
              </p>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(240, 244, 248, 0.75)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Van intieme bruiloften tot grote bedrijfsfeesten, studentenfeesten en privé gelegenheden — ik pas mijn muziek en show volledig aan op uw wensen en de sfeer van uw evenement. Professionele apparatuur, betrouwbare service en een passie voor muziek zijn mijn garantie.
              </p>
            </div>

            {/* Features */}
            <div className="sv-fade-up grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: "🎵", title: "Muziek op Maat", desc: "Volledig afgestemd op uw wensen" },
                { icon: "🎛️", title: "Pro Apparatuur", desc: "Pioneer DJ setup" },
                { icon: "💡", title: "Lichtshow", desc: "Professionele verlichting" },
                { icon: "🎤", title: "MC Service", desc: "Presentatie & aankondigingen" },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{feat.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#f0f4f8",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {feat.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(240, 244, 248, 0.5)",
                    }}
                  >
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="sv-fade-up mt-8">
              <button
                className="sv-btn-primary"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Maak Kennis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
