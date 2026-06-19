'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  type CareersDepartmentGroup,
  type SearchablePosition,
  getSearchablePositions,
} from '@/data/careersDepartments';

interface PositionSearchBarProps {
  groups: CareersDepartmentGroup[];
  /** Called when the user picks a position. Receives the role page href. */
  onSelectPosition: (href: string) => void;
}

export default function PositionSearchBar({ groups, onSelectPosition }: PositionSearchBarProps) {
  const reactId = useId();
  const listboxId = `${reactId}-listbox`;
  const inputId = `${reactId}-input`;

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const allPositions = useMemo(() => getSearchablePositions(groups), [groups]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPositions;
    return allPositions.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.roleTitle.toLowerCase().includes(q) ||
        p.departmentTitle.toLowerCase().includes(q) ||
        p.groupCode.toLowerCase().includes(q)
    );
  }, [query, allPositions]);

  // Group filtered positions by department (preserves first-seen order)
  const grouped = useMemo(() => {
    const order: string[] = [];
    const byDept = new Map<string, { groupCode: string; positions: SearchablePosition[] }>();
    for (const p of filtered) {
      if (!byDept.has(p.departmentTitle)) {
        order.push(p.departmentTitle);
        byDept.set(p.departmentTitle, { groupCode: p.groupCode, positions: [] });
      }
      byDept.get(p.departmentTitle)!.positions.push(p);
    }
    return order.map((dept) => ({
      departmentTitle: dept,
      groupCode: byDept.get(dept)!.groupCode,
      positions: byDept.get(dept)!.positions,
    }));
  }, [filtered]);

  // Reset highlight whenever the filtered list changes
  useEffect(() => {
    setActiveIndex(filtered.length > 0 ? 0 : -1);
  }, [filtered]);

  // Close the dropdown when clicking outside the search container
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen]);

  // Keep the active option scrolled into view during keyboard navigation
  useEffect(() => {
    if (activeIndex < 0 || !listboxRef.current) return;
    const el = listboxRef.current.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const select = (position: SearchablePosition) => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(-1);
    onSelectPosition(position.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => (i + 1 >= filtered.length ? 0 : i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((i) => (i - 1 < 0 ? filtered.length - 1 : i - 1));
    } else if (e.key === 'Home') {
      if (isOpen) {
        e.preventDefault();
        setActiveIndex(0);
      }
    } else if (e.key === 'End') {
      if (isOpen) {
        e.preventDefault();
        setActiveIndex(filtered.length - 1);
      }
    } else if (e.key === 'Enter') {
      if (isOpen && activeIndex >= 0 && filtered[activeIndex]) {
        e.preventDefault();
        select(filtered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    }
  };

  // Renders a substring match with a <mark> wrapper around the matched chunk
  const renderHighlighted = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="rounded-sm bg-yellow-200/80 px-0.5 text-black">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const activeOptionId =
    activeIndex >= 0 && filtered[activeIndex] ? `${listboxId}-${filtered[activeIndex].id}` : undefined;

  const showDropdown = isOpen;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={[
          'flex items-center gap-2 rounded-full border bg-white px-4 py-2.5 transition-colors',
          isOpen ? 'border-[#E21F26] ring-2 ring-[#E21F26]/15' : 'border-black/15 hover:border-black/30',
        ].join(' ')}
      >
        <Search className="h-4 w-4 shrink-0 text-black/45" strokeWidth={2.25} aria-hidden="true" />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search positions, departments, or groups…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          aria-label="Search open positions"
          className="flex-1 bg-transparent text-sm font-medium text-black outline-none placeholder:text-black/40"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black/45 transition-colors hover:bg-black/8 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        ) : null}
      </div>

      {showDropdown ? (
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-label="Open positions grouped by department"
          className="absolute left-0 right-0 top-full z-10 mt-2 max-h-96 overflow-y-auto rounded-lg border border-black/10 bg-white shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/8 bg-white px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              {filtered.length === 0
                ? 'No positions found'
                : filtered.length === 1
                  ? '1 position'
                  : `${filtered.length} positions`}
            </span>
            {query ? (
              <span className="truncate text-xs text-black/40">matching “{query}”</span>
            ) : (
              <span className="text-xs text-black/40">All positions</span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-black/50">
              No positions match “{query}”. Try a different keyword.
            </div>
          ) : (
            <div className="py-1">
              {grouped.map((section) => (
                <div key={section.departmentTitle} className="py-1">
                  <div className="sticky top-9 z-[1] flex items-center gap-2 bg-[#F7F7F7] px-4 py-1.5">
                    <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black/70">
                      {section.groupCode}
                    </span>
                    <span className="text-xs font-semibold text-black/70">{section.departmentTitle}</span>
                  </div>
                  <ul className="py-0.5">
                    {section.positions.map((p) => {
                      const flatIdx = filtered.indexOf(p);
                      const isActive = flatIdx === activeIndex;
                      const optionId = `${listboxId}-${p.id}`;
                      const showRoleTag = p.title !== p.roleTitle;
                      return (
                        <li key={p.id}>
                          <button
                            id={optionId}
                            role="option"
                            data-idx={flatIdx}
                            aria-selected={isActive}
                            type="button"
                            onMouseDown={(e) => {
                              // Prevent input blur (which would close the dropdown) before click fires
                              e.preventDefault();
                            }}
                            onMouseEnter={() => setActiveIndex(flatIdx)}
                            onClick={() => select(p)}
                            className={[
                              'flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors',
                              isActive ? 'bg-[#FDF2F2] text-[#E21F26]' : 'text-black hover:bg-black/4',
                            ].join(' ')}
                          >
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate font-medium">{renderHighlighted(p.title)}</span>
                              {showRoleTag ? (
                                <span className="truncate text-xs text-black/50">
                                  in {renderHighlighted(p.roleTitle)}
                                </span>
                              ) : null}
                            </div>
                            <span
                              className={[
                                'shrink-0 text-xs font-semibold transition-opacity',
                                isActive ? 'opacity-100' : 'opacity-0',
                              ].join(' ')}
                              aria-hidden="true"
                            >
                              ↵
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
