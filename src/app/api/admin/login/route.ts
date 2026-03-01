import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_SESSION_COOKIE_NAME, createAdminSessionToken } from "@/lib/auth/admin-session";

export const runtime = "nodejs";

const adminLoginSchema = z.object({
  keyword: z.string().min(1),
});

function isSameKeyword(input: string, expected: string): boolean {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const validation = adminLoginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const configuredKeyword = process.env.ADMIN_ACCESS_KEY;
  if (!configuredKeyword) {
    return NextResponse.json({ error: "Admin keyword is not configured" }, { status: 500 });
  }

  if (!isSameKeyword(validation.data.keyword, configuredKeyword)) {
    return NextResponse.json({ error: "Invalid keyword" }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Authenticated" }, { status: 200 });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: createAdminSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
