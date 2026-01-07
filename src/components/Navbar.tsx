"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--brand-green)] rounded-full flex items-center justify-center">
              <span className="text-[var(--brand-cream)] font-bold text-lg">T</span>
            </div>
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--brand-green)]">
              Treantly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href="#book-call"
              className="bg-[var(--brand-green)] text-[var(--brand-cream)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--brand-teal)] transition-colors border-2 border-white"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[var(--brand-green)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-[var(--brand-green)]/10">
            <div className="flex flex-col gap-4 pt-4">
              <Link
                href="#how-it-works"
                className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#book-call"
                className="bg-[var(--brand-green)] text-[var(--brand-cream)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--brand-teal)] transition-colors text-center border-2 border-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
