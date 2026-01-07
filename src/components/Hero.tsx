"use client";

import { useState } from "react";
import CandidateCard from "./CandidateCard";

export default function Hero() {
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    const calendlyUrl = email
      ? `https://calendly.com/vp20studio-info/30min?email=${encodeURIComponent(email)}`
      : "https://calendly.com/vp20studio-info/30min";
    window.open(calendlyUrl, "_blank");
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-[var(--brand-cream)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[var(--brand-lime)] px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-[var(--brand-teal)] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-[var(--brand-green)]">
                Now accepting new clients
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--brand-green)] leading-tight tracking-tight">
              Scale Your Operations with the{" "}
              <span className="text-[var(--brand-teal)]">Top 1%</span> of Global
              Talent.
            </h1>

            <p className="text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-xl">
              Stop overpaying for local operations. Hire pre-vetted,
              English-speaking Virtual Assistants and scale your team in under{" "}
              <strong className="text-[var(--brand-green)]">48 hours</strong>.
            </p>

            {/* Email Input + Get Started */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-[var(--brand-green)]/20 bg-white text-[var(--brand-green)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
              />
              <button
                onClick={handleGetStarted}
                className="bg-[var(--brand-green)] text-[var(--brand-cream)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--brand-teal)] transition-all duration-300 text-center border-2 border-white shadow-soft hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                Get Started
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[var(--brand-beige)] border-2 border-[var(--brand-cream)] flex items-center justify-center text-sm font-semibold text-[var(--brand-green)]"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-[var(--brand-green)]">
                  500+ Placements
                </p>
                <p className="text-sm text-[var(--muted)]">
                  Trusted by growing businesses
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Candidate Card */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--brand-lime)] rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--brand-teal)] rounded-full blur-3xl opacity-20"></div>
            <CandidateCard />
          </div>
        </div>
      </div>
    </section>
  );
}
