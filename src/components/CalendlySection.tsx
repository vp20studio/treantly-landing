"use client";

import { useEffect } from "react";

export default function CalendlySection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section
      id="book-call"
      className="relative py-24 px-6 lg:px-8 bg-[var(--brand-beige)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--brand-teal)] rounded-full blur-[200px] opacity-10"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-teal)] to-[#0a9f7d] text-white px-5 py-2.5 rounded-full shadow-lg mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-sm font-semibold">Limited Availability</span>
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
        <div className="glass rounded-3xl p-2 sm:p-6 shadow-elevated overflow-hidden">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/vp20studio-info/30min?hide_gdpr_banner=1&background_color=fffdf7&text_color=2e4934&primary_color=068466"
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "30-Minute Call",
              description: "Quick, focused consultation",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "No Obligation",
              description: "Zero pressure, just information",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Fast Matching",
              description: "Meet candidates in 48 hours",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-soft hover-lift text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--brand-lime)] to-[#d4e87a] rounded-2xl flex items-center justify-center text-[var(--brand-green)] shadow-soft">
                {item.icon}
              </div>
              <p className="font-semibold text-[var(--brand-green)]">
                {item.title}
              </p>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
