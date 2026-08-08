/**
 * Minimal in-memory, fixed-window rate limiter.
 *
 * Good enough as a first line of defense against form-spam bots on a single
 * serverless instance. It is NOT shared across instances/regions, so under
 * real distributed load a determined abuser can exceed the nominal limit by
 * landing on different instances. If abuse becomes a problem, swap this for
 * a shared store (Upstash Redis / @upstash/ratelimit) behind the same
 * `checkRateLimit` signature.
 */

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

const DEFAULT_WINDOW_MS = 60_000
const DEFAULT_MAX = 5

// Periodically drop expired buckets so the map doesn't grow unbounded on a
// long-lived instance.
const CLEANUP_INTERVAL_MS = 5 * 60_000
let cleanupTimer: ReturnType<typeof setInterval> | undefined

function ensureCleanupTimer() {
  if (cleanupTimer) return
  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key)
    }
  }, CLEANUP_INTERVAL_MS)
  cleanupTimer.unref?.()
}

export function checkRateLimit(
  key: string,
  opts?: { windowMs?: number; max?: number },
): { allowed: boolean; retryAfterMs: number } {
  ensureCleanupTimer()

  const windowMs = opts?.windowMs ?? DEFAULT_WINDOW_MS
  const max = opts?.max ?? DEFAULT_MAX
  const now = Date.now()

  const bucket = buckets.get(key)
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterMs: 0 }
  }

  if (bucket.count >= max) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now }
  }

  bucket.count += 1
  return { allowed: true, retryAfterMs: 0 }
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}
