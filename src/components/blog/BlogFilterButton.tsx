'use client';

import { Filter, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

interface Category {
  _id: string;
  title: string;
}

interface BlogFilterButtonProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function BlogFilterButton({ categories, activeCategoryId, onSelectCategory }: BlogFilterButtonProps) {
  const reactId = useId();
  const popupId = `${reactId}-popup`;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const activeCategory = categories.find((c) => c._id === activeCategoryId) ?? null;

  // Close on click outside
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

  // Close on Escape; restore focus to the trigger
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleSelect = (id: string | null) => {
    onSelectCategory(id);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCategory(null);
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={popupId}
        aria-label={activeCategory ? `Filter: ${activeCategory.title}. Click to change.` : 'Open filter'}
        className={[
          'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[13px] font-semibold transition-all duration-200 cursor-pointer',
          activeCategory
            ? 'border-black bg-black text-white pr-6'
            : 'border-black/20 bg-white text-[#555555] hover:border-black hover:text-black',
        ].join(' ')}
      >
        <Filter className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
        <span className="max-w-[10rem] truncate">{activeCategory ? activeCategory.title : 'Filter'}</span>
      </button>

      {activeCategory ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label={`Clear filter: ${activeCategory.title}`}
          className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#E21F26] text-white shadow-md transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26] focus-visible:ring-offset-2"
        >
          <X className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
        </button>
      ) : null}

      {isOpen ? (
        <div
          id={popupId}
          role="dialog"
          aria-label="Filter blog posts by tag"
          className="absolute right-0 top-full z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-black/10 bg-white p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/55">Filter by tag</h3>
            {activeCategory ? (
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className="text-xs font-semibold text-[#E21F26] transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26] focus-visible:ring-offset-2 rounded"
              >
                Clear all
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSelect(null)}
              aria-pressed={!activeCategory}
              className={[
                'rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer',
                !activeCategory
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 bg-white text-[#555555] hover:border-black hover:text-black',
              ].join(' ')}
            >
              All
            </button>
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat._id;
              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => handleSelect(cat._id)}
                  aria-pressed={isActive}
                  className={[
                    'rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer',
                    isActive
                      ? 'border-black bg-black text-white'
                      : 'border-black/20 bg-white text-[#555555] hover:border-black hover:text-black',
                  ].join(' ')}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
