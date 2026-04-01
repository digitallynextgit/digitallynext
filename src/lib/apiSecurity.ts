/**
 * Shared API security utilities:
 * - CORS header builder (restrict to production origin)
 * - Input sanitizer (strip HTML tags to prevent XSS)
 * - SQL injection guard (detect and reject suspicious patterns)
 */

const ALLOWED_ORIGIN = 'https://www.digitallynext.com';

/** Returns CORS headers for a given request origin, allowing only the production domain. */
export function getCorsHeaders(requestOrigin: string | null): HeadersInit {
  const origin =
    requestOrigin === ALLOWED_ORIGIN ||
    // Allow localhost in development
    requestOrigin?.startsWith('http://localhost') ||
    requestOrigin?.startsWith('http://192.168.')
      ? (requestOrigin ?? ALLOWED_ORIGIN)
      : ALLOWED_ORIGIN;

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Strips HTML tags and encodes dangerous characters to prevent XSS.
 * Suitable for all text inputs before storing or rendering.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')           // strip HTML tags
    .replace(/&/g, '&amp;')            // encode & first
    .replace(/"/g, '&quot;')           // encode double quotes
    .replace(/'/g, '&#x27;')           // encode single quotes
    .replace(/</g, '&lt;')             // encode <
    .replace(/>/g, '&gt;')             // encode >
    .replace(/\//g, '&#x2F;')          // encode forward slash
    .trim();
}

/** SQL-injection pattern detector — rejects inputs containing common SQL keywords in dangerous contexts. */
const SQL_INJECTION_PATTERN =
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)|(-{2})|\/\*|\*\//gi;

export function hasSqlInjection(input: string): boolean {
  return SQL_INJECTION_PATTERN.test(input);
}

/**
 * Validates a string field — returns sanitized value or throws if suspicious.
 * Pass maxLength to truncate overly long inputs.
 */
export function validateField(value: string, maxLength = 500): string {
  const trimmed = sanitizeText(value).slice(0, maxLength);
  if (hasSqlInjection(trimmed)) {
    throw new Error('Invalid input detected.');
  }
  return trimmed;
}
