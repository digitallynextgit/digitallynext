'use client';

import { X, ChevronLeft } from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type {
  CareersDepartment,
  CareersDepartmentGroup,
  CareersTone,
} from '@/data/careersDepartments';
import PositionSearchBar from '@/components/careers/PositionSearchBar';

type ModalMode = 'full-time' | 'internship';

interface ModalProps {
  open: boolean;
  mode: ModalMode;
  groups: CareersDepartmentGroup[];
  /**
   * When set, the modal opens directly at step 2 (sub-departments) for this
   * group instead of step 1 (groups overview). Used for "Open Roles in <Group>"
   * deep links. null/undefined = open at step 1.
   */
  initialGroupId?: string | null;
  selectedDepartmentId: string | null;
  onSelectSubDepartment: (subDepartmentId: string) => void;
  /** Called when the user picks a position via the search bar. */
  onSelectPosition: (href: string) => void;
  onClose: () => void;
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
  groups,
  initialGroupId,
  selectedDepartmentId,
  onSelectSubDepartment,
  onSelectPosition,
  onClose,
}: ModalProps) {
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Two-step flow: null = showing parent groups; non-null = showing one group's sub-departments
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  // When the modal opens, jump straight to step 2 if a group was pre-selected
  // (e.g. via "Open Roles in ADAC" deep link). Otherwise start at step 1.
  useEffect(() => {
    if (open) setActiveGroupId(initialGroupId ?? null);
  }, [open, initialGroupId]);

  // Smoothly scroll to the top when changing step
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [open, activeGroupId]);

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
        // Escape closes from step 1, but returns to step 1 from step 2
        if (activeGroupId) {
          setActiveGroupId(null);
        } else {
          handleClose();
        }
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
  }, [open, handleClose, activeGroupId]);

  const activeGroup = useMemo<CareersDepartmentGroup | null>(
    () => (activeGroupId ? groups.find((g) => g.id === activeGroupId) ?? null : null),
    [activeGroupId, groups]
  );

  if (!open) return null;

  const handleGroupClick = (group: CareersDepartmentGroup) => {
    // Auto-skip step 2 when there is only one sub-department in the group
    if (group.subDepartments.length === 1) {
      onSelectSubDepartment(group.subDepartments[0].id);
      return;
    }
    setActiveGroupId(group.id);
  };

  const subtitle = activeGroup
    ? `${activeGroup.code} · ${activeGroup.title} — pick a department.`
    : mode === 'internship'
      ? 'Select a department to explore internship openings.'
      : 'Select a group to explore departments.';

  const renderGroupCard = (group: CareersDepartmentGroup) => {
    const tone = getToneClasses(group.tone);
    const count = group.subDepartments.length;
    const countLabel = count === 1 ? '1 department' : `${count} departments`;

    return (
      <button
        key={group.id}
        type="button"
        onClick={() => handleGroupClick(group)}
        className={[
          'group flex min-h-41 flex-col justify-between rounded p-6 text-left transition-all duration-200 cursor-pointer md:min-h-75',
          tone.cardBg,
          tone.cardBgHover,
          `hover:ring-1 ${tone.ringColor}`,
          'focus:outline-none focus:ring-2 focus:ring-black/25',
        ].join(' ')}
      >
        <div className="flex flex-col gap-1.5">
          <div
            className={[
              'text-xs font-bold uppercase tracking-[0.16em]',
              tone.titleColor,
              'opacity-70',
            ].join(' ')}
          >
            {group.code}
          </div>
          <div
            className={[
              'text-[clamp(18px,2.2vw,28px)] font-extrabold leading-[1.1] tracking-tight',
              tone.titleColor,
            ].join(' ')}
          >
            {group.title}
          </div>
        </div>
        <div className="text-sm font-semibold text-black/60">
          {count > 1 ? `${group.jobsLabel} · ${countLabel}` : group.jobsLabel}
        </div>
      </button>
    );
  };

  const renderSubDepartmentCard = (department: CareersDepartment) => {
    const tone = getToneClasses(department.tone);
    const isSelected = selectedDepartmentId === department.id;
    const roleCount = department.roles.length;
    const roleLabel = roleCount === 1 ? '1 role' : `${roleCount} roles`;

    return (
      <button
        key={department.id}
        type="button"
        onClick={() => onSelectSubDepartment(department.id)}
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
        <div className="text-sm font-semibold text-black/60">
          {department.jobsLabel} · {roleLabel}
        </div>
      </button>
    );
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
            {activeGroup ? (
              <button
                type="button"
                onClick={() => setActiveGroupId(null)}
                className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-black/60 transition-colors hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20 rounded px-1.5 py-1 -ml-1.5"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                Back to all groups
              </button>
            ) : null}
            <h2
              id={titleId}
              className="text-[clamp(24px,4vw,48px)] font-extrabold leading-tight tracking-tight text-black"
            >
              Join Us At <span className="font-black">Digitally</span>{' '}
              <span className="text-[#E21F26]">Next</span>.
            </h2>
            <p id={descId} className="mt-1.5 text-sm text-black/50">
              {subtitle}
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

        {/* Position search bar — searches across all roles & current openings */}
        <div className="shrink-0 border-b border-black/8 px-6 py-3">
          <PositionSearchBar groups={groups} onSelectPosition={onSelectPosition} />
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeGroup
              ? activeGroup.subDepartments.map(renderSubDepartmentCard)
              : groups.map(renderGroupCard)}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/8 px-6 py-6">
          <button
            type="button"
            onClick={activeGroup ? () => setActiveGroupId(null) : handleClose}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            {activeGroup ? (
              <>
                <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                Back
              </>
            ) : (
              'Close'
            )}
          </button>

          <div className="flex items-center gap-1.5">
            <div
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                activeGroup ? 'w-2 bg-black/20' : 'w-5 bg-[#E21F26]',
              ].join(' ')}
            />
            <div
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                activeGroup ? 'w-5 bg-[#E21F26]' : 'w-2 bg-black/20',
              ].join(' ')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
