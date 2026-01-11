"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-elevated py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="Treantly"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#testimonials"
              className="relative text-[var(--brand-green)] font-medium transition-colors hover:text-[var(--brand-teal)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--brand-teal)] after:transition-all hover:after:w-full"
            >
              Testimonials
            </Link>
            <Link
              href="#how-it-works"
              className="relative text-[var(--brand-green)] font-medium transition-colors hover:text-[var(--brand-teal)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--brand-teal)] after:transition-all hover:after:w-full"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="relative text-[var(--brand-green)] font-medium transition-colors hover:text-[var(--brand-teal)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--brand-teal)] after:transition-all hover:after:w-full"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="relative text-[var(--brand-green)] font-medium transition-colors hover:text-[var(--brand-teal)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--brand-teal)] after:transition-all hover:after:w-full"
            >
              FAQ
            </Link>
            <Link
              href="#book-call"
              className="btn-primary text-[var(--brand-cream)] px-6 py-3 rounded-full font-semibold"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[var(--brand-beige)] transition-colors"
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
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 py-4 border-t border-[var(--brand-green)]/10">
            <Link
              href="#testimonials"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-3 px-4 rounded-xl hover:bg-[var(--brand-beige)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#how-it-works"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-3 px-4 rounded-xl hover:bg-[var(--brand-beige)]"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-3 px-4 rounded-xl hover:bg-[var(--brand-beige)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-[var(--brand-green)] hover:text-[var(--brand-teal)] transition-colors font-medium py-3 px-4 rounded-xl hover:bg-[var(--brand-beige)]"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="#book-call"
              className="btn-primary text-[var(--brand-cream)] px-6 py-3 rounded-full font-semibold text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
