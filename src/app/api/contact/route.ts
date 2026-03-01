import { NextRequest, NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email/send-contact-email";
import { contactSchema } from "@/lib/validators/contact";

export const runtime = "nodejs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const validation = contactSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid contact payload", details: validation.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(validation.data);
    return NextResponse.json({ message: "Message sent successfully" }, { status: 202 });
  } catch (error) {
    console.error("POST /api/contact failed", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
