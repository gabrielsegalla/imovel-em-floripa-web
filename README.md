# Imóvel em Floripa

Professional real estate platform for Florianópolis - SC built with Next.js App Router, Prisma, PostgreSQL, TailwindCSS, Framer Motion, Leaflet maps, and Zod.

## Stack

- Next.js 16 (App Router, Route Handlers)
- PostgreSQL + Prisma ORM
- TailwindCSS 4
- Framer Motion
- React Leaflet
- Zod validation
- Resend email API
- Vercel deployment ready

## Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_RECEIVER_EMAIL`
- `ENABLE_ADMIN_PROTECTION`
- `NEXT_PUBLIC_NEIGHBORHOODS_GEOJSON_URL` (optional)

## Neighborhood Boundaries on Map

The properties map supports clickable neighborhood polygons using GeoJSON.

- Default source: `public/data/florianopolis-neighborhoods.geojson`
- Optional external source: set `NEXT_PUBLIC_NEIGHBORHOODS_GEOJSON_URL`

Accepted property keys for neighborhood names:

- `neighborhood`
- `bairro`
- `name`
- `NM_BAIRRO`
- `nome`

When a polygon is clicked, the app applies the neighborhood filter automatically.

## Database Setup

Generate Prisma client and run migrations:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
```

Populate test data:

```bash
npm run prisma:seed
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## API Endpoints

- `GET /api/properties`
- `GET /api/properties/[id]`
- `POST /api/properties`
- `PUT /api/properties/[id]`
- `DELETE /api/properties/[id]`
- `POST /api/contact`

## Project Structure

- `src/app`: App Router pages and API route handlers
- `src/components`: UI components by domain
- `src/lib`: shared constants, validation, email, utilities, Prisma client
- `src/server`: repositories and domain services
- `prisma`: database schema and migrations

## Deployment (Vercel)

1. Push repository to Git provider.
2. Import project in Vercel.
3. Configure environment variables from `.env.example`.
4. Add Vercel Postgres and set `DATABASE_URL`.
5. Run migration in a CI step or before first deploy.

Recommended build command:

```bash
npm run prisma:generate && npm run build
```

## Future-Proofed Areas

- `/admin` route scaffold with middleware hook.
- Authentication gate toggle with `ENABLE_ADMIN_PROTECTION`.
- Image field supports external upload providers such as Vercel Blob or Cloudinary.
