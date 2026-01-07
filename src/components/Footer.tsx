import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-green)] text-[var(--brand-cream)] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--brand-cream)] rounded-full flex items-center justify-center">
                <span className="text-[var(--brand-green)] font-bold text-lg">
                  T
                </span>
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold">
                Treantly
              </span>
            </Link>
            <p className="text-[var(--brand-cream)]/70 max-w-sm mb-6">
              Connecting businesses with the top 1% of global virtual assistant
              talent. Scale smarter, not harder.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--brand-cream)]/10 rounded-full flex items-center justify-center hover:bg-[var(--brand-cream)]/20 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--brand-cream)]/10 rounded-full flex items-center justify-center hover:bg-[var(--brand-cream)]/20 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-[var(--brand-cream)]/70 hover:text-[var(--brand-cream)] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-[var(--brand-cream)]/70 hover:text-[var(--brand-cream)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-[var(--brand-cream)]/70 hover:text-[var(--brand-cream)] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#book-call"
                  className="text-[var(--brand-cream)]/70 hover:text-[var(--brand-cream)] transition-colors"
                >
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@treantly.com"
                  className="text-[var(--brand-cream)]/70 hover:text-[var(--brand-cream)] transition-colors"
                >
                  hello@treantly.com
                </a>
              </li>
              <li className="text-[var(--brand-cream)]/70">
                Available Mon-Fri, 9am-6pm EST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--brand-cream)]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[var(--brand-cream)]/50 text-sm">
            &copy; {currentYear} Treantly. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[var(--brand-cream)]/50 hover:text-[var(--brand-cream)] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[var(--brand-cream)]/50 hover:text-[var(--brand-cream)] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
