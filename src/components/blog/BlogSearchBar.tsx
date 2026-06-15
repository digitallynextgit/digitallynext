'use client';

import { Search, X, CornerDownLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

interface SearchablePost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  categories?: { _id: string; title: string }[];
}

interface BlogSearchBarProps {
  posts: SearchablePost[];
  /** Called when the user picks a post. Receives the blog post href. */
  onSelectPost: (href: string) => void;
  /** Max number of posts shown per tag/category section. Default 3. */
  perTagLimit?: number;
}

type SearchItem = {
  id: string;
  title: string;
  excerpt: string;
  categoryId: string;
  categoryTitle: string;
  href: string;
};

const UNCATEGORIZED_ID = '__uncategorized__';

export default function BlogSearchBar({ posts, onSelectPost, perTagLimit = 3 }: BlogSearchBarProps) {
  const reactId = useId();
  const listboxId = `${reactId}-listbox`;
  const inputId = `${reactId}-input`;
  const titleId = `${reactId}-title`;

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect platform to show ⌘K vs Ctrl+K on the trigger
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const platform =
      // @ts-expect-error — userAgentData is the modern API, falls back to platform
      navigator.userAgentData?.platform ?? navigator.platform ?? '';
    setIsMac(/mac/i.test(platform));
  }, []);

  // Flatten posts into searchable items, primary-category-keyed
  const allItems = useMemo<SearchItem[]>(() => {
    return posts.map((p) => {
      const cat = p.categories?.[0];
      return {
        id: p._id,
        title: p.title,
        excerpt: p.excerpt ?? '',
        categoryId: cat?._id ?? UNCATEGORIZED_ID,
        categoryTitle: cat?.title ?? 'Uncategorized',
        href: `/blog/${p.slug.current}`,
      };
    });
  }, [posts]);

  // Filter by query across title, excerpt, and tag
  const filtered = useMemo<SearchItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.categoryTitle.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  // Group by category (first-seen order), cap each at perTagLimit
  const grouped = useMemo(() => {
    const order: string[] = [];
    const bucket = new Map<string, { title: string; items: SearchItem[] }>();
    for (const item of filtered) {
      if (!bucket.has(item.categoryId)) {
        order.push(item.categoryId);
        bucket.set(item.categoryId, { title: item.categoryTitle, items: [] });
      }
      bucket.get(item.categoryId)!.items.push(item);
    }
    return order.map((catId) => {
      const entry = bucket.get(catId)!;
      const total = entry.items.length;
      const visible = entry.items.slice(0, perTagLimit);
      return {
        categoryId: catId,
        categoryTitle: entry.title,
        items: visible,
        total,
        truncated: total > perTagLimit,
      };
    });
  }, [filtered, perTagLimit]);

  // Flat list in display order — for keyboard nav indexing
  const visibleFlat = useMemo<SearchItem[]>(() => grouped.flatMap((g) => g.items), [grouped]);

  // Reset highlight when the visible list changes
  useEffect(() => {
    setActiveIndex(visibleFlat.length > 0 ? 0 : -1);
  }, [visibleFlat]);

  // Keep active row in view during keyboard navigation
  useEffect(() => {
    if (activeIndex < 0 || !listboxRef.current) return;
    const el = listboxRef.current.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  // Open / close lifecycle: focus management, body-scroll lock, query reset
  const openModal = useCallback(() => {
    lastActiveRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    // Restore focus to whatever opened the modal
    setTimeout(() => lastActiveRef.current?.focus(), 0);
  }, []);

  // Body scroll lock + autofocus + Esc handling while open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeModal]);

  // Global Cmd+K / Ctrl+K to open the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          closeModal();
        } else {
          openModal();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, openModal, closeModal]);

  const select = (item: SearchItem) => {
    closeModal();
    onSelectPost(item.href);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1 >= visibleFlat.length ? 0 : i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 < 0 ? visibleFlat.length - 1 : i - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(visibleFlat.length - 1);
    } else if (e.key === 'Enter' && activeIndex >= 0 && visibleFlat[activeIndex]) {
      e.preventDefault();
      select(visibleFlat[activeIndex]);
    }
  };

  // Highlight matched query substring within a text
  const renderHighlighted = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="rounded-sm bg-yellow-200/80 px-0.5 text-black">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const activeOptionId =
    activeIndex >= 0 && visibleFlat[activeIndex] ? `${listboxId}-${visibleFlat[activeIndex].id}` : undefined;

  const totalFiltered = filtered.length;
  const totalVisible = visibleFlat.length;

  return (
    <>
      {/* Trigger — looks like a search input but opens the modal on click */}
      <button
        ref={triggerRef}
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open blog search"
        className="group flex w-full cursor-pointer items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-left transition-colors hover:border-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26]/30"
      >
        <Search className="h-4 w-4 shrink-0 text-black/45" strokeWidth={2.25} aria-hidden="true" />
        <span className="flex-1 truncate text-sm font-medium text-black/40">
          Search blogs by title, excerpt, or tag…
        </span>
        <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-black/15 bg-[#F7F7F7] px-1.5 py-0.5 text-[10px] font-bold text-black/55 sm:inline-flex">
          {isMac ? '⌘' : 'Ctrl'}
          <span className="text-black/30">+</span>K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-200 flex items-start justify-center px-4 pt-[10vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close search"
              onClick={closeModal}
              className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
              tabIndex={-1}
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
              style={{ maxHeight: 'min(70vh, 640px)' }}
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 id={titleId} className="sr-only">
                Search blog posts
              </h2>

              {/* Header — search input */}
              <div className="flex shrink-0 items-center gap-2 border-b border-black/8 px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-black/45" strokeWidth={2.25} aria-hidden="true" />
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  inputMode="search"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Search blogs by title, excerpt, or tag…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listboxId}
                  aria-autocomplete="list"
                  aria-activedescendant={activeOptionId}
                  aria-label="Search blog posts"
                  className="flex-1 bg-transparent text-sm font-medium text-black outline-none placeholder:text-black/40"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-black/45 transition-colors hover:bg-black/8 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close search"
                  className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-black/45 transition-colors hover:bg-black/8 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
                >
                  <kbd className="text-[10px] font-bold">esc</kbd>
                </button>
              </div>

              {/* Body — grouped results */}
              <div
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-label="Blog posts grouped by tag"
                className="min-h-0 flex-1 overflow-y-auto"
              >
                {totalFiltered === 0 ? (
                  <div className="px-4 py-12 text-center text-sm text-black/50">
                    {query ? (
                      <>No blogs match &ldquo;{query}&rdquo;. Try a different keyword.</>
                    ) : (
                      <>No blogs available.</>
                    )}
                  </div>
                ) : (
                  <div className="py-2">
                    {grouped.map((section) => (
                      <div key={section.categoryId} className="pb-1">
                        <div className="flex items-center justify-between px-4 pb-1 pt-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-black/55">
                            {section.categoryTitle}
                          </span>
                          {section.truncated ? (
                            <span className="text-[10px] font-semibold text-black/40">
                              showing {perTagLimit} of {section.total}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-black/40">
                              {section.total} {section.total === 1 ? 'blog' : 'blogs'}
                            </span>
                          )}
                        </div>
                        <ul>
                          {section.items.map((item) => {
                            const flatIdx = visibleFlat.indexOf(item);
                            const isActive = flatIdx === activeIndex;
                            const optionId = `${listboxId}-${item.id}`;
                            return (
                              <li key={item.id}>
                                <button
                                  id={optionId}
                                  role="option"
                                  data-idx={flatIdx}
                                  aria-selected={isActive}
                                  type="button"
                                  onMouseDown={(e) => {
                                    // Prevent input blur before click fires
                                    e.preventDefault();
                                  }}
                                  onMouseEnter={() => setActiveIndex(flatIdx)}
                                  onClick={() => select(item)}
                                  className={[
                                    'flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-sm transition-colors',
                                    isActive ? 'bg-[#FDF2F2]' : 'hover:bg-black/4',
                                  ].join(' ')}
                                >
                                  <ArrowRight
                                    className={[
                                      'h-4 w-4 shrink-0 transition-colors',
                                      isActive ? 'text-[#E21F26]' : 'text-black/35',
                                    ].join(' ')}
                                    strokeWidth={2.25}
                                    aria-hidden="true"
                                  />
                                  <div className="flex min-w-0 flex-1 flex-col">
                                    <span
                                      className={[
                                        'truncate font-medium leading-tight',
                                        isActive ? 'text-[#E21F26]' : 'text-black',
                                      ].join(' ')}
                                    >
                                      {renderHighlighted(item.title)}
                                    </span>
                                    {item.excerpt ? (
                                      <span className="truncate text-[11px] font-normal leading-tight text-black/50">
                                        {renderHighlighted(item.excerpt)}
                                      </span>
                                    ) : null}
                                  </div>
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

              {/* Footer — keyboard hints + result count */}
              <div className="flex shrink-0 items-center justify-between border-t border-black/8 bg-[#FAFAFA] px-4 py-2.5 text-[11px] text-black/55">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-black/15 bg-white px-1 text-[10px] font-bold text-black/65">
                      <CornerDownLeft className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                    </kbd>
                    <span>Open blog</span>
                  </span>
                  <span className="hidden items-center gap-1.5 sm:inline-flex">
                    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-black/15 bg-white px-1 text-[10px] font-bold text-black/65">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="hidden items-center gap-1.5 sm:inline-flex">
                    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-black/15 bg-white px-1 text-[10px] font-bold text-black/65">
                      esc
                    </kbd>
                    <span>Close</span>
                  </span>
                </div>
                <span className="font-semibold tabular-nums">
                  {totalFiltered === 0
                    ? '0 results'
                    : `${totalVisible} of ${totalFiltered}`}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
