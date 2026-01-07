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
    <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-[var(--brand-cream)] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-lime)] rounded-full blur-[100px] opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--brand-teal)] rounded-full blur-[120px] opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--brand-teal)]/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--brand-lime)]/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-soft animate-fade-in-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-teal)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--brand-teal)]"></span>
              </span>
              <span className="text-sm font-semibold text-[var(--brand-green)]">
                Now accepting new clients
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--brand-green)] leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Scale Your Operations with the{" "}
              <span className="text-gradient relative">
                Top 1%
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="var(--brand-teal)" strokeWidth="3" strokeLinecap="round" className="animate-pulse-soft"/>
                </svg>
              </span>{" "}
              of Global Talent.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Stop overpaying for local operations. Hire pre-vetted,
              English-speaking Virtual Assistants and scale your team in under{" "}
              <span className="font-semibold text-[var(--brand-green)] bg-[var(--brand-lime)]/50 px-2 py-0.5 rounded">48 hours</span>.
            </p>

            {/* Email Input + Get Started */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-[var(--brand-green)]/10 bg-white/80 backdrop-blur-sm text-[var(--brand-green)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--brand-teal)] focus:ring-4 focus:ring-[var(--brand-teal)]/10 transition-all shadow-soft"
                />
              </div>
              <button
                onClick={handleGetStarted}
                className="btn-primary text-[var(--brand-cream)] px-8 py-4 rounded-2xl font-semibold text-lg whitespace-nowrap flex items-center justify-center gap-2 group"
              >
                Get Started
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex -space-x-3">
                {[
                  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", name: "James" },
                  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", name: "Sarah" },
                  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", name: "Michael" },
                  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", name: "Amanda" },
                  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", name: "Robert" },
                ].map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar.src}
                    alt={avatar.name}
                    className="w-11 h-11 rounded-full border-3 border-[var(--brand-cream)] object-cover shadow-lg transition-transform hover:scale-110 hover:z-10"
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--brand-green)] text-lg">500+</span>
                  <span className="text-[var(--brand-green)] font-medium">Placements</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
                  <svg className="w-4 h-4 text-[var(--brand-orange)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 from 200+ reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Candidate Card */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--brand-lime)] blob opacity-60 animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[var(--brand-teal)] blob opacity-25 animate-float-delayed"></div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 lg:top-4 lg:-right-8 glass px-4 py-2 rounded-xl shadow-elevated animate-float z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">Avg. Response</p>
                  <p className="text-sm font-bold text-[var(--brand-green)]">&lt; 2 hours</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 lg:bottom-20 lg:-left-8 glass px-4 py-2 rounded-xl shadow-elevated animate-float-delayed z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--brand-lime)] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--brand-green)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">Active VAs</p>
                  <p className="text-sm font-bold text-[var(--brand-green)]">1,200+</p>
                </div>
              </div>
            </div>

            <CandidateCard />
          </div>
        </div>
      </div>
    </section>
  );
}
