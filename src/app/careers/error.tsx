'use client';

import { useEffect } from 'react';
import CareersUnavailable from '@/components/careers/CareersUnavailable';

/**
 * Backstop boundary for the whole /careers segment.
 *
 * The pages handle HRMS outages themselves (see `loadCareers`), so reaching
 * this means something genuinely unexpected broke. It keeps that contained to
 * the careers section instead of blanking the app.
 *
 * NOTE: there is deliberately no `loading.tsx` alongside this file. One would
 * put the segment behind a Suspense boundary, and streaming flushes a 200 status
 * before `notFound()` can run - turning every invalid careers URL into a soft
 * 404 that Google would happily index.
 */
export default function CareersError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[careers]', error);
  }, [error]);

  return <CareersUnavailable reset={reset} />;
}
