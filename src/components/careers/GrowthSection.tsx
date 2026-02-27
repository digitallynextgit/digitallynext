"use client";

export default function GrowthSection() {
  const items = [
    {
      num: "01",
      title: { bold: "Learn", rest: " by building" },
      desc: "Real projects from day one. You learn by doing the work — not watching someone else do it.",
    },
    {
      num: "02",
      title: { bold: "Grow", rest: " by owning" },
      desc: "Ownership isn't a perk. It's the default. You'll own outcomes, not just tasks.",
    },
    {
      num: "03",
      title: { bold: "Improve", rest: " by questioning" },
      desc: "We don't reward blind agreement. We reward people who ask better questions.",
      borderBottom: true,
    },
  ];

  return (
    <section className="">
      <div style={{ borderTop: "1px solid #E5E5E5" }} />
      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1103 }} className="py-12 md:py-16 lg:py-20">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.975rem)",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            How{" "}
            <span style={{ color: "#E21F26" }} className="font-semibold">
              Growth
            </span>{" "}
            Actually Happens
            <span style={{ color: "#0EC8C5" }}>...</span>
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
            <div>You won&apos;t be &quot;trained&quot; for months before doing real work.</div>
            <div>And you won&apos;t be thrown into the deep end without context.</div>
          </div>

          <div style={{ marginTop: 80, borderTop: "1px solid #E5E5E5" }}>
            {items.map(({ num, title, desc, borderBottom }) => (
              <div
                key={num}
                style={{
                  padding: "44px 0",
                  borderTop: "1px solid #E5E5E5",
                  ...(borderBottom ? { borderBottom: "1px solid #E5E5E5" } : {}),
                  transition: "background 0.3s ease",
                }}
                className="group grid grid-cols-1 items-start gap-3 lg:grid-cols-[80px_minmax(0,435px)_minmax(0,1fr)] lg:items-center lg:gap-0 hover:bg-[#F5F5F5] cursor-default"
              >
                {/* Number */}
                <div
                  style={{ fontSize: 13, letterSpacing: "0.05em" }}
                  className="text-[#D4D4D4] group-hover:text-[#A1A1A1] transition-colors duration-300"
                >
                  {num}
                </div>

                {/* Title */}
                <div style={{ fontSize: 28, fontWeight: 400 }} className="text-[#000000]">
                  <span className="font-bold group-hover:text-[#E21F26] transition-colors duration-300">
                    {title.bold}
                  </span>
                  {title.rest}
                </div>

                {/* Description */}
                <div
                  style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7 }}
                  className="text-[#A1A1A1] group-hover:text-[#737373] transition-colors duration-300"
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
            <div>But it&apos;s real — and it compounds.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
