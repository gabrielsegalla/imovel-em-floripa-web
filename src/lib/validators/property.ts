import { z } from "zod";

import {
  FLORIANOPOLIS_NEIGHBORHOODS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants/florianopolis-neighborhoods";

const neighborhoodSchema = z.enum(FLORIANOPOLIS_NEIGHBORHOODS);
const propertyTypeSchema = z.enum(PROPERTY_TYPES);
const propertyStatusSchema = z.enum(PROPERTY_STATUSES);

export const propertyInputSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(20).max(8000),
  neighborhood: neighborhoodSchema,
  type: propertyTypeSchema,
  price: z.coerce.number().positive(),
  bedrooms: z.coerce.number().int().min(0).max(20),
  bathrooms: z.coerce.number().int().min(0).max(20),
  livingRooms: z.coerce.number().int().min(0).max(20),
  parkingSpots: z.coerce.number().int().min(0).max(20),
  area: z.coerce.number().int().min(15).max(5000),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  images: z.array(z.string().url()).min(1).max(20),
  featured: z.coerce.boolean().default(false),
  status: propertyStatusSchema,
});

export const propertyQuerySchema = z.object({
  search: z.string().optional(),
  neighborhood: neighborhoodSchema.optional(),
  type: propertyTypeSchema.optional(),
  status: propertyStatusSchema.optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  livingRooms: z.coerce.number().int().min(0).optional(),
  parkingSpots: z.coerce.number().int().min(0).optional(),
  minArea: z.coerce.number().int().min(0).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  featured: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;
export type PropertyQuery = z.infer<typeof propertyQuerySchema>;
