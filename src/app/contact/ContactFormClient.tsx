"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const ENTITY_TYPES = [
  "SMB/MSME",
  "Start-up/D2C Brand",
  "MNC",
  "Education Entity",
  "Self Employed",
  "Portfolio in Making",
];

const SERVICES = [
  "Performance, Distribution & Demand",
  "Content, Culture & Media Creation",
  "Platforms, Web & Digital Experience",
  "Strategy, Brand & Growth Intelligence",
  "AI Enablement & Decision Systems (ADAC-Powered)",
];

const CUSTOM_SERVICE = "Custom Services";

export default function ContactFormClient() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customServiceNote, setCustomServiceNote] = useState("");

  const toggleService = (service: string) =>
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );

  const toggleCustom = () => {
    setIsCustomSelected((prev) => !prev);
    if (isCustomSelected) setCustomServiceNote("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!selectedEntity) {
      toast.error("Please select what best describes you.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);

      formData.set("entityType", selectedEntity);
      formData.delete("services");
      selectedServices.forEach((s) => formData.append("services", s));
      if (isCustomSelected) {
        formData.append("services", CUSTOM_SERVICE);
        formData.set("customServiceNote", customServiceNote.trim());
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        toast.error(result.error || "Unable to send message.");
        return;
      }

      toast.success("Message sent successfully.");
      formRef.current?.reset();
      setSelectedEntity("");
      setSelectedServices([]);
      setIsCustomSelected(false);
      setCustomServiceNote("");
    } catch {
      toast.error("Unable to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="grid gap-6"
      style={{ fontFamily: "Stack Sans Text" }}
      onSubmit={handleSubmit}
    >
      {/* Row 1 — Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Name <span className="text-[#E21F26]">*</span>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
            className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
          />
        </label>

        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Phone No. <span className="text-[#E21F26]">*</span>
          <input
            type="tel"
            name="phone"
            placeholder="+91 00000 00000"
            required
            className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
          />
        </label>
      </div>

      {/* Row 2 — Country + City */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Country
          <div className="relative mt-2">
            <select
              name="country"
              defaultValue=""
              className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
            >
              <option value="" disabled>
                Select country
              </option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>UAE</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Singapore</option>
              <option>Other</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
              ▾
            </span>
          </div>
        </label>

        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          City
          <input
            type="text"
            name="city"
            placeholder="Your city"
            className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
          />
        </label>
      </div>

      {/* LinkedIn */}
      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
        LinkedIn Profile Link
        <input
          type="url"
          name="linkedIn"
          placeholder="https://linkedin.com/in/yourprofile"
          className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
        />
      </label>

      {/* Are you a — pill single-select */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B] mb-3">
          Are you a <span className="text-[#E21F26]">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {ENTITY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedEntity(type)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedEntity === type
                  ? "bg-[#E21F26] border-[#E21F26] text-white"
                  : "bg-white border-[#E6E6E6] text-[#6B6B6B] hover:border-[#E21F26] hover:text-[#E21F26]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <input type="hidden" name="entityType" value={selectedEntity} />
      </div>

      {/* Services — pill multi-select */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B] mb-3">
          Service you want to explore
        </p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedServices.includes(service)
                  ? "bg-[#E21F26] border-[#E21F26] text-white"
                  : "bg-white border-[#E6E6E6] text-[#6B6B6B] hover:border-[#E21F26] hover:text-[#E21F26]"
              }`}
            >
              {service}
            </button>
          ))}

          {/* Custom / Clubbed Services pill */}
          <button
            type="button"
            onClick={toggleCustom}
            className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              isCustomSelected
                ? "bg-[#111111] border-[#111111] text-white"
                : "bg-white border-[#E6E6E6] text-[#6B6B6B] hover:border-[#111111] hover:text-[#111111]"
            }`}
          >
            Custom
          </button>
        </div>

        {/* Custom note — revealed when selected */}
        {isCustomSelected && (
          <div className="mt-4">
            <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
              Describe your custom requirement
              <textarea
                name="customServiceNote"
                value={customServiceNote}
                onChange={(e) => setCustomServiceNote(e.target.value)}
                placeholder="e.g. I need all services bundled / I want Performance + AI combined for my brand..."
                className="mt-2 min-h-[100px] w-full resize-none rounded-md border border-[#E6E6E6] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#111111]/20"
              />
            </label>
          </div>
        )}
      </div>

      {/* Message */}
      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
        Leave a message with your ask
        <textarea
          name="message"
          placeholder="Tell us about your project, goals, and timeline..."
          className="mt-2 min-h-[140px] w-full resize-none rounded-md border border-[#E6E6E6] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-4 sm:text-lg font-semibold tracking-[0.08em] capitalize text-lg text-[#111111] transition group cursor-pointer disabled:opacity-60"
        style={{ fontFamily: "Stack Sans Text" }}
      >
        <Image
          src="/figma/services/arrow1.svg"
          alt=""
          width={26}
          height={26}
          className="transition-transform duration-300 group-hover:-translate-x-2"
        />
        <span className="mt-1 hover:text-[#E21F26]">
          {isSubmitting ? "Sending…" : "Inquire Now"}
        </span>
      </button>
    </form>
  );
}
