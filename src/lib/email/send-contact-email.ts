import { Resend } from "resend";

import type { ContactInput } from "@/lib/validators/contact";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  return new Resend(apiKey);
}

export async function sendContactEmail(payload: ContactInput): Promise<void> {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_RECEIVER_EMAIL ?? "larfloripa@yahoo.com.br";

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New contact request from ${payload.name}`,
    replyTo: payload.email,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Resend API error: ${error.message}`);
  }
}
