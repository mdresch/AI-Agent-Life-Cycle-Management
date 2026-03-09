/**
 * Sanitizes a user-supplied string by stripping HTML tags and trimming whitespace.
 * Prevents XSS when user input is later rendered in the UI.
 * For a production app, replace with isomorphic-dompurify.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .trim()
}

/**
 * Shallowly sanitizes all top-level string properties of an object.
 *
 * ⚠ Limitation: Only top-level string fields are sanitized. Strings inside
 * nested objects or arrays are **not** processed. If your data model has nested
 * string fields that accept user input, call sanitizeString() on those fields
 * explicitly, or use a deep-sanitization library (e.g. isomorphic-dompurify)
 * before calling this function.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = { ...obj }
  for (const key of Object.keys(result)) {
    if (typeof result[key] === "string") {
      result[key] = sanitizeString(result[key] as string)
    }
  }
  return result as T
}
