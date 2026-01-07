export default function ValueComparison() {
  const traditionalItems = [
    { label: "Monthly Cost", value: "$5,000+", highlight: true },
    { label: "Time to Hire", value: "4-6 weeks" },
    { label: "Payroll Taxes", value: "15-30%" },
    { label: "Benefits & Insurance", value: "$500+/mo" },
    { label: "Turnover Risk", value: "High" },
    { label: "Training Time", value: "2-4 weeks" },
  ];

  const treantlyItems = [
    { label: "Monthly Cost", value: "$1,200/mo", highlight: true },
    { label: "Time to Hire", value: "48 hours" },
    { label: "Payroll Taxes", value: "0%" },
    { label: "Benefits & Insurance", value: "$0" },
    { label: "Turnover Risk", value: "Low (Pre-vetted)" },
    { label: "Training Time", value: "Already trained" },
  ];

  return (
    <section id="pricing" className="py-20 px-6 lg:px-8 bg-[var(--brand-beige)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            The Math of Scaling Smarter
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            See the real cost difference between traditional hiring and working
            with Treantly&apos;s pre-vetted talent pool.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Hiring Card */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border-2 border-[var(--error)]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--error)] opacity-5 rounded-full translate-x-16 -translate-y-16"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[var(--error)]/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--error)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--brand-green)]">
                  Traditional Hiring
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  The old, expensive way
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {traditionalItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-0 ${
                    item.highlight ? "bg-[var(--error)]/5 -mx-4 px-4 rounded-lg" : ""
                  }`}
                >
                  <span className="text-[var(--muted)]">{item.label}</span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? "text-[var(--error)] text-lg"
                        : "text-[var(--brand-green)]"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--brand-green)]">
                  Total Annual Cost
                </span>
                <span className="text-2xl font-bold text-[var(--error)]">
                  ~$72,000+
                </span>
              </div>
            </div>
          </div>

          {/* Treantly Card */}
          <div className="bg-[var(--brand-green)] rounded-3xl p-8 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-lime)] opacity-20 rounded-full translate-x-16 -translate-y-16"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--brand-teal)] opacity-30 rounded-full"></div>

            {/* Recommended Badge */}
            <div className="absolute -top-0 -right-0 bg-[var(--brand-lime)] text-[var(--brand-green)] px-4 py-2 rounded-bl-2xl rounded-tr-3xl text-sm font-bold">
              RECOMMENDED
            </div>

            <div className="flex items-center gap-3 mb-6 relative">
              <div className="w-12 h-12 bg-[var(--brand-lime)] rounded-xl flex items-center justify-center">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--brand-cream)]">
                  Treantly
                </h3>
                <p className="text-sm text-[var(--brand-cream)]/70">
                  The smart way to scale
                </p>
              </div>
            </div>

            <div className="space-y-4 relative">
              {treantlyItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-3 border-b border-white/10 last:border-0 ${
                    item.highlight
                      ? "bg-[var(--brand-teal)]/30 -mx-4 px-4 rounded-lg"
                      : ""
                  }`}
                >
                  <span className="text-[var(--brand-cream)]/80">
                    {item.label}
                  </span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? "text-[var(--brand-lime)] text-lg"
                        : "text-[var(--brand-cream)]"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/20 relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--brand-cream)]">
                  Total Annual Cost
                </span>
                <span className="text-2xl font-bold text-[var(--brand-lime)]">
                  ~$14,400
                </span>
              </div>
              <p className="text-[var(--brand-lime)] text-sm mt-2 font-medium">
                Save $57,600+ per year
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
