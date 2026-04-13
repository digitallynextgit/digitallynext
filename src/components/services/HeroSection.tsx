'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { ServiceHeroSection, ServiceTheme } from '@/data/services';
import ContactFormClient from '@/app/contact/ContactFormClient';

type Props = {
  hero: ServiceHeroSection;
  theme: ServiceTheme;
};

const getFocusableElements = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')
  ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

export default function HeroSection({ hero, theme }: Props) {
  const isCentered = hero.layout === 'centered' || hero.layout === 'stacked';

  const quoteColor = hero.quoteColor ?? theme.accentAlt;

  const ctaTextColor = hero.ctaColor
    ? hero.ctaColor
    : hero.ctaVariant === 'accent'
      ? theme.accent
      : hero.ctaVariant === 'alt'
        ? theme.accentAlt
        : theme.heroText;

  // ---- MULTI QUOTE SUPPORT ----
  const quotes = useMemo(
    () => (Array.isArray(hero.quoteText) ? hero.quoteText : hero.quoteText ? [hero.quoteText] : []),
    [hero.quoteText]
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  const activeQuote: string =
    quotes.length > 0 ? quotes[quoteIndex] : typeof hero.quoteText === 'string' ? hero.quoteText : '';

  // ---- TYPEWRITER ----
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    if (!activeQuote) return;

    const speed = 65; // ms per character
    const pauseAfter = 1500; // ms pause after typing finishes before next action
    const isSingleQuote = quotes.length <= 1;
    let i = 0;
    let cancelled = false;

    const startTyping = () => {
      i = 0;
      setDisplayedText('');
      setIsDone(false);
      const tick = () => {
        if (cancelled) return;
        i++;
        setDisplayedText(activeQuote.slice(0, i));
        if (i < activeQuote.length) {
          typeTimerRef.current = setTimeout(tick, speed);
        } else {
          setIsDone(true);
          if (isSingleQuote) {
            // Single quote: pause then retype the same one
            typeTimerRef.current = setTimeout(startTyping, pauseAfter);
          } else {
            // Multi-quote array: pause then advance to next quote
            typeTimerRef.current = setTimeout(() => {
              if (!cancelled) {
                setQuoteIndex((prev) => (prev + 1) % quotes.length);
              }
            }, pauseAfter);
          }
        }
      };
      typeTimerRef.current = setTimeout(tick, speed);
    };

    startTyping();

    return () => {
      cancelled = true;
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
    };
  }, [activeQuote, quotes.length]);

  useEffect(() => {
    if (!contactOpen) return;
    lastActiveRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setContactOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = getFocusableElements(panelRef.current);
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
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
  }, [contactOpen]);

  // Navbar heights: h-14(56px) md:h-16(64px) lg:h-24(96px) 2xl:h-28(112px)

  return (
    <>
      <section
        className="relative overflow-hidden min-h-screen"
        style={{
          backgroundColor: theme.heroBg,
          color: theme.heroText,
        }}
      >
        {/* Background layer */}
        {hero.backgroundVideo ? (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              src={hero.backgroundVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
            <div className="absolute inset-0 z-10" style={{ background: hero.overlay ?? 'rgba(0,0,0,0.6)' }} />
          </div>
        ) : hero.backgroundImage ? (
          <div className="absolute inset-0 z-0">
            <Image src={hero.backgroundImage} alt="" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/10 via-black/30 to-black/65" />
          </div>
        ) : hero.overlay ? (
          <div className="absolute inset-0 z-0" style={{ background: hero.overlay }} />
        ) : null}

        {/* Content wrapper */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col pt-14 md:pt-16 lg:pt-24 2xl:pt-28" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div
              className={[
                'flex-1 flex flex-col justify-center',
                'pb-10 md:pb-14 lg:pb-20 lg:mt-20',
                isCentered ? 'mx-auto max-w-7xl text-center' : 'max-w-276',
              ].join(' ')}
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-0"
              >
                <h1 className="font-bold tracking-[-0.025em] leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px]">
                  {hero.titleLines.map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                      {idx === hero.titleLines.length - 1 && <span className="text-[#E21F26]">.</span>}
                    </span>
                  ))}
                </h1>

                {hero.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg"
                    style={{ color: theme.heroMutedText }}
                  >
                    {hero.subtitle}
                  </motion.p>
                )}
              </motion.div>

              {/* Quote + Body + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 sm:mt-10 space-y-1"
              >
                {/* Rotating Quote */}
                {activeQuote && (
                  <motion.div
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-base sm:text-lg lg:text-2xl font-semibold leading-relaxed"
                    style={{ color: quoteColor, textShadow: hero.quoteShadow }}
                  >
                    {displayedText}
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        marginLeft: '1px',
                        opacity: isDone ? 0 : 1,
                        animation: isDone ? 'none' : 'blink 0.8s step-start infinite',
                        backgroundColor: quoteColor,
                        verticalAlign: 'middle',
                        height: '1em',
                      }}
                      aria-hidden
                    />
                    <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
                  </motion.div>
                )}

                {/* Body */}
                <div className="flex flex-col mt-5">
                  {hero.body.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base lg:text-xl leading-relaxed"
                      style={{ color: theme.heroMutedText }}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                </div>

                {/* CTA */}
                <div className={`pt-2 md:pt-4 lg:pt-7 ${isCentered ? 'flex justify-center' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    aria-haspopup="dialog"
                    aria-controls={dialogId}
                    className="group inline-flex items-center gap-3 cursor-pointer"
                  >
                    <span className="transition-transform duration-300 ease-out group-hover:-translate-x-2">
                      <Image src={hero.arrowSrc!} alt="" width={30} height={20} />
                    </span>
                    <span
                      className="capitalize font-normal text-xl mt-1 transition-colors duration-200 group-hover:text-[#E21F26]"
                      style={{ color: ctaTextColor }}
                    >
                      {hero.ctaLabel}
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {contactOpen && (
        <div
          id={dialogId}
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setContactOpen(false);
          }}
        >
          <div
            ref={panelRef}
            className="relative flex w-full flex-col overflow-hidden bg-white shadow-2xl"
            style={{ maxWidth: 1060, borderRadius: 5, maxHeight: 'calc(100svh - 4rem)' }}
          >
            <div className="flex shrink-0 items-start justify-between gap-6 p-6 border-b">
              <div className="flex-1 min-w-0">
                <h2
                  id={titleId}
                  className="text-[clamp(24px,4vw,48px)] font-extrabold leading-tight tracking-tight text-black"
                >
                  Let’s Connect<span className="text-[#E21F26]">.</span>
                </h2>
                <p id={descId} className="mt-1.5 text-sm text-black/50">
                  Share your details and we’ll get back to you.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setContactOpen(false)}
                aria-label="Close modal"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/8 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <X strokeWidth={2.5} className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="mx-auto w-full">
                <ContactFormClient onSuccess={() => setContactOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
