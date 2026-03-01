import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z
    .string()
    .min(8)
    .max(30)
    .regex(/^[0-9+()\-\s]+$/, "Phone contains invalid characters"),
  message: z.string().min(10).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
