"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLocale } from "@/components/i18n/locale-provider";
import { contactSchema, type ContactInput } from "@/lib/validators/contact";

export function ContactForm(): JSX.Element {
  const [serverState, setServerState] = useState<"idle" | "success" | "error">("idle");
  const { translate } = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput): Promise<void> {
    setServerState("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setServerState("success");
      reset();
      return;
    }

    setServerState("error");
  }

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#0A1F44] focus:ring-2 focus:ring-blue-100";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">{translate("contact.form.name")}</label>
        <input className={fieldClass} {...register("name")} />
        {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">{translate("contact.form.email")}</label>
        <input type="email" className={fieldClass} {...register("email")} />
        {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">{translate("contact.form.phone")}</label>
        <input className={fieldClass} {...register("phone")} />
        {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">{translate("contact.form.message")}</label>
        <textarea rows={5} className={fieldClass} {...register("message")} />
        {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[#0A1F44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16356f] disabled:opacity-60"
      >
        {isSubmitting ? translate("contact.form.sending") : translate("contact.form.send")}
      </button>

      {serverState === "success" ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {translate("contact.form.success")}
        </p>
      ) : null}

      {serverState === "error" ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {translate("contact.form.error")}
        </p>
      ) : null}
    </form>
  );
}
