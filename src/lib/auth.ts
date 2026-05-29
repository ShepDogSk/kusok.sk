import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MIN_SECRET_LENGTH = 32;

export function requireAuth(request: NextRequest): NextResponse | null {
  const apiSecret = process.env.API_SECRET;
  if (!apiSecret) {
    console.error("CRITICAL: API_SECRET environment variable is not set");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  if (apiSecret.length < MIN_SECRET_LENGTH) {
    console.error(
      `CRITICAL: API_SECRET is too short (${apiSecret.length} chars, minimum ${MIN_SECRET_LENGTH})`
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  const authError = requireRateLimit(request);
  if (authError) return authError;

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    recordFailedAttempt(request);
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7);

  // Timing-safe comparison to prevent timing attacks
  const tokenBuffer = Buffer.from(token, "utf-8");
  const secretBuffer = Buffer.from(apiSecret, "utf-8");

  if (
    tokenBuffer.length !== secretBuffer.length ||
    !crypto.timingSafeEqual(tokenBuffer, secretBuffer)
  ) {
    recordFailedAttempt(request);
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  return null;
}

// --- In-memory sliding window rate limiter ---
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_ATTEMPTS = 10;

const failedAttempts = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function recordFailedAttempt(request: NextRequest): void {
  const ip = getClientIp(request);
  const now = Date.now();
  const attempts = failedAttempts.get(ip) || [];
  attempts.push(now);
  failedAttempts.set(ip, attempts);
}

function requireRateLimit(request: NextRequest): NextResponse | null {
  const ip = getClientIp(request);
  const now = Date.now();
  const attempts = failedAttempts.get(ip);

  if (!attempts) return null;

  // Prune attempts outside the window
  const recentAttempts = attempts.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  failedAttempts.set(ip, recentAttempts);

  if (recentAttempts.length === 0) {
    failedAttempts.delete(ip);
    return null;
  }

  if (recentAttempts.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many failed authentication attempts. Try again later." },
      { status: 429 }
    );
  }

  return null;
}
