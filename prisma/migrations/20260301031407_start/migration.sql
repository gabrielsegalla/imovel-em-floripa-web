-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('House', 'Apartment', 'SPE');

-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('Sale', 'Rent');

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "type" "public"."PropertyType" NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "livingRooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."PropertyStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "public"."Property"("status");

-- CreateIndex
CREATE INDEX "Property_type_idx" ON "public"."Property"("type");

-- CreateIndex
CREATE INDEX "Property_neighborhood_idx" ON "public"."Property"("neighborhood");

-- CreateIndex
CREATE INDEX "Property_featured_idx" ON "public"."Property"("featured");
