"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { CareersDepartment, CareersRole, CareersTone } from "@/data/careersDepartments";

function getToneClasses(tone: CareersTone) {
  if (tone === "red") {
    return { cardBg: "bg-[#FDF2F2]", title: "text-[#E21F26]", ring: "ring-[#E21F26]" };
  }
  return { cardBg: "bg-[#F1FBFB]", title: "text-[#16B8B8]", ring: "ring-[#16B8B8]" };
}

function getFocusable(container: HTMLElement) {
  const selector =
    "a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex='-1'])";
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

type CareersModalMode = "full-time" | "internship";
type CareersModalStep = "department" | "role" | "form";

export default function DepartmentSelectionModal({
  open,
  mode,
  step,
  departments,
  internshipRoles,
  selectedDepartmentId,
  selectedRoleId,
  onSelectDepartment,
  onSelectRole,
  onClose,
  onBack,
  onNext,
}: {
  open: boolean;
  mode: CareersModalMode;
  step: CareersModalStep;
  departments: CareersDepartment[];
  internshipRoles: CareersRole[];
  selectedDepartmentId: string | null;
  selectedRoleId: string | null;
  onSelectDepartment: (id: string) => void;
  onSelectRole: (id: string) => void;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const [formState, setFormState] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    message: "",
  }));
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isDepartmentStep = mode === "full-time" && step === "department";
  const isRoleStep = step === "role";
  const isFormStep = step === "form";

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!panelRef.current) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;
      const focusables = getFocusable(panelRef.current);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    if (!isFormStep) {
      setSubmitStatus("idle");
      setSubmitError(null);
    }
  }, [open, isFormStep]);

  if (!open) return null;
  const selectedDepartment =
    mode === "full-time"
      ? departments.find((d) => d.id === selectedDepartmentId) ?? null
      : null;

  const roles = mode === "internship" ? internshipRoles : selectedDepartment?.roles ?? [];
  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? null;
  const canNext =
    step === "department"
      ? Boolean(selectedDepartmentId)
      : step === "role"
        ? Boolean(selectedRoleId)
        : true;
  const trackLabel = mode === "internship" ? "Internship" : "Full-time";

  const canSubmit =
    Boolean(formState.fullName.trim()) &&
    Boolean(formState.email.trim()) &&
    Boolean(selectedRole);

  const submit = async () => {
    if (!selectedRole) return;
    if (!formState.fullName.trim() || !formState.email.trim()) {
      setSubmitStatus("error");
      setSubmitError("Name and Email are required.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          track: mode,
          department: selectedDepartment?.title ?? null,
          role: selectedRole.title,
          fullName: formState.fullName,
          email: formState.email,
          phone: formState.phone,
          linkedIn: formState.linkedIn,
          portfolio: formState.portfolio,
          message: formState.message,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit.");
      }

      setSubmitStatus("success");
      setSubmitError(null);
    } catch (e) {
      setSubmitStatus("error");
      setSubmitError(e instanceof Error ? e.message : "Failed to submit.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20 pb-10 md:pt-24 md:pb-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative flex w-full max-w-[980px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ maxHeight: "calc(100vh - 10rem)" }}
      >
        <div className="flex items-start justify-between gap-6 px-5 pb-4 pt-5 md:px-10 md:pt-10">
          <div>
            <div
              id={titleId}
              className="text-[clamp(28px,4vw,44px)] font-extrabold leading-tight tracking-tight text-black"
            >
              Join Us At <span className="font-black">Digitally</span> Next
              <span className="text-[#E21F26]">.</span>
            </div>
            <div id={descId} className="mt-2 text-sm text-[#6B6B6B]">
              {mode === "internship"
                ? "Select one internship role to continue."
                : isDepartmentStep
                  ? "Select one department to continue."
                  : isFormStep
                    ? "Share your details to apply."
                    : "Select one role to continue."}
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/30"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 md:px-10 md:pb-10 [-webkit-overflow-scrolling:touch]"
        >
          {isDepartmentStep ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {departments.map((dept) => {
                const tone = getToneClasses(dept.tone);
                const selected = selectedDepartmentId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      onSelectDepartment(dept.id);
                      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={[
                      "group flex min-h-[170px] flex-col justify-between gap-8 rounded-2xl p-6 text-left transition md:min-h-[190px] md:p-7",
                      tone.cardBg,
                      selected ? `ring-2 ${tone.ring}` : `hover:shadow-md hover:ring-1 ${tone.ring}`,
                      "focus:outline-none focus:ring-2 focus:ring-black/30",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "text-[clamp(26px,2.6vw,38px)] font-extrabold leading-[1.05] tracking-tight",
                        tone.title,
                      ].join(" ")}
                    >
                      {dept.title}
                    </div>
                    <div className="text-sm font-medium text-black/80">{dept.jobsLabel}</div>
                  </button>
                );
              })}
            </div>
          ) : null}

          {isRoleStep ? (
            <div>
              {mode === "full-time" && selectedDepartment ? (
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xl font-bold text-black">
                      Roles in <span className="text-[#E21F26]">{selectedDepartment.title}</span>
                    </div>
                    <div className="mt-1 text-sm text-black/55">Select a role to enable the CTA.</div>
                  </div>
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-black/5"
                  >
                    Change Department
                  </button>
                </div>
              ) : (
                <div className="mb-5">
                  <div className="text-xl font-bold text-black">Internship Roles</div>
                  <div className="mt-1 text-sm text-black/55">Select a role to enable the CTA.</div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {roles.map((role) => {
                  const selected = selectedRoleId === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => onSelectRole(role.id)}
                      className={[
                        "flex flex-col gap-2 rounded-xl border bg-white p-6 text-left transition",
                        selected ? "border-transparent ring-2 ring-[#E21F26]" : "border-[#E5E5E5] hover:shadow-sm",
                        "focus:outline-none focus:ring-2 focus:ring-black/30",
                      ].join(" ")}
                    >
                      <div className="text-lg font-bold leading-snug text-black">{role.title}</div>
                      {role.meta ? (
                        <div className="text-xs font-semibold uppercase tracking-wide text-black/50">{role.meta}</div>
                      ) : null}
                      {role.summary ? <div className="text-sm text-black/60">{role.summary}</div> : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-black/45">Selected role</div>
                {selectedRole ? (
                  <div className="mt-2">
                    <div className="text-base font-bold text-black">{selectedRole.title}</div>
                    {selectedRole.summary ? <div className="mt-1 text-sm text-black/65">{selectedRole.summary}</div> : null}
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-black/60">Select a role to continue.</div>
                )}
              </div>
            </div>
          ) : null}

          {isFormStep ? (
            <div className="mx-auto w-full max-w-[760px]">
              <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] p-5 md:p-6">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold uppercase tracking-wide text-black/50">Applying for</div>
                  <div className="text-lg font-bold text-black">{selectedRole?.title ?? "—"}</div>
                  <div className="text-sm text-black/60">
                    {trackLabel}
                    {selectedDepartment ? ` • ${selectedDepartment.title}` : ""}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">Full name</span>
                  <input
                    value={formState.fullName}
                    onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                    className="h-11 rounded-xl border border-black/15 px-4 text-sm text-black outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">Email</span>
                  <input
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className="h-11 rounded-xl border border-black/15 px-4 text-sm text-black outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">Phone (optional)</span>
                  <input
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    className="h-11 rounded-xl border border-black/15 px-4 text-sm text-black outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="+91 …"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">LinkedIn (optional)</span>
                  <input
                    value={formState.linkedIn}
                    onChange={(e) => setFormState((s) => ({ ...s, linkedIn: e.target.value }))}
                    className="h-11 rounded-xl border border-black/15 px-4 text-sm text-black outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="https://linkedin.com/in/..."
                    inputMode="url"
                  />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-semibold text-black">Portfolio / Work link (optional)</span>
                  <input
                    value={formState.portfolio}
                    onChange={(e) => setFormState((s) => ({ ...s, portfolio: e.target.value }))}
                    className="h-11 rounded-xl border border-black/15 px-4 text-sm text-black outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="https://..."
                    inputMode="url"
                  />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-semibold text-black">Message (optional)</span>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="min-h-28 rounded-xl border border-black/15 px-4 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="Tell us a bit about yourself…"
                  />
                </label>
              </div>

              {submitStatus === "success" ? (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  Application received. We’ll get back to you soon.
                </div>
              ) : null}

              {submitStatus === "error" && submitError ? (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                  {submitError}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-black/10 px-5 py-3 sm:flex-row sm:items-center md:px-10">
          <button
            type="button"
            onClick={
              isDepartmentStep
                ? onClose
                : isFormStep
                  ? onBack
                  : mode === "full-time"
                    ? onBack
                    : onClose
            }
            className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5"
          >
            {isDepartmentStep ? "Cancel" : isFormStep ? "Back" : mode === "full-time" ? "Back" : "Close"}
          </button>

          {isFormStep ? (
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit || submitStatus === "submitting" || submitStatus === "success"}
              className={[
                "inline-flex items-center justify-center rounded-full px-7 py-2 text-sm font-semibold text-white transition-opacity",
                "bg-[#E21F26]",
                canSubmit && submitStatus !== "submitting" && submitStatus !== "success"
                  ? "hover:opacity-95"
                  : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              {submitStatus === "submitting" ? "Submitting…" : submitStatus === "success" ? "Submitted" : "Submit"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className={[
                "inline-flex items-center justify-center rounded-full px-7 py-2 text-sm font-semibold text-white transition-opacity",
                "bg-[#E21F26]",
                canNext ? "hover:opacity-95" : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
