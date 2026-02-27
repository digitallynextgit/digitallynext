export default function GrowthSection() {
  return (
    <section className="pt-16 lg:pt-[129px]">
      <div style={{ borderTop: "1px solid #E5E5E5" }}>
        <div className="container">
          <div style={{ maxWidth: 1103 }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.975rem)",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              How Growth Actually Happens...
            </h2>
            <div
              style={{
                marginTop: 24,
                color: "#A1A1A1",
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              <div>
                You won&apos;t be &quot;trained&quot; for months before doing
                real work.
              </div>
              <div>
                And you won&apos;t be thrown into the deep end without context.
              </div>
            </div>

            <div style={{ marginTop: 80, borderTop: "1px solid #E5E5E5" }}>
              {[
                {
                  num: "01",
                  title: "Learn by building",
                  desc: "Real projects from day one. You learn by doing the work — not watching someone else do it.",
                  bg: "transparent",
                },
                {
                  num: "02",
                  title: "Grow by owning",
                  desc: "Ownership isn't a perk. It's the default. You'll own outcomes, not just tasks.",
                  bg: "#F5F5F5",
                },
                {
                  num: "03",
                  title: "Improve by questioning",
                  desc: "We don't reward blind agreement. We reward people who ask better questions.",
                  bg: "transparent",
                  borderBottom: true,
                },
              ].map(({ num, title, desc, bg, borderBottom }) => (
                <div
                  key={num}
                  style={{
                    background: bg,
                    padding: "44px 0",
                    borderTop: "1px solid #E5E5E5",
                    ...(borderBottom
                      ? { borderBottom: "1px solid #E5E5E5" }
                      : {}),
                  }}
                  className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[80px_minmax(0,435px)_minmax(0,1fr)] lg:items-center lg:gap-0"
                >
                  <div
                    style={{
                      color: "#D4D4D4",
                      fontSize: 13,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{ fontSize: 28, fontWeight: 400, color: "#000000" }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "#A1A1A1",
                    }}
                  >
                    {desc}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 64,
                color: "#A1A1A1",
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.8,
              }}
            >
              <div>Growth here isn&apos;t loud.</div>
              <div>But it is real — and it compounds.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
