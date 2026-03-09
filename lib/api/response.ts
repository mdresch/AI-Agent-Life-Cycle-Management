import { NextResponse } from "next/server"
import type { ZodError } from "zod"

export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status })
}

export function apiError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

export function apiValidationError(zodError: ZodError): NextResponse {
  const errors = zodError.errors.map((e) => ({
    path: e.path.join("."),
    message: e.message,
  }))
  return NextResponse.json({ error: "Validation failed", errors }, { status: 422 })
}

export function apiPaginated<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number
): NextResponse {
  return NextResponse.json({ data, meta: { total, page, pageSize } })
}
