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
    { label: "Time to Hire", value: "1-2 weeks" },
    { label: "Payroll Taxes", value: "0%" },
    { label: "Benefits & Insurance", value: "$0 (We cover it)" },
    { label: "Turnover Risk", value: "Low (Pre-vetted)" },
    { label: "Training Time", value: "Already trained" },
  ];

  return (
    <section id="pricing" className="relative py-16 sm:py-20 lg:py-24 px-6 lg:px-8 bg-[var(--brand-beige)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-lime)] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--brand-teal)] rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-soft mb-5 sm:mb-6">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--brand-teal)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-[var(--brand-green)]">Save 40%-60% on hiring costs</span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--brand-green)] mb-3 sm:mb-4">
            The Math of Scaling Smarter
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--muted)] max-w-2xl mx-auto">
            See the real cost difference between traditional hiring and working
            with Treantly&apos;s pre-vetted talent pool.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Traditional Hiring Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-elevated border border-[var(--error)]/10 relative overflow-hidden hover-lift">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--error)] opacity-5 rounded-full translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--error)] opacity-5 rounded-full -translate-x-16 translate-y-16"></div>

            <div className="flex items-center gap-4 mb-8 relative">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--error)]/20 to-[var(--error)]/10 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-[var(--error)]"
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

            <div className="space-y-1">
              {traditionalItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 transition-colors ${
                    item.highlight ? "bg-[var(--error)]/5 -mx-4 px-4 rounded-xl" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-[var(--muted)]">{item.label}</span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? "text-[var(--error)] text-xl"
                        : "text-[var(--brand-green)]"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--brand-green)]">
                  Total Annual Cost
                </span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[var(--error)]">
                    ~$72,000+
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Treantly Card */}
          <div className="relative bg-gradient-to-br from-[var(--brand-green)] to-[#1f3326] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-elevated overflow-hidden hover-lift hover-glow">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--brand-lime)] opacity-20 rounded-full translate-x-20 -translate-y-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--brand-teal)] opacity-30 rounded-full -translate-x-16 translate-y-16 blur-2xl"></div>

            {/* Recommended Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[var(--brand-lime)] to-[#d4e87a] text-[var(--brand-green)] px-5 py-2.5 rounded-bl-2xl rounded-tr-3xl text-sm font-bold shadow-lg">
              RECOMMENDED
            </div>

            <div className="flex items-center gap-4 mb-8 relative">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--brand-lime)] to-[#d4e87a] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-[var(--brand-green)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
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

            <div className="space-y-1 relative">
              {treantlyItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-3.5 border-b border-white/10 last:border-0 transition-colors ${
                    item.highlight
                      ? "bg-[var(--brand-teal)]/30 -mx-4 px-4 rounded-xl"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-[var(--brand-cream)]/80">
                    {item.label}
                  </span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? "text-[var(--brand-lime)] text-xl"
                        : "text-[var(--brand-cream)]"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-white/20 relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--brand-cream)]">
                  Total Annual Cost
                </span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[var(--brand-lime)]">
                    ~$14,400
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 bg-[var(--brand-teal)]/30 px-4 py-2 rounded-xl">
                <svg className="w-5 h-5 text-[var(--brand-lime)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-[var(--brand-lime)] text-sm font-semibold">
                  Save $57,600+ per year
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Insurance Callout */}
        <div className="mt-8 sm:mt-10 lg:mt-12 max-w-5xl mx-auto p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-[var(--brand-teal)]/10 to-[var(--brand-lime)]/10 rounded-xl sm:rounded-2xl border border-[var(--brand-teal)]/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--brand-teal)] to-[#0a9f7d] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[var(--brand-green)] text-base sm:text-lg">WE pay for employee health insurance</p>
              <p className="text-sm sm:text-base text-[var(--muted)]">For all roles you hire through Treantly - included at no extra cost to you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
