import type { Property } from "@prisma/client";

export type SerializedProperty = Omit<Property, "price" | "createdAt" | "updatedAt"> & {
  price: number;
  createdAt: string;
  updatedAt: string;
};

export function serializeProperty(property: Property): SerializedProperty {
  return {
    ...property,
    price: Number(property.price),
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
  };
}

export function serializeProperties(properties: Property[]): SerializedProperty[] {
  return properties.map(serializeProperty);
}
