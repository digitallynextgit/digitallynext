'use client';

import { ChevronLeft, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef } from 'react';
import type { CareersDepartment, CareersRole, CareersTone, CareersModalStep } from '@/data/careersDepartments';

type ModalMode = 'full-time' | 'internship';

interface ModalProps {
  open: boolean;
  mode: ModalMode;
  step: CareersModalStep;
  departments: CareersDepartment[];
  selectedDepartmentId: string | null;
  onSelectDepartment: (id: string) => void;
  onSelectRole: (id: string) => void;
  onClose: () => void;
  onBack: () => void;
}

function getToneClasses(tone: CareersTone) {
  if (tone === 'red') {
    return {
      cardBg: 'bg-[#FDF2F2]',
      cardBgHover: 'hover:bg-[#fae8e8]',
      titleColor: 'text-[#E21F26]',
      ringColor: 'ring-[#E21F26]',
      dotColor: 'text-[#E21F26]',
    };
  }

  return {
    cardBg: 'bg-[#F1FBFB]',
    cardBgHover: 'hover:bg-[#e3f7f7]',
    titleColor: 'text-[#16B8B8]',
    ringColor: 'ring-[#16B8B8]',
    dotColor: 'text-[#16B8B8]',
  };
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      "a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex='-1'])"
    )
  );
}

export default function DepartmentSelectionModal({
  open,
  mode,
  step,
  departments,
  selectedDepartmentId,
  onSelectDepartment,
  onSelectRole,
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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = getFocusableElements(panelRef.current);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus();
    };
  }, [open, handleClose]);

  if (!open) return null;

  const selectedDepartment = departments.find((department) => department.id === selectedDepartmentId) ?? null;
  const roles: CareersRole[] = selectedDepartment?.roles ?? [];
  const deptTone = selectedDepartment ? getToneClasses(selectedDepartment.tone) : null;
  const isDepartmentStep = step === 'department';
  const isRoleStep = step === 'role';

  const renderTitle = () => {
    if (isDepartmentStep) {
      return (
        <>
          Join Us At <span className="font-black">Digitally</span> <span className="text-[#E21F26]">Next</span>.
        </>
      );
    }

    if (selectedDepartment) {
      return (
        <>
          {selectedDepartment.title}
          <span className={deptTone?.dotColor ?? 'text-[#E21F26]'}>.</span>
        </>
      );
    }

    return (
      <>
        Open Roles<span className="text-[#E21F26]">.</span>
      </>
    );
  };

  const renderSubtitle = () => {
    if (isDepartmentStep) {
      return mode === 'internship'
        ? 'Select a department to explore internship openings.'
        : 'Select a department to explore openings.';
    }

    return 'Click on a role to open its full page and apply there.';
  };

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative flex w-full flex-col overflow-hidden bg-white shadow-2xl"
        style={{ maxWidth: 1060, borderRadius: 5, maxHeight: 'calc(100svh - 4rem)' }}
      >
        <div className="flex shrink-0 items-start justify-between gap-6 border-b p-6">
          <div className="min-w-0 flex-1">
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

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {isDepartmentStep && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((department) => {
                const tone = getToneClasses(department.tone);
                const isSelected = selectedDepartmentId === department.id;

                return (
                  <button
                    key={department.id}
                    type="button"
                    onClick={() => onSelectDepartment(department.id)}
                    className={[
                      'group flex min-h-41 flex-col justify-between rounded p-6 text-left transition-all duration-200 cursor-pointer md:min-h-75',
                      tone.cardBg,
                      tone.cardBgHover,
                      isSelected ? `ring-2 ${tone.ringColor}` : `hover:ring-1 ${tone.ringColor}`,
                      'focus:outline-none focus:ring-2 focus:ring-black/25',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'text-[clamp(18px,2.2vw,28px)] font-extrabold leading-[1.1] tracking-tight',
                        tone.titleColor,
                      ].join(' ')}
                    >
                      {department.title}
                    </div>
                    <div className="text-sm font-semibold text-black/60">{department.jobsLabel}</div>
                  </button>
                );
              })}
            </div>
          )}

          {isRoleStep && selectedDepartment && (
            <div className="flex flex-col gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => onSelectRole(role.id)}
                  className={[
                    'flex w-full items-center justify-between rounded px-7 py-5 text-left transition-all duration-200 cursor-pointer',
                    'bg-[rgba(226,31,38,0.04)] hover:bg-[rgba(226,31,38,0.09)]',
                    'focus:outline-none focus:ring-2 focus:ring-black/20',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="font-medium text-black"
                      style={{
                        fontSize: 'clamp(18px, 2.8vw, 36px)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.15,
                      }}
                    >
                      {role.title}
                    </div>
                    {role.meta && <div className="text-sm font-normal capitalize text-black/55">{role.meta}</div>}
                  </div>

                  <div className="ml-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/40 transition-all">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/8 px-6 py-6">
          <button
            type="button"
            onClick={isDepartmentStep ? handleClose : onBack}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {!isDepartmentStep && <ChevronLeft className="h-4 w-4" />}
            {isDepartmentStep ? 'Close' : 'All Departments'}
          </button>

          <div className="flex items-center gap-1.5">
            {(['department', 'role'] as CareersModalStep[]).map((currentStep) => (
              <div
                key={currentStep}
                className={[
                  'h-1.5 rounded-full transition-all',
                  step === currentStep ? 'w-5 bg-[#E21F26]' : 'w-1.5 bg-black/15',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
