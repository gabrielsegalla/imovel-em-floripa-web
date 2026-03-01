import type { Prisma, Property } from "@prisma/client";

import type { PropertyInput, PropertyQuery } from "@/lib/validators/property";
import {
  createProperty,
  deleteProperty,
  findPropertyById,
  listLatestProperties,
  listProperties,
  updateProperty,
} from "@/server/repositories/property-repository";

function toWhereClause(filters: PropertyQuery): Prisma.PropertyWhereInput {
  const where: Prisma.PropertyWhereInput = {};

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { neighborhood: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.neighborhood) {
    where.neighborhood = filters.neighborhood;
  }

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (typeof filters.bedrooms === "number") {
    where.bedrooms = { gte: filters.bedrooms };
  }

  if (typeof filters.bathrooms === "number") {
    where.bathrooms = { gte: filters.bathrooms };
  }

  if (typeof filters.livingRooms === "number") {
    where.livingRooms = { gte: filters.livingRooms };
  }

  if (typeof filters.parkingSpots === "number") {
    where.parkingSpots = { gte: filters.parkingSpots };
  }

  if (typeof filters.minArea === "number") {
    where.area = { gte: filters.minArea };
  }

  if (typeof filters.minPrice === "number" || typeof filters.maxPrice === "number") {
    where.price = {};

    if (typeof filters.minPrice === "number") {
      where.price.gte = filters.minPrice;
    }

    if (typeof filters.maxPrice === "number") {
      where.price.lte = filters.maxPrice;
    }
  }

  if (typeof filters.featured === "boolean") {
    where.featured = filters.featured;
  }

  return where;
}

export async function getProperties(filters: PropertyQuery): Promise<Property[]> {
  return listProperties(toWhereClause(filters));
}

export async function getLatestProperties(limit = 6): Promise<Property[]> {
  return listLatestProperties(limit);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return findPropertyById(id);
}

export async function createNewProperty(input: PropertyInput): Promise<Property> {
  return createProperty({
    ...input,
    price: input.price,
  });
}

export async function updateExistingProperty(id: string, input: PropertyInput): Promise<Property> {
  return updateProperty(id, {
    ...input,
    price: input.price,
  });
}

export async function removeProperty(id: string): Promise<void> {
  await deleteProperty(id);
}
