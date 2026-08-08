import { NextResponse } from "next/server"

export type FieldErrors = Record<string, string>

export type ApiSuccess<T extends Record<string, unknown> = Record<string, never>> = {
  ok: true
} & T

export type ApiError = {
  ok: false
  error: string
  fieldErrors?: FieldErrors
  retryAfterMs?: number
}

export function ok<T extends Record<string, unknown> = Record<string, never>>(data?: T) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, ...(data as T) })
}

export function fail(
  status: number,
  error: string,
  extra?: Partial<Pick<ApiError, "fieldErrors" | "retryAfterMs">>,
) {
  return NextResponse.json<ApiError>({ ok: false, error, ...extra }, { status })
}
