export type PropertyType = "House" | "Apartment" | "SPE";
export type PropertyStatus = "Sale" | "Rent";

export type Property = {
  id: string;
  title: string;
  description: string;
  neighborhood: string;
  type: PropertyType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  parkingSpots: number;
  area: number;
  latitude: number;
  longitude: number;
  images: string[];
  featured: boolean;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
};

export type PropertyFilters = {
  search?: string;
  neighborhood?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  livingRooms?: number;
  parkingSpots?: number;
  minArea?: number;
  minPrice?: number;
  maxPrice?: number;
};
