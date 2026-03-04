"use client";

import { X, ChevronLeft, Upload, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import toast from "react-hot-toast";
import type {
  CareersDepartment,
  CareersRole,
  CareersTone,
  CareersModalStep,
} from "@/data/careersDepartments";

// ─── Tone helpers ─────────────────────────────────────────────────────────────

function getToneClasses(tone: CareersTone) {
  if (tone === "red") {
    return {
      cardBg: "bg-[#FDF2F2]",
      cardBgHover: "hover:bg-[#fae8e8]",
      titleColor: "text-[#E21F26]",
      ringColor: "ring-[#E21F26]",
      dotColor: "text-[#E21F26]",
      badgeBg: "bg-[#FDF2F2] text-[#E21F26]",
    };
  }
  return {
    cardBg: "bg-[#F1FBFB]",
    cardBgHover: "hover:bg-[#e3f7f7]",
    titleColor: "text-[#16B8B8]",
    ringColor: "ring-[#16B8B8]",
    dotColor: "text-[#16B8B8]",
    badgeBg: "bg-[#F1FBFB] text-[#16B8B8]",
  };
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      "a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex='-1'])"
    )
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalMode = "full-time" | "internship";

interface ModalProps {
  open: boolean;
  mode: ModalMode;
  step: CareersModalStep;
  departments: CareersDepartment[];
  selectedDepartmentId: string | null;
  selectedRoleId: string | null;
  onSelectDepartment: (id: string) => void;
  onSelectRole: (id: string) => void;
  onApplyNow: () => void;
  onClose: () => void;
  onBack: () => void;
}

// ─── Form ─────────────────────────────────────────────────────────────────────

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  message: string;
  resume: File | null;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

function makeEmptyForm(): FormFields {
  return {
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    message: "",
    resume: null,
  };
}

function validateForm(f: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!f.fullName.trim()) errors.fullName = "Full name is required.";
  if (!f.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!f.phone.trim()) errors.phone = "Phone number is required.";
  if (!f.linkedIn.trim()) errors.linkedIn = "LinkedIn profile URL is required.";
  if (!f.portfolio.trim()) errors.portfolio = "Portfolio / work link is required.";
  if (!f.resume) errors.resume = "Resume is required.";
  return errors;
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
  fullWidth,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={["flex flex-col gap-1.5", fullWidth ? "md:col-span-2" : ""].join(" ")}>
      <span className="text-sm font-semibold text-black">
        {label}
        {required && <span className="ml-0.5 text-[#E21F26]">*</span>}
      </span>
      {children}
      {error && <span className="text-xs text-[#E21F26]">{error}</span>}
    </label>
  );
}

const inputCls = (hasError: boolean) =>
  [
    "h-11 w-full rounded border px-4 text-sm text-black outline-none transition cursor-text",
    "focus:ring-2 focus:ring-black/20",
    hasError ? "border-[#E21F26] bg-red-50" : "border-black/15 bg-white",
  ].join(" ");

// ─── Main component ───────────────────────────────────────────────────────────

export default function DepartmentSelectionModal({
  open,
  mode,
  step,
  departments,
  selectedDepartmentId,
  selectedRoleId,
  onSelectDepartment,
  onSelectRole,
  onApplyNow,
  onClose,
  onBack,
}: ModalProps) {
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormFields>(makeEmptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // ── Scroll to top whenever step changes ─────────────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // ── Reset form when going back to a non-form step ────────────────────────────
  useEffect(() => {
    if (!open || step === "form") return;
    setForm(makeEmptyForm());
    setErrors({});
    setSubmitStatus("idle");
    setSubmitError(null);
  }, [open, step]);

  // ── Focus trap + scroll lock ─────────────────────────────────────────────────
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); handleClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = getFocusableElements(panelRef.current);
      if (!focusable.length) { e.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey) {
        if (!active || active === first) { e.preventDefault(); last.focus(); }
      } else {
        if (active === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus();
    };
  }, [open, handleClose]);

  if (!open) return null;

  // ── Derived values ───────────────────────────────────────────────────────────
  const selectedDepartment = departments.find((d) => d.id === selectedDepartmentId) ?? null;
  const roles: CareersRole[] = selectedDepartment?.roles ?? [];
  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? null;
  const deptTone = selectedDepartment ? getToneClasses(selectedDepartment.tone) : null;

  const isDepartmentStep = step === "department";
  const isRoleStep = step === "role";
  const isDescriptionStep = step === "description";
  const isFormStep = step === "form";
  const isFormReady = Object.keys(validateForm(form)).length === 0;

  // ── Title ────────────────────────────────────────────────────────────────────
  const renderTitle = () => {
    if (isDepartmentStep) {
      return (
        <>
          Join Us At{" "}
          <span className="font-black">Digitally</span>{" "}
          <span className="text-[#E21F26]">Next</span>.
        </>
      );
    }
    if (selectedDepartment) {
      return (
        <>
          {selectedDepartment.title}
          <span className={deptTone?.dotColor ?? "text-[#E21F26]"}>.</span>
        </>
      );
    }
    return <>Open Roles<span className="text-[#E21F26]">.</span></>;
  };

  const renderSubtitle = () => {
    if (isDepartmentStep) return "Select a department to explore openings.";
    if (isRoleStep) return "Click on a role to view the full description.";
    if (isDescriptionStep) return "Review the role details below, then apply.";
    return "All fields are required except Message.";
  };

  // ── Back button label ────────────────────────────────────────────────────────
  const backLabel = () => {
    if (isDepartmentStep) return "Close";
    if (isRoleStep) return "All Departments";
    if (isDescriptionStep) return "All Roles";
    return "Back to Role";
  };

  // ── Resume handler ───────────────────────────────────────────────────────────
  const handleResumeFile = (file: File) => {
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, or DOCX files are accepted." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "File size must be under 5 MB." }));
      return;
    }
    setForm((prev) => ({ ...prev, resume: file }));
    setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitStatus("submitting");
    setSubmitError(null);

    try {
      const data = new FormData();
      data.append("fullName", form.fullName.trim());
      data.append("email", form.email.trim());
      data.append("phone", form.phone.trim());
      data.append("linkedIn", form.linkedIn.trim());
      data.append("portfolio", form.portfolio.trim());
      data.append("message", form.message.trim());
      data.append("track", mode === "internship" ? "Internship" : "Full-time");
      data.append("department", selectedDepartment?.title ?? "");
      data.append("role", selectedRole?.title ?? "");
      if (form.resume) data.append("resume", form.resume);

      const res = await fetch("/api/careers", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) throw new Error(json.error ?? "Submission failed. Please try again.");

      toast.success("Application submitted successfully.");
      setForm(makeEmptyForm());
      setErrors({});
      setSubmitStatus("idle");
      setSubmitError(null);
      setDragOver(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      handleClose();
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={panelRef}
        className="relative flex w-full flex-col overflow-hidden bg-white shadow-2xl"
        style={{ maxWidth: 1060, borderRadius: 5, maxHeight: "calc(100svh - 4rem)" }}
      >
        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-start justify-between gap-6 p-6 border-b">
          <div className="flex-1 min-w-0">
            <h2
              id={titleId}
              className="text-[clamp(24px,4vw,48px)] font-extrabold leading-tight tracking-tight text-black"
            >
              {renderTitle()}
            </h2>
            <p id={descId} className="mt-1.5 text-sm text-black/50">
              {renderSubtitle()}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/8 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <X strokeWidth={2.5} className="h-5 w-5" />
          </button>
        </div>

        {/* ── Scrollable body ──────────────────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* ════ STEP 1: DEPARTMENT ════════════════════════════════════════════ */}
          {isDepartmentStep && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => {
                const tone = getToneClasses(dept.tone);
                const isSelected = selectedDepartmentId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => onSelectDepartment(dept.id)}
                    className={[
                      "group flex min-h-41 md:min-h-75 flex-col justify-between rounded p-6 text-left transition-all duration-200 cursor-pointer",
                      tone.cardBg,
                      tone.cardBgHover,
                      isSelected ? `ring-2 ${tone.ringColor}` : `hover:ring-1 ${tone.ringColor}`,
                      "focus:outline-none focus:ring-2 focus:ring-black/25",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "text-[clamp(18px,2.2vw,28px)] font-extrabold leading-[1.1] tracking-tight",
                        tone.titleColor,
                      ].join(" ")}
                    >
                      {dept.title}
                    </div>
                    <div className="text-sm font-semibold text-black/60">{dept.jobsLabel}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ════ STEP 2: ROLE LIST ═════════════════════════════════════════════ */}
          {isRoleStep && selectedDepartment && (
            <div className="flex flex-col gap-3">
              {roles.map((role) => {
                const tone = getToneClasses(selectedDepartment.tone);
                const isSelected = selectedRoleId === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => onSelectRole(role.id)}
                    className={[
                      "flex w-full items-center justify-between rounded px-7 py-5 text-left transition-all duration-200 cursor-pointer",
                      "bg-[rgba(226,31,38,0.04)]",
                      "hover:bg-[rgba(226,31,38,0.09)]",
                      isSelected ? `ring-2 ${tone.ringColor}` : "",
                      "focus:outline-none focus:ring-2 focus:ring-black/20",
                    ].join(" ")}
                  >
                    {/* Left */}
                    <div className="flex flex-col gap-1.5">
                      <div
                        className="font-medium text-black"
                        style={{
                          fontSize: "clamp(18px, 2.8vw, 36px)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.15,
                        }}
                      >
                        {role.title}
                      </div>
                      {role.meta && (
                        <div className="text-sm font-normal capitalize text-black/55">
                          {role.meta}
                        </div>
                      )}
                    </div>

                    {/* Right arrow */}
                    <div className="ml-6 shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black/40 transition-all group-hover:bg-black/10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ════ STEP 3: ROLE DESCRIPTION ══════════════════════════════════════ */}
          {isDescriptionStep && selectedRole && (
            <div className="flex flex-col gap-6">
              {/* Role header card */}
              <div className="rounded border border-[#E5E5E5] bg-[#FAFAFA] px-7 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[clamp(20px,3vw,32px)] font-bold text-black leading-tight">
                      {selectedRole.title}
                    </div>
                    {selectedRole.meta && (
                      <div className="mt-1.5 text-sm text-black/50 capitalize">{selectedRole.meta}</div>
                    )}
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={onApplyNow}
                      className="inline-flex items-center justify-center border border-[#E21F26] bg-transparent px-8 py-3 text-sm font-bold text-[#E21F26] transition-all duration-200 hover:bg-[#E21F26] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E21F26]/50 rounded-full cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Description body */}
              {selectedRole.description && (
                <div className="flex flex-col gap-6">
                  {selectedRole.description.intro && (
                    <p className="text-[15px] leading-[1.75] text-black/70">
                      {selectedRole.description.intro}
                    </p>
                  )}

                  {selectedRole.description.jobEssence && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-black">Job Essence</h3>
                      <p className="text-[15px] leading-[1.75] text-black/70">
                        {selectedRole.description.jobEssence}
                      </p>
                    </div>
                  )}

                  {!!selectedRole.description.keyRequirements?.length && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-black">Key Requirements</h3>
                      <ul className="flex flex-col gap-2">
                        {selectedRole.description.keyRequirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-[15px] text-black/70">
                            <span className="mt-1.25 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E21F26]" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!!selectedRole.description.currentOpenings?.length && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-black">Current Openings</h3>
                      <ul className="flex flex-col gap-2">
                        {selectedRole.description.currentOpenings.map((opening, i) => (
                          <li key={i} className="flex items-start gap-3 text-[15px] text-black/70">
                            <span className="mt-1.25 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E21F26]" />
                            {opening}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Apply Now CTA */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={onApplyNow}
                  className="inline-flex items-center justify-center rounded-full bg-[#E21F26] px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E21F26]/50 cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}

          {/* ════ STEP 4: APPLICATION FORM ══════════════════════════════════════ */}
          {isFormStep && (
            <div className="mx-auto w-full">
              {/* Applying for banner */}
              <div className="mb-6 rounded border border-[#E5E5E5] bg-[#FAFAFA] px-6 py-5">
                <div className="text-xs font-bold uppercase tracking-widest text-black/40">
                  Applying for
                </div>
                <div className="mt-1 text-lg font-bold text-black">{selectedRole?.title ?? "—"}</div>
                <div className="mt-0.5 text-sm text-black/50">
                  {mode === "internship" ? "Internship" : "Full-time"}
                  {selectedDepartment ? ` · ${selectedDepartment.title}` : ""}
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Full Name" required error={errors.fullName}>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                    className={inputCls(!!errors.fullName)}
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={submitStatus === "submitting" || submitStatus === "success"}
                  />
                </Field>

                <Field label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className={inputCls(!!errors.email)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    disabled={submitStatus === "submitting" || submitStatus === "success"}
                  />
                </Field>

                <Field label="Phone Number" required error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className={inputCls(!!errors.phone)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    inputMode="tel"
                    disabled={submitStatus === "submitting" || submitStatus === "success"}
                  />
                </Field>

                <Field label="LinkedIn Profile" required error={errors.linkedIn}>
                  <input
                    type="url"
                    value={form.linkedIn}
                    onChange={(e) => setForm((p) => ({ ...p, linkedIn: e.target.value }))}
                    className={inputCls(!!errors.linkedIn)}
                    placeholder="https://linkedin.com/in/yourname"
                    inputMode="url"
                    disabled={submitStatus === "submitting" || submitStatus === "success"}
                  />
                </Field>

                <Field label="Portfolio / Work Link" required error={errors.portfolio} fullWidth>
                  <input
                    type="url"
                    value={form.portfolio}
                    onChange={(e) => setForm((p) => ({ ...p, portfolio: e.target.value }))}
                    className={inputCls(!!errors.portfolio)}
                    placeholder="https://yourportfolio.com or Behance / Dribbble link"
                    inputMode="url"
                    disabled={submitStatus === "submitting" || submitStatus === "success"}
                  />
                </Field>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-sm font-semibold text-black">
                    Resume<span className="ml-0.5 text-[#E21F26]">*</span>
                  </span>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files[0];
                      if (file) handleResumeFile(file);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                    className={[
                      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed px-6 py-8 text-center transition-colors",
                      dragOver ? "border-[#E21F26] bg-red-50" : "border-black/15 bg-[#FAFAFA] hover:border-black/30",
                      errors.resume ? "border-[#E21F26] bg-red-50" : "",
                      submitStatus === "submitting" || submitStatus === "success" ? "pointer-events-none opacity-60" : "",
                    ].join(" ")}
                  >
                    {form.resume ? (
                      <>
                        <FileText className="h-7 w-7 text-[#E21F26]" />
                        <div className="text-sm font-semibold text-black">{form.resume.name}</div>
                        <div className="text-xs text-black/40">
                          {(form.resume.size / 1024).toFixed(0)} KB · Click to replace
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="h-7 w-7 text-black/30" />
                        <div className="text-sm font-semibold text-black/60">
                          Drag & drop or <span className="text-[#E21F26]">browse</span>
                        </div>
                        <div className="text-xs text-black/35">PDF, DOC, or DOCX · Max 5 MB</div>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleResumeFile(file);
                      e.target.value = "";
                    }}
                  />
                  {errors.resume && <span className="text-xs text-[#E21F26]">{errors.resume}</span>}
                </div>

                <Field label="Message (optional)" error={errors.message} fullWidth>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className={[
                      "min-h-30 w-full resize-y rounded border px-4 py-3 text-sm text-black outline-none transition cursor-text",
                      "focus:ring-2 focus:ring-black/20",
                      "border-black/15 bg-white",
                    ].join(" ")}
                    placeholder="Tell us a bit about yourself, your work, or why this role excites you…"
                    disabled={submitStatus === "submitting" || submitStatus === "success"}
                  />
                </Field>
              </div>

              {/* Status messages */}
              {submitStatus === "success" && (
                <div className="mt-5 flex items-start gap-3 rounded border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <div className="text-sm font-bold text-emerald-900">Application submitted!</div>
                    <div className="mt-0.5 text-sm text-emerald-800">
                      We've received your application. Our team will review it and reach out to you soon.
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && submitError && (
                <div className="mt-5 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                  {submitError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/8 px-6 py-6">
          {/* Back / Close */}
          <button
            type="button"
            onClick={isDepartmentStep ? handleClose : onBack}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {!isDepartmentStep && <ChevronLeft className="h-4 w-4" />}
            {backLabel()}
          </button>

          {/* Right CTA — only on form step */}
          {isFormStep && submitStatus !== "success" && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitStatus === "submitting" || !isFormReady}
              className={[
                "inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold text-white transition-opacity",
                "focus:outline-none focus:ring-2 focus:ring-[#E21F26]/50",
                submitStatus === "submitting" || !isFormReady
                  ? "cursor-not-allowed bg-black/30 opacity-70"
                  : "bg-[#E21F26] hover:opacity-90",
              ].join(" ")}
            >
              {submitStatus === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitStatus === "submitting" ? "Submitting…" : "Submit Application"}
            </button>
          )}

          {/* Breadcrumb indicator */}
          {!isFormStep && (
            <div className="flex items-center gap-1.5">
              {(["department", "role", "description"] as CareersModalStep[]).map((s) => (
                <div
                  key={s}
                  className={[
                    "h-1.5 rounded-full transition-all",
                    step === s ? "w-5 bg-[#E21F26]" : "w-1.5 bg-black/15",
                  ].join(" ")}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
