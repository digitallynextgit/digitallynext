"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ContactFormClient() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Full Name <span className="text-[#E21F26]">*</span>
          <input
            type="text"
            name="fullName"
            placeholder="Your full name"
            required
            className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
          />
        </label>

        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Work Email <span className="text-[#E21F26]">*</span>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            required
            className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Company / Brand
          <input
            type="text"
            name="company"
            placeholder="Company name"
            className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
          />
        </label>

        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Market / Region
          <div className="relative mt-2">
            <select
              name="region"
              className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
            >
              <option value="">Select region</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Middle East</option>
              <option>Asia Pacific</option>
              <option>Other</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
              ▾
            </span>
          </div>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Service of Interest
          <div className="relative mt-2">
            <select
              name="service"
              className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
            >
              <option value="">Select service</option>
              <option>Performance, Distribution &amp; Demand</option>
              <option>Content, Culture &amp; Media Creation</option>
              <option>Platforms, Web &amp; Digital Experience</option>
              <option>Strategy, Brand &amp; Growth Intelligence</option>
              <option>AI Enablement &amp; Decision Systems</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
              ▾
            </span>
          </div>
        </label>

        <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
          Budget Range
          <div className="relative mt-2">
            <select
              name="budget"
              className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
            >
              <option value="">Select range</option>
              <option>$5k–$15k</option>
              <option>$15k–$50k</option>
              <option>$50k–$100k</option>
              <option>$100k+</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
              ▾
            </span>
          </div>
        </label>
      </div>

      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
        Message / Project Details
        <textarea
          name="message"
          placeholder="Tell us about your project, goals, and timeline..."
          className="mt-2 min-h-[140px] w-full resize-none rounded-md border border-[#E6E6E6] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-4 sm:text-lg font-semibold tracking-[0.08em] capitalize text-lg text-[#111111] transition group cursor-pointer"
        style={{ fontFamily: "Stack Sans Text" }}
        disabled={isSubmitting}
      >
        <Image
          src="/figma/services/arrow1.svg"
          alt=""
          width={26}
          height={26}
          style={{ transform: "scaleX(1)" }}
          className="transition-transform duration-300 group-hover:-translate-x-2"
        />
        <span className="mt-1 hover:text-[#E21F26]">
          Inquire Now
        </span>
      </button>
    </form>
  );
}
