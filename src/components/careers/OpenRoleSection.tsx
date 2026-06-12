'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSectionTheme } from '@/context/SectionThemeContext';
import DepartmentSelectionModal from '@/components/careers/DepartmentSelectionModal';
import {
  CAREERS_DEPARTMENT_GROUPS,
  CAREERS_INTERNSHIP_GROUPS,
  getCareerDepartmentSlug,
  type CareersDepartmentGroup,
} from '@/data/careersDepartments';
import Link from 'next/link';

interface OpenRolesSectionProps {
  theme?: 'dark' | 'light';
}

const CARDS = [
  {
    title: 'Full-Time Positions',
    desc: 'Join a team that values clarity, ownership, and craft. Roles across strategy, digital, data, and AI.',
    linkLabel: 'Full-Time Roles',
    mode: 'full-time' as const,
  },
  {
    title: 'Internships',
    desc: 'Start with real work, real mentorship, and real expectations. Our internships are structured to build, not busy-work.',
    linkLabel: 'Internship Roles',
    mode: 'internship' as const,
  },
];

export default function OpenRolesSection({ theme }: OpenRolesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const router = useRouter();
  const isDark = (theme ?? contextTheme) === 'dark';

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'full-time' | 'internship'>('full-time');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  // When the modal is opened via URL with ?group=<id>, this pre-selects that group
  // so the modal opens directly at step 2 (sub-departments). null = step 1 (groups).
  const [initialGroupId, setInitialGroupId] = useState<string | null>(null);

  // Auto-open the modal on initial mount when arriving via "Back to Departments"
  // from a sub-department page (cross-page navigation). The URL carries
  // ?openModal=<mode>[&group=<id>] which we read once, then strip.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('openModal');
    if (requested !== 'full-time' && requested !== 'internship') return;
    const requestedGroup = params.get('group');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModalMode(requested);
    setSelectedDepartmentId(null);
    setInitialGroupId(requestedGroup || null);
    setModalOpen(true);
    params.delete('openModal');
    params.delete('group');
    const search = params.toString();
    const url = window.location.pathname + (search ? `?${search}` : '') + window.location.hash;
    window.history.replaceState({}, '', url);
  }, []);

  // Listen for same-page modal-open requests dispatched as a window event.
  // Other sections (e.g. "Open Roles in ADAC" in AdacSection) dispatch this
  // event instead of relying on URL navigation, which is more reliable for
  // already-mounted components than useSearchParams reactivity.
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as
        | { mode?: 'full-time' | 'internship'; group?: string }
        | undefined;
      if (!detail) return;
      if (detail.mode !== 'full-time' && detail.mode !== 'internship') return;
      setModalMode(detail.mode);
      setSelectedDepartmentId(null);
      setInitialGroupId(detail.group ?? null);
      setModalOpen(true);
    };
    window.addEventListener('careers:openModal', handler);
    return () => window.removeEventListener('careers:openModal', handler);
  }, []);

  const groups = useMemo<CareersDepartmentGroup[]>(
    () => (modalMode === 'internship' ? CAREERS_INTERNSHIP_GROUPS : CAREERS_DEPARTMENT_GROUPS),
    [modalMode]
  );

  const openModal = (mode: 'full-time' | 'internship') => {
    setModalMode(mode);
    setSelectedDepartmentId(null);
    // Clear any group pinned by a previous URL deep-link so manual button
    // clicks always start at step 1 (groups overview).
    setInitialGroupId(null);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <section
      id="open-positions"
      className={['w-full transition-colors duration-700', isDark ? 'bg-black' : 'bg-[#FAFAFA]'].join(' ')}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Top row — heading + tagline */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            {/* Heading + subtitle */}
            <div className="flex flex-col gap-4">
              <h2
                className={[
                  'font-normal leading-[1.15] transition-colors duration-700',
                  isDark ? 'text-white' : 'text-black',
                ].join(' ')}
                style={{ fontSize: 'clamp(1.75rem, 4vw, 47px)' }}
              >
                Open Roles<span className="text-[#E21F26]">.</span>
              </h2>
              <p
                className={[
                  'font-light text-[16px] leading-relaxed transition-colors duration-700',
                  isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                ].join(' ')}
              >
                <span className="block">If this feels like your kind of place,</span>
                <span className="block">start here:</span>
              </p>
            </div>

            {/* Tagline */}
            <div
              className={[
                'text-[14px] font-bold leading-snug transition-colors duration-700 shrink-0',
                isDark ? 'text-white' : 'text-black',
              ].join(' ')}
            >
              No hype. Just an{' '}
              <span className="text-[#E21F26] uppercase text-2xl sm:text-3xl block">honest start.</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {CARDS.map(({ title, desc, linkLabel, mode }, index) => (
              <div
                key={title}
                className={[
                  'flex flex-col gap-4 p-8 sm:p-10 transition-colors duration-700',
                  isDark ? 'bg-[#111111] border border-[#2a2a2a]' : 'bg-white border border-[#E5E5E5]',
                  index === 1 ? 'border-t-0 md:border-t md:border-l-0' : '',
                ].join(' ')}
              >
                <div
                  className={[
                    'text-[26px] sm:text-[32px] font-normal leading-tight transition-colors duration-700',
                    isDark ? 'text-white' : 'text-[#0A0A0A]',
                  ].join(' ')}
                >
                  {title}
                </div>
                <p
                  className={[
                    'text-[15px] font-light leading-relaxed transition-colors duration-700',
                    isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                  ].join(' ')}
                >
                  {desc}
                </p>
                <button
                  type="button"
                  onClick={() => openModal(mode)}
                  className={[
                    'group mt-2 inline-flex items-center gap-3 w-fit cursor-pointer',
                    'text-[14px] font-normal transition-colors duration-300',
                    isDark ? 'text-white' : 'text-black',
                  ].join(' ')}
                >
                  <Image
                    src="/figma/careers/careers-arrow-link.svg"
                    alt={`${linkLabel} arrow`}
                    width={19}
                    height={10}
                    style={{ width: 'auto', height: 'auto' }}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  <span className="group-hover:text-[#E21F26] transition-colors duration-300">{linkLabel}</span>
                </button>
              </div>
            ))}
          </div>

          {/* CV section */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <p
              className={[
                'text-[16px] font-normal leading-snug text-center transition-colors duration-700',
                isDark ? 'text-white' : 'text-black',
              ].join(' ')}
            >
              Or send us your CV at
            </p>
            <Link
              href="mailto:careers@digitallynext.com"
              className={[
                'inline-flex items-center justify-center rounded border',
                'px-8 py-2 text-[15px] font-normal leading-snug',
                'transition-colors duration-300',
                isDark
                  ? 'border-white/40 text-white hover:text-[#E21F26] hover:border-[#E21F26] hover:bg-[#E21F26]'
                  : 'border-[#787878] text-[#E21F26] hover:border-[#E21F26] hover:bg-[#E21F26] hover:text-white',
              ].join(' ')}
            >
              careers@digitallynext.com
            </Link>
          </div>
        </div>
      </div>

      <DepartmentSelectionModal
        open={modalOpen}
        mode={modalMode}
        groups={groups}
        initialGroupId={initialGroupId}
        selectedDepartmentId={selectedDepartmentId}
        onSelectSubDepartment={(subDepartmentId) => {
          const subDepartment = groups
            .flatMap((g) => g.subDepartments)
            .find((d) => d.id === subDepartmentId);
          if (!subDepartment) return;
          setSelectedDepartmentId(subDepartmentId);
          setModalOpen(false);
          router.push(`/careers/${getCareerDepartmentSlug(subDepartment)}`);
        }}
        onSelectPosition={(href) => {
          setModalOpen(false);
          router.push(href);
        }}
        onClose={handleClose}
      />
    </section>
  );
}
