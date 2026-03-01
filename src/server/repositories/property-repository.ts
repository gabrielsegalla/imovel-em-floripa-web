import type { Prisma, Property } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function listProperties(where: Prisma.PropertyWhereInput): Promise<Property[]> {
  return prisma.property.findMany({
    where,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function listLatestProperties(limit: number): Promise<Property[]> {
  return prisma.property.findMany({
    take: limit,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function findPropertyById(id: string): Promise<Property | null> {
  return prisma.property.findUnique({
    where: { id },
  });
}

export async function createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
  return prisma.property.create({ data });
}

export async function updateProperty(
  id: string,
  data: Prisma.PropertyUpdateInput,
): Promise<Property> {
  return prisma.property.update({
    where: { id },
    data,
  });
}

export async function deleteProperty(id: string): Promise<void> {
  await prisma.property.delete({
    where: { id },
  });
}
