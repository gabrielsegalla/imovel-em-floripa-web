"use client";

import { useMemo, useState } from "react";

import {
  FLORIANOPOLIS_NEIGHBORHOODS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants/florianopolis-neighborhoods";

type AdminDashboardClientProps = {
  initialAuthenticated: boolean;
};

type PropertyFormState = {
  title: string;
  description: string;
  neighborhood: string;
  type: string;
  status: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  livingRooms: string;
  parkingSpots: string;
  area: string;
  latitude: string;
  longitude: string;
  featured: boolean;
  imagesText: string;
};

const initialFormState: PropertyFormState = {
  title: "",
  description: "",
  neighborhood: FLORIANOPOLIS_NEIGHBORHOODS[0],
  type: PROPERTY_TYPES[0],
  status: PROPERTY_STATUSES[0],
  price: "",
  bedrooms: "",
  bathrooms: "",
  livingRooms: "",
  parkingSpots: "",
  area: "",
  latitude: "",
  longitude: "",
  featured: false,
  imagesText: "",
};

function buildPayload(form: PropertyFormState) {
  const images = form.imagesText
    .split(/\n|,/) 
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    title: form.title,
    description: form.description,
    neighborhood: form.neighborhood,
    type: form.type,
    status: form.status,
    price: Number(form.price),
    bedrooms: Number(form.bedrooms),
    bathrooms: Number(form.bathrooms),
    livingRooms: Number(form.livingRooms),
    parkingSpots: Number(form.parkingSpots),
    area: Number(form.area),
    latitude: Number(form.latitude),
    longitude: Number(form.longitude),
    featured: form.featured,
    images,
  };
}

export function AdminDashboardClient({ initialAuthenticated }: AdminDashboardClientProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [keyword, setKeyword] = useState("");
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  const [form, setForm] = useState<PropertyFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return !isSubmitting && isAuthenticated;
  }, [isSubmitting, isAuthenticated]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsAuthSubmitting(true);
    setAuthMessage(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      setAuthMessage(payload.error ?? "Failed to authenticate.");
      setIsAuthSubmitting(false);
      return;
    }

    setIsAuthenticated(true);
    setKeyword("");
    setAuthMessage("Authenticated successfully.");
    setIsAuthSubmitting(false);
  }

  async function handleLogout(): Promise<void> {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setAuthMessage("Session finished.");
  }

  async function handleCreateProperty(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);

    const response = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(form)),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        details?: unknown;
      };
      setSubmitMessage(payload.error ?? "Failed to create property.");
      setIsSubmitting(false);
      return;
    }

    setForm(initialFormState);
    setSubmitMessage("Property created successfully.");
    setIsSubmitting(false);
  }

  if (!isAuthenticated) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A1F44]">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your configured keyword to unlock property management.</p>

        <form onSubmit={handleLogin} className="mt-5 flex flex-col gap-3 sm:max-w-md">
          <label className="text-sm font-medium text-slate-700" htmlFor="admin-keyword">
            Access keyword
          </label>
          <input
            id="admin-keyword"
            type="password"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-blue-100"
            placeholder="Enter keyword"
            required
          />

          <button
            type="submit"
            disabled={isAuthSubmitting}
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#0A1F44] px-4 text-sm font-semibold text-white transition hover:bg-[#16356f] disabled:opacity-60"
          >
            {isAuthSubmitting ? "Signing in..." : "Sign in"}
          </button>

          {authMessage ? <p className="text-sm text-slate-600">{authMessage}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A1F44]">Admin - New Property</h1>
          <p className="mt-1 text-sm text-slate-600">Create listings directly in your database.</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleCreateProperty} className="grid gap-3 md:grid-cols-2">
        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" placeholder="Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
        <select className="h-11 rounded-md border border-slate-300 px-3 text-sm" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}>
          {PROPERTY_STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select className="h-11 rounded-md border border-slate-300 px-3 text-sm" value={form.type} onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select className="h-11 rounded-md border border-slate-300 px-3 text-sm" value={form.neighborhood} onChange={(event) => setForm((prev) => ({ ...prev, neighborhood: event.target.value }))}>
          {FLORIANOPOLIS_NEIGHBORHOODS.map((neighborhood) => (
            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
          ))}
        </select>

        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" step="0.01" min="0" placeholder="Price" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} required />
        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" min="0" placeholder="Area (m²)" value={form.area} onChange={(event) => setForm((prev) => ({ ...prev, area: event.target.value }))} required />

        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" min="0" placeholder="Bedrooms" value={form.bedrooms} onChange={(event) => setForm((prev) => ({ ...prev, bedrooms: event.target.value }))} required />
        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" min="0" placeholder="Bathrooms" value={form.bathrooms} onChange={(event) => setForm((prev) => ({ ...prev, bathrooms: event.target.value }))} required />

        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" min="0" placeholder="Living rooms" value={form.livingRooms} onChange={(event) => setForm((prev) => ({ ...prev, livingRooms: event.target.value }))} required />
        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" min="0" placeholder="Parking spots" value={form.parkingSpots} onChange={(event) => setForm((prev) => ({ ...prev, parkingSpots: event.target.value }))} required />

        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" step="0.000001" placeholder="Latitude" value={form.latitude} onChange={(event) => setForm((prev) => ({ ...prev, latitude: event.target.value }))} required />
        <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" type="number" step="0.000001" placeholder="Longitude" value={form.longitude} onChange={(event) => setForm((prev) => ({ ...prev, longitude: event.target.value }))} required />

        <label className="md:col-span-2 inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700">
          <input type="checkbox" checked={form.featured} onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))} />
          Featured property
        </label>

        <textarea
          className="min-h-[120px] rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          required
        />

        <textarea
          className="min-h-[120px] rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          placeholder="Image URLs (one per line or comma-separated)"
          value={form.imagesText}
          onChange={(event) => setForm((prev) => ({ ...prev, imagesText: event.target.value }))}
          required
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="md:col-span-2 inline-flex h-11 items-center justify-center rounded-md bg-[#0A1F44] px-4 text-sm font-semibold text-white transition hover:bg-[#16356f] disabled:opacity-60"
        >
          {isSubmitting ? "Creating property..." : "Create property"}
        </button>

        {submitMessage ? <p className="md:col-span-2 text-sm text-slate-600">{submitMessage}</p> : null}
      </form>
    </section>
  );
}
