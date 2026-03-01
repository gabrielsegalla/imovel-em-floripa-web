import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { propertyInputSchema } from "@/lib/validators/property";
import {
  getPropertyById,
  removeProperty,
  updateExistingProperty,
} from "@/server/services/property-service";
import { serializeProperty } from "@/server/services/property-serializer";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: RouteContext): Promise<NextResponse> {
  const { id } = await context.params;

  try {
    const property = await getPropertyById(id);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(serializeProperty(property), { status: 200 });
  } catch (error) {
    console.error("GET /api/properties/[id] failed", error);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const { id } = await context.params;
  const body = await request.json();
  const validation = propertyInputSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid property payload", details: validation.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const updated = await updateExistingProperty(id, validation.data);
    return NextResponse.json(serializeProperty(updated), { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    console.error("PUT /api/properties/[id] failed", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: RouteContext): Promise<NextResponse> {
  const { id } = await context.params;

  try {
    await removeProperty(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    console.error("DELETE /api/properties/[id] failed", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
