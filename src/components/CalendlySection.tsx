"use client";

import { useEffect } from "react";

export default function CalendlySection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="book-call"
      className="py-20 px-6 lg:px-8 bg-[var(--brand-beige)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--brand-teal)] text-white px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Limited Availability</span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Find Your Perfect Match
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Select a time below to speak with our placement team. We&apos;ll discuss
            your needs and match you with the ideal candidate.
          </p>
        </div>

        {/* Calendly Widget Container */}
        <div className="glass rounded-3xl p-4 sm:p-8 shadow-soft overflow-hidden">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/vp20studio-info/30min?hide_gdpr_banner=1&background_color=fffdf7&text_color=2e4934&primary_color=068466"
            style={{ minWidth: "320px", height: "700px" }}
          ></div>
        </div>

        {/* Trust Elements */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[var(--brand-lime)] rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[var(--brand-green)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="font-semibold text-[var(--brand-green)]">
              30-Minute Call
            </p>
            <p className="text-sm text-[var(--muted)]">
              Quick, focused consultation
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[var(--brand-lime)] rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[var(--brand-green)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <p className="font-semibold text-[var(--brand-green)]">
              No Obligation
            </p>
            <p className="text-sm text-[var(--muted)]">
              Zero pressure, just information
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[var(--brand-lime)] rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[var(--brand-green)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <p className="font-semibold text-[var(--brand-green)]">
              Fast Matching
            </p>
            <p className="text-sm text-[var(--muted)]">
              Meet candidates in 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
