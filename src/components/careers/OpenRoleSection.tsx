"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSectionTheme } from "@/context/SectionThemeContext";
import DepartmentSelectionModal from "@/components/careers/DepartmentSelectionModal";
import {
  CAREERS_DEPARTMENTS,
  CAREERS_INTERNSHIP_ROLES,
  type CareersDepartment,
  type CareersRole,
} from "@/data/careersDepartments";

interface OpenRolesSectionProps {
  theme?: "dark" | "light";
}

const cards = [
  {
    title: "Internships",
    desc: "Start with real work, real mentorship, and real expectations. Our internships are structured to build, not busy-work.",
    linkLabel: "Internship Roles",
    mode: "internship" as const,
  },
  {
    title: "Full-Time Positions",
    desc: "Join a team that values clarity, ownership, and craft. Roles across strategy, digital, data, and AI.",
    linkLabel: "Full-Time Roles",
    mode: "full-time" as const,
  },
];

export default function OpenRolesSection({ theme }: OpenRolesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"full-time" | "internship">("full-time");
  const [step, setStep] = useState<"department" | "role" | "form">("department");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const selectedDepartment = useMemo<CareersDepartment | null>(
    () => CAREERS_DEPARTMENTS.find((d) => d.id === selectedDepartmentId) ?? null,
    [selectedDepartmentId]
  );

  const internshipRoles = useMemo<CareersRole[]>(() => CAREERS_INTERNSHIP_ROLES, []);

  const openModal = (mode: "full-time" | "internship") => {
    setModalMode(mode);
    setSelectedRoleId(null);
    if (mode === "internship") {
      setSelectedDepartmentId(null);
      setStep("role");
    } else {
      setStep("department");
    }
    setModalOpen(true);
  };

  return (
    <section
      id="open-positions"
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Outer wrapper */}
          <div
            className={[
              "flex flex-col transition-colors duration-700",
              isDark ? "bg-[#0a0a0a]" : "bg-[#FAFAFA]",
            ].join(" ")}
            style={{ gap: 40 }}
          >

            {/* Heading */}
            <div
              className={[
                "font-bold leading-[1.15] transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
              style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)" }}
            >
              Open{" "}
              <span className="font-normal">Roles</span>
              <span className="text-[#E21F26]">.</span>
            </div>

            {/* Subtitle */}
            <div
              className={[
                "font-light text-[16px] leading-[29px] transition-colors duration-700",
                isDark ? "text-[#737373]" : "text-[#A1A1A1]",
              ].join(" ")}
            >
              <div>If this feels like your kind of place,</div>
              <div>start here:</div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {cards.map(({ title, desc, linkLabel, mode }, index) => (
                <div
                  key={title}
                  className={[
                    "flex flex-col transition-colors duration-700",
                    isDark
                      ? "bg-[#111111] border border-[#2a2a2a]"
                      : "bg-white border border-[#E5E5E5]",
                    index === 1
                      ? isDark
                        ? "md:border-l-0"
                        : "md:border-l-0"
                      : "",
                  ].join(" ")}
                  style={{ padding: "49px 49px 40px", gap: 16 }}
                >
                  {/* Title */}
                  <div
                    className={[
                      "text-[32px] font-normal leading-[38px] transition-colors duration-700",
                      isDark ? "text-white" : "text-[#0A0A0A]",
                    ].join(" ")}
                  >
                    {title}
                  </div>

                  {/* Description */}
                  <div
                    className={[
                      "text-[15px] font-light leading-[26px] transition-colors duration-700",
                      isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                    ].join(" ")}
                  >
                    {desc}
                  </div>

                  {/* Link */}
                  <button
                    type="button"
                    onClick={() => openModal(mode)}
                    className={[
                      "group mt-2 inline-flex items-center gap-[15px]",
                      "text-[14px] font-normal leading-[18px] no-underline",
                      "transition-colors duration-300",
                      isDark ? "text-white" : "text-[#000000]",
                    ].join(" ")}
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
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom line */}
            <div
              className={[
                "text-[14px] font-bold leading-[25px] transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
            >
              No hype. Just an{" "}
              <span className="text-[#E21F26]">honest start.</span>
            </div>

          </div>
        </div>
      </div>

      <DepartmentSelectionModal
        open={modalOpen}
        mode={modalMode}
        step={step}
        departments={CAREERS_DEPARTMENTS}
        internshipRoles={internshipRoles}
        selectedDepartmentId={selectedDepartmentId}
        selectedRoleId={selectedRoleId}
        onSelectDepartment={(id) => {
          setSelectedDepartmentId(id);
          setSelectedRoleId(null);
        }}
        onSelectRole={(id) => setSelectedRoleId(id)}
        onClose={() => setModalOpen(false)}
        onBack={() => {
          if (modalMode === "internship") {
            if (step === "form") {
              setStep("role");
            } else {
              setModalOpen(false);
            }
            return;
          }

          if (step === "form") {
            setStep("role");
            return;
          }

          setStep("department");
          setSelectedRoleId(null);
        }}
        onNext={() => {
          if (step === "department") {
            if (!selectedDepartment) return;
            setStep("role");
            return;
          }

          if (step === "role") {
            if (!selectedRoleId) return;
            setStep("form");
          }
        }}
      />
    </section>
  );
}
