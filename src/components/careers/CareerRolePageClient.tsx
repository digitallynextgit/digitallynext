'use client';

import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { getCareerDepartmentHref, type CareerRoleEntry } from '@/data/careersDepartments';

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  message: string;
  resumeUrl: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

function makeEmptyForm(): FormFields {
  return {
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    message: '',
    resumeUrl: '',
  };
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateForm(form: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  if (!form.linkedIn.trim()) errors.linkedIn = 'LinkedIn profile URL is required.';
  if (!form.portfolio.trim()) errors.portfolio = 'Portfolio / work link is required.';
  if (!form.resumeUrl.trim()) {
    errors.resumeUrl = 'Resume URL is required.';
  } else if (!isValidUrl(form.resumeUrl.trim())) {
    errors.resumeUrl = 'Enter a valid resume URL.';
  }
  return errors;
}

function Field({
  label,
  required,
  error,
  children,
  fullWidth,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={['flex flex-col gap-1.5', fullWidth ? 'md:col-span-2' : ''].join(' ')}>
      <span className="text-sm font-semibold text-black">
        {label}
        {required && <span className="ml-0.5 text-[#E21F26]">*</span>}
      </span>
      {children}
      {error && <span className="text-xs text-[#E21F26]">{error}</span>}
    </label>
  );
}

const inputCls = (hasError: boolean) =>
  [
    'h-11 w-full rounded border px-4 text-sm text-black outline-none transition cursor-text',
    'focus:ring-2 focus:ring-black/20',
    hasError ? 'border-[#E21F26] bg-red-50' : 'border-black/15 bg-white',
  ].join(' ');

export default function CareerRolePageClient({ entry }: { entry: CareerRoleEntry }) {
  const { department, mode, role } = entry;
  const description = role.description;
  const hasDescriptionDetails = Boolean(
    description?.jobEssence || description?.keyRequirements?.length || description?.currentOpenings?.length
  );
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormFields>(makeEmptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isFormReady = Object.keys(validateForm(form)).length === 0;

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitStatus('submitting');
    setSubmitError(null);

    try {
      const data = new FormData();
      data.append('fullName', form.fullName.trim());
      data.append('email', form.email.trim());
      data.append('phone', form.phone.trim());
      data.append('linkedIn', form.linkedIn.trim());
      data.append('portfolio', form.portfolio.trim());
      data.append('resumeUrl', form.resumeUrl.trim());
      data.append('message', form.message.trim());
      data.append('track', mode === 'internship' ? 'Internship' : 'Full-time');
      data.append('department', department.title);
      data.append('role', role.title);

      const res = await fetch('/api/careers', { method: 'POST', body: data });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) throw new Error(json.error ?? 'Submission failed. Please try again.');

      toast.success('Application submitted successfully.');
      setForm(makeEmptyForm());
      setErrors({});
      setSubmitStatus('success');
      setSubmitError(null);
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <main className="bg-[#FAFAFA]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 md:px-8 md:py-28 lg:gap-10 lg:px-10 lg:py-36">
        <div className="flex flex-col gap-4">
          <Link
            href={getCareerDepartmentHref(department)}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-[#E21F26]"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Department</span>
          </Link>

          <div className="rounded border border-[#E5E5E5] bg-white px-7 py-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex max-w-3xl flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FDF2F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#E21F26]">
                    {mode === 'internship' ? 'Internship' : 'Full-time'}
                  </span>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/60">
                    {department.title}
                  </span>
                </div>

                <div>
                  <h1 className="text-[clamp(30px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight text-black">
                    {role.title}
                  </h1>
                  {role.meta && <div className="mt-2 text-base text-black/50 capitalize">{role.meta}</div>}
                </div>

                {description?.intro && (
                  <p className="max-w-3xl text-[15px] leading-[1.85] text-black/70">{description.intro}</p>
                )}
              </div>

              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center rounded-full bg-[#E21F26] px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E21F26]/50"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {hasDescriptionDetails && (
          <div className="rounded border border-[#E5E5E5] bg-white px-7 py-7">
            <div className="flex flex-col gap-6">
              {description?.jobEssence && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-base font-bold text-black">Job Essence</h2>
                  <p className="text-[15px] leading-[1.75] text-black/70">{description.jobEssence}</p>
                </div>
              )}

              {!!description?.keyRequirements?.length && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-base font-bold text-black">Key Requirements</h2>
                  <ul className="flex flex-col gap-2">
                    {description.keyRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3 text-[15px] text-black/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E21F26]" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!!description?.currentOpenings?.length && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-base font-bold text-black">Current Openings</h2>
                  <ul className="flex flex-col gap-2">
                    {description.currentOpenings.map((opening, index) => (
                      <li key={index} className="flex items-start gap-3 text-[15px] text-black/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E21F26]" />
                        {opening}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={formRef} className="rounded border border-[#E5E5E5] bg-white px-7 py-7">
          <div className="mb-6 rounded border border-[#E5E5E5] bg-[#FAFAFA] px-6 py-5">
            <div className="text-xs font-bold uppercase tracking-widest text-black/40">Applying for</div>
            <div className="mt-1 text-lg font-bold text-black">{role.title}</div>
            <div className="mt-0.5 text-sm text-black/50">
              {mode === 'internship' ? 'Internship' : 'Full-time'} · {department.title}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Full Name" required error={errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                className={inputCls(!!errors.fullName)}
                placeholder="Your full name"
                autoComplete="name"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>

            <Field label="Email Address" required error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className={inputCls(!!errors.email)}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>

            <Field label="Phone Number" required error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className={inputCls(!!errors.phone)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                inputMode="tel"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>

            <Field label="LinkedIn Profile" required error={errors.linkedIn}>
              <input
                type="url"
                value={form.linkedIn}
                onChange={(event) => setForm((prev) => ({ ...prev, linkedIn: event.target.value }))}
                className={inputCls(!!errors.linkedIn)}
                placeholder="https://linkedin.com/in/yourname"
                inputMode="url"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>

            <Field label="Portfolio / Work Link" required error={errors.portfolio} fullWidth>
              <input
                type="url"
                value={form.portfolio}
                onChange={(event) => setForm((prev) => ({ ...prev, portfolio: event.target.value }))}
                className={inputCls(!!errors.portfolio)}
                placeholder="https://yourportfolio.com or Behance / Dribbble link"
                inputMode="url"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>

            <Field label="Resume URL" required error={errors.resumeUrl} fullWidth>
              <input
                type="url"
                value={form.resumeUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, resumeUrl: event.target.value }))}
                className={inputCls(!!errors.resumeUrl)}
                placeholder="https://drive.google.com/..."
                inputMode="url"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>

            <Field label="Message (optional)" error={errors.message} fullWidth>
              <textarea
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                className={[
                  'min-h-30 w-full resize-y rounded border px-4 py-3 text-sm text-black outline-none transition cursor-text',
                  'focus:ring-2 focus:ring-black/20',
                  'border-black/15 bg-white',
                ].join(' ')}
                placeholder="Tell us a bit about yourself, your work, or why this role excites you…"
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
            </Field>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-5 flex items-start gap-3 rounded border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <div className="text-sm font-bold text-emerald-900">Application submitted!</div>
                <div className="mt-0.5 text-sm text-emerald-800">
                  We&apos;ve received your application. Our team will review it and reach out to you soon.
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && submitError && (
            <div className="mt-5 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-900">{submitError}</div>
          )}

          {submitStatus !== 'success' && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitStatus === 'submitting' || !isFormReady}
                className={[
                  'inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold text-white transition-opacity',
                  'focus:outline-none focus:ring-2 focus:ring-[#E21F26]/50',
                  submitStatus === 'submitting' || !isFormReady
                    ? 'cursor-not-allowed bg-black/30 opacity-70'
                    : 'bg-[#E21F26] hover:opacity-90',
                ].join(' ')}
              >
                {submitStatus === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitStatus === 'submitting' ? 'Submitting…' : 'Submit Application'}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
