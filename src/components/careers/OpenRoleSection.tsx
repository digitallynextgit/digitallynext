import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Internships",
    desc: "Start with real work, real mentorship, and real expectations. Our internships are structured to build, not busy-work.",
    linkLabel: "Internship Roles",
    href: "#internships",
  },
  {
    title: "Full-Time Positions",
    desc: "Join a team that values clarity, ownership, and craft. Roles across strategy, digital, data, and AI.",
    linkLabel: "Full-Time Roles",
    href: "#full-time",
  },
];

export default function OpenRolesSection() {
  return (
    <section>
      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Outer wrapper — #FAFAFA background, padding 32px */}
          <div
            style={{
              background: "#FAFAFA",
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            {/* Heading */}
            <div
              style={{
                fontSize: "clamp(2rem, 4vw, 2.975rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#000000",
              }}
            >
              Open{" "}
              <span className="font-normal">Roles</span>
              <span style={{ color: "#E21F26" }}>.</span>
            </div>

            {/* Subtitle */}
            <div
              style={{
                color: "#A1A1A1",
                fontWeight: 300,
                fontSize: 16,
                lineHeight: "29px",
              }}
            >
              <div>If this feels like your kind of place,</div>
              <div>start here:</div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {cards.map(({ title, desc, linkLabel, href }, index) => (
                <div
                  key={title}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    padding: "49px 49px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    ...(index === 1
                      ? { borderLeft: "none" }
                      : {}),
                  }}
                >
                  {/* Title */}
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 400,
                      lineHeight: "38px",
                      color: "#0A0A0A",
                    }}
                  >
                    {title}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 300,
                      lineHeight: "26px",
                      color: "#A1A1A1",
                    }}
                  >
                    {desc}
                  </div>

                  {/* Link */}
                  <Link
                    href={href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 15,
                      color: "#000000",
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "18px",
                      textDecoration: "none",
                      marginTop: 8,
                    }}
                    className="group"
                  >
                    <Image
                      src="/figma/careers/careers-arrow-link.svg"
                      alt=""
                      width={19}
                      height={10}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span className="group-hover:text-[#E21F26] transition-colors duration-300">
                      {linkLabel}
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Bottom line */}
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "25px",
                color: "#000000",
              }}
            >
              No hype. Just an{" "}
              <span style={{ color: "#E21F26" }}>honest start.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
