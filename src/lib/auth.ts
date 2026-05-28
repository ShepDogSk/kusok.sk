import { NextRequest, NextResponse } from "next/server";

export function requireAuth(request: NextRequest): NextResponse | null {
  const apiSecret = process.env.API_SECRET;
  if (!apiSecret) {
    return NextResponse.json(
      { error: "Server misconfigured: API_SECRET not set" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7);
  if (token !== apiSecret) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  return null;
}
