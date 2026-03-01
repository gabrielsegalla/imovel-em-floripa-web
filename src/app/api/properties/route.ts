import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticatedRequest } from "@/lib/auth/admin-session";
import { propertyInputSchema, propertyQuerySchema } from "@/lib/validators/property";
import { createNewProperty, getProperties } from "@/server/services/property-service";
import { serializeProperties, serializeProperty } from "@/server/services/property-serializer";

export const runtime = "nodejs";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const queryObject = Object.fromEntries(request.nextUrl.searchParams.entries());
  const validation = propertyQuerySchema.safeParse(queryObject);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: validation.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const properties = await getProperties(validation.data);
    return NextResponse.json(serializeProperties(properties), { status: 200 });
  } catch (error) {
    console.error("GET /api/properties failed", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isAdminAuthenticatedRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validation = propertyInputSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid property payload", details: validation.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const property = await createNewProperty(validation.data);
    return NextResponse.json(serializeProperty(property), { status: 201 });
  } catch (error) {
    console.error("POST /api/properties failed", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
