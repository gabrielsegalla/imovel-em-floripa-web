import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProperty = {
  title: string;
  description: string;
  neighborhood: string;
  type: "House" | "Apartment" | "SPE";
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
  status: "Sale" | "Rent";
};

const seedProperties: SeedProperty[] = [
  {
    title: "Sea View Apartment in Agronomica",
    description:
      "Modern apartment with open social area, ocean-facing balcony, and premium finishing standards. Ideal for families seeking comfort and strategic access to downtown Florianópolis.",
    neighborhood: "Agronomica",
    type: "Apartment",
    price: 1290000,
    bedrooms: 3,
    bathrooms: 3,
    livingRooms: 1,
    parkingSpots: 2,
    area: 142,
    latitude: -27.5808,
    longitude: -48.5408,
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    status: "Sale",
  },
  {
    title: "Garden House in Cacupé",
    description:
      "Spacious house with private garden, gourmet area, and home office space. Quiet residential zone with easy access to SC-401.",
    neighborhood: "Cacupé",
    type: "House",
    price: 2190000,
    bedrooms: 4,
    bathrooms: 4,
    livingRooms: 2,
    parkingSpots: 3,
    area: 310,
    latitude: -27.5308,
    longitude: -48.5236,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    status: "Sale",
  },
  {
    title: "Compact Apartment in Trindade",
    description:
      "Functional apartment close to UFSC, excellent for students and young professionals. Includes natural light and efficient layout.",
    neighborhood: "Trindade",
    type: "Apartment",
    price: 4200,
    bedrooms: 2,
    bathrooms: 1,
    livingRooms: 1,
    parkingSpots: 1,
    area: 64,
    latitude: -27.6002,
    longitude: -48.5209,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    status: "Rent",
  },
  {
    title: "Family House in Campeche",
    description:
      "Renovated house with integrated kitchen, backyard, and great proximity to Campeche beach. Balanced location for work and leisure.",
    neighborhood: "Campeche",
    type: "House",
    price: 1590000,
    bedrooms: 3,
    bathrooms: 3,
    livingRooms: 2,
    parkingSpots: 2,
    area: 198,
    latitude: -27.6798,
    longitude: -48.4867,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    status: "Sale",
  },
  {
    title: "Investment SPE Unit in Centro",
    description:
      "Strategic SPE opportunity in central Florianópolis with strong rental potential and high liquidity profile for investors.",
    neighborhood: "Centro",
    type: "SPE",
    price: 890000,
    bedrooms: 2,
    bathrooms: 2,
    livingRooms: 1,
    parkingSpots: 1,
    area: 86,
    latitude: -27.5954,
    longitude: -48.548,
    images: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    status: "Sale",
  },
  {
    title: "Penthouse for Rent in Jurere Internacional",
    description:
      "High-end penthouse with wide terrace and leisure integration in one of the most prestigious neighborhoods in Florianópolis.",
    neighborhood: "Jurere Internacional",
    type: "Apartment",
    price: 16500,
    bedrooms: 4,
    bathrooms: 5,
    livingRooms: 2,
    parkingSpots: 3,
    area: 290,
    latitude: -27.442,
    longitude: -48.498,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    status: "Rent",
  },
  {
    title: "Ocean Breeze Home in Ingleses",
    description:
      "Comfortable two-level home with social integration and outdoor deck, a few minutes from Ingleses beach and local commerce.",
    neighborhood: "Ingleses",
    type: "House",
    price: 980000,
    bedrooms: 3,
    bathrooms: 2,
    livingRooms: 1,
    parkingSpots: 2,
    area: 160,
    latitude: -27.437,
    longitude: -48.396,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616594039964-3e531d6f6629?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    status: "Sale",
  },
  {
    title: "Apartment Near Beira-Mar in Centro",
    description:
      "Well-located rental unit near Beira-Mar Norte, with practical layout and easy access to services, restaurants, and mobility corridors.",
    neighborhood: "Centro",
    type: "Apartment",
    price: 5300,
    bedrooms: 2,
    bathrooms: 2,
    livingRooms: 1,
    parkingSpots: 1,
    area: 78,
    latitude: -27.5903,
    longitude: -48.5533,
    images: [
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    status: "Rent",
  },
  {
    title: "SPE Growth Asset in Itacorubi",
    description:
      "SPE-backed real estate product in innovation corridor with mixed-use potential and strong medium-term appreciation perspective.",
    neighborhood: "Itacorubi",
    type: "SPE",
    price: 740000,
    bedrooms: 1,
    bathrooms: 1,
    livingRooms: 1,
    parkingSpots: 1,
    area: 58,
    latitude: -27.5789,
    longitude: -48.5098,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    status: "Sale",
  },
  {
    title: "Townhouse in Lagoa da Conceicao",
    description:
      "Charming townhouse with contemporary architecture, close to Lagoa amenities and easy access to east side beaches.",
    neighborhood: "Lagoa da Conceicao",
    type: "House",
    price: 1430000,
    bedrooms: 3,
    bathrooms: 3,
    livingRooms: 2,
    parkingSpots: 2,
    area: 187,
    latitude: -27.6042,
    longitude: -48.4587,
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    status: "Sale",
  },
  {
    title: "Canasvieiras Rental Apartment",
    description:
      "Season-friendly apartment with practical layout and low maintenance profile. Good option for families and remote workers.",
    neighborhood: "Canasvieiras",
    type: "Apartment",
    price: 3900,
    bedrooms: 2,
    bathrooms: 1,
    livingRooms: 1,
    parkingSpots: 1,
    area: 62,
    latitude: -27.4301,
    longitude: -48.4582,
    images: [
      "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1617104551722-3b2d513664ff?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    status: "Rent",
  },
];

async function main(): Promise<void> {
  await prisma.property.deleteMany();

  await prisma.property.createMany({
    data: seedProperties,
  });

  const total = await prisma.property.count();
  console.log(`Seed completed. Inserted ${total} properties.`);
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
