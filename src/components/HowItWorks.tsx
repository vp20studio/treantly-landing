export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We map your tasks and requirements through a quick 30-minute consultation. Tell us exactly what you need.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      gradient: "from-[var(--brand-teal)] to-[#0a9f7d]",
    },
    {
      number: "02",
      title: "Matching",
      description:
        "You meet the top 3 hand-picked candidates from our pre-vetted talent pool. Interview them risk-free.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradient: "from-[var(--brand-green)] to-[#3d5f45]",
    },
    {
      number: "03",
      title: "Onboarding",
      description:
        "Your new team member starts within 48 hours. We handle the infrastructure so you can focus on growth.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      gradient: "from-[var(--brand-orange)] to-[#f0b85a]",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-6 lg:px-8 bg-[var(--brand-cream)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[var(--brand-lime)] rounded-full blur-[120px] opacity-30 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[var(--brand-teal)] rounded-full blur-[120px] opacity-20 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-lime)] to-[#d4e87a] px-5 py-2.5 rounded-full shadow-soft mb-6">
            <svg className="w-4 h-4 text-[var(--brand-green)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-[var(--brand-green)]">
              Simple 3-Step Process
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            From first call to your VA starting work - the entire process takes
            less than 48 hours.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[55%] w-[90%] h-1">
                  <div className="h-full bg-gradient-to-r from-[var(--brand-lime)] via-[var(--brand-teal)]/30 to-transparent rounded-full"></div>
                  <div className="absolute top-1/2 right-0 w-3 h-3 bg-[var(--brand-beige)] rounded-full -translate-y-1/2 border-2 border-[var(--brand-teal)]/30"></div>
                </div>
              )}

              <div className="glass rounded-3xl p-8 h-full shadow-elevated hover-lift relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand-lime)] to-[#d4e87a] rounded-2xl flex items-center justify-center text-[var(--brand-green)] mb-6 mt-6 shadow-soft group-hover:shadow-lg transition-shadow duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--brand-green)] mb-3 group-hover:text-gradient transition-colors">
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[var(--brand-beige)] to-transparent rounded-tl-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <a
            href="#book-call"
            className="group inline-flex items-center gap-3 btn-primary text-[var(--brand-cream)] px-10 py-5 rounded-2xl font-semibold text-lg"
          >
            Start Your Discovery Call
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <p className="mt-4 text-sm text-[var(--muted)]">
            No commitment required. Just a friendly conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
