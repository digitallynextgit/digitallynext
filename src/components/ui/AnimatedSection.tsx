'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

const directionVariants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: 40, opacity: 0 },
  right: { x: -40, opacity: 0 },
  none: { opacity: 0 },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={directionVariants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        // willChange tells the browser to promote this element to a GPU layer.
        // DO NOT also set WebkitTransform here — Framer Motion controls the transform
        // on every frame, so a static initial value causes conflict and mobile jitter.
        willChange: 'transform, opacity',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}
