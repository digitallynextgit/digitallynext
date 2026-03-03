"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSectionTheme } from "@/context/SectionThemeContext";
import DepartmentSelectionModal from "@/components/careers/DepartmentSelectionModal";
import {
  CAREERS_DEPARTMENTS,
  CAREERS_INTERNSHIP_DEPARTMENTS,
  type CareersDepartment,
  type CareersModalStep,
} from "@/data/careersDepartments";

interface OpenRolesSectionProps {
  theme?: "dark" | "light";
}

const CARDS = [
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
  const [step, setStep] = useState<CareersModalStep>("department");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const departments = useMemo<CareersDepartment[]>(
    () => (modalMode === "internship" ? CAREERS_INTERNSHIP_DEPARTMENTS : CAREERS_DEPARTMENTS),
    [modalMode]
  );

  const openModal = (mode: "full-time" | "internship") => {
    setModalMode(mode);
    setSelectedDepartmentId(null);
    setSelectedRoleId(null);
    setStep("department");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleBack = () => {
    if (step === "form") { setStep("description"); return; }
    if (step === "description") { setStep("role"); return; }
    if (step === "role") { setSelectedRoleId(null); setStep("department"); return; }
    handleClose();
  };

  return (
    <section
      id="open-positions"
      className={["transition-colors duration-700", isDark ? "bg-black" : "bg-[#FAFAFA]"].join(" ")}
      style={{ padding: "72px 0" }}
    >
      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1236, padding: "48px 32px" }} className="w-full">
          <div
            className={["flex flex-col transition-colors duration-700", isDark ? "bg-black" : "bg-[#FAFAFA]"].join(" ")}
            style={{ gap: 40 }}
          >
            <div
              className="flex flex-col md:flex-row md:items-start md:justify-between"
              style={{ gap: 40 }}
            >
              <div className="flex flex-col" style={{ gap: 24 }}>
                <h2
                  className={["font-normal leading-[1.15] transition-colors duration-700", isDark ? "text-white" : "text-black"].join(" ")}
                  style={{ fontSize: 47.565 }}
                >
                  Open Roles<span className="text-[#E21F26]">.</span>
                </h2>
                <div
                  className={["font-light text-[16px] leading-[29px] transition-colors duration-700", isDark ? "text-[#737373]" : "text-[#A1A1A1]"].join(" ")}
                >
                  <div>If this feels like your kind of place,</div>
                  <div>start here:</div>
                </div>
              </div>
              <div
                className={["text-[14px] font-bold leading-[1.3] transition-colors duration-700", isDark ? "text-white" : "text-black"].join(" ")}
              >
                No hype. Just an <div className="text-[#E21F26] uppercase text-3xl">honest start.</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {CARDS.map(({ title, desc, linkLabel, mode }, index) => (
                <div
                  key={title}
                  className={[
                    "flex flex-col transition-colors duration-700",
                    isDark ? "bg-[#111111] border border-[#2a2a2a]" : "bg-white border border-[#E5E5E5]",
                    index === 1 ? "md:border-l-0" : "",
                  ].join(" ")}
                  style={{ padding: "49px 49px 49px", gap: 16 }}
                >
                  <div className={["text-[32px] font-normal leading-[38px] transition-colors duration-700", isDark ? "text-white" : "text-[#0A0A0A]"].join(" ")}>
                    {title}
                  </div>
                  <div className={["text-[15px] font-light leading-[26px] transition-colors duration-700", isDark ? "text-[#737373]" : "text-[#A1A1A1]"].join(" ")}>
                    {desc}
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal(mode)}
                    className={[
                      "group mt-2 inline-flex items-center gap-[15px]",
                      "text-[14px] font-normal leading-[18px] transition-colors duration-300",
                      isDark ? "text-white" : "text-black",
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
            <div className="flex flex-col items-center" style={{ gap: 16 }}>
              <div
                className={["text-[16px] font-normal leading-[21px] transition-colors duration-700 text-center", isDark ? "text-white" : "text-black"].join(" ")}
              >
                Or Send us your CV at
              </div>
              <a
                href="mailto:careers@digitallynext.com"
                className={[
                  "inline-flex items-center justify-center rounded-[5px] border text-[16px] font-bold leading-[21px] transition-colors duration-300",
                  isDark ? "border-white/40 text-white hover:text-[#E21F26]" : "border-[#787878] text-[#E21F26]",
                ].join(" ")}
                style={{ padding: "8px 32px" }}
              >
                careers@digitallynext.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <DepartmentSelectionModal
        open={modalOpen}
        mode={modalMode}
        step={step}
        departments={departments}
        selectedDepartmentId={selectedDepartmentId}
        selectedRoleId={selectedRoleId}
        onSelectDepartment={(id) => {
          setSelectedDepartmentId(id);
          setSelectedRoleId(null);
          setStep("role");
        }}
        onSelectRole={(id) => {
          setSelectedRoleId(id);
          setStep("description");
        }}
        onApplyNow={() => setStep("form")}
        onClose={handleClose}
        onBack={handleBack}
      />
    </section>
  );
}
