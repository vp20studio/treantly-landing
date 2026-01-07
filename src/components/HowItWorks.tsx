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
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 lg:px-8 bg-[var(--brand-cream)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--brand-lime)] px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-[var(--brand-green)]">
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
            <div key={step.number} className="relative">
              {/* Connector Line (hidden on mobile and after last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--brand-teal)] to-transparent"></div>
              )}

              <div className="glass rounded-3xl p-8 h-full shadow-soft hover:shadow-lg transition-shadow duration-300 relative">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[var(--brand-teal)] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-[var(--brand-lime)] rounded-2xl flex items-center justify-center text-[var(--brand-green)] mb-6 mt-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--brand-green)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#book-call"
            className="inline-flex items-center gap-2 bg-[var(--brand-green)] text-[var(--brand-cream)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--brand-teal)] transition-all duration-300 border-2 border-white shadow-soft hover:shadow-lg"
          >
            Start Your Discovery Call
            <svg
              className="w-5 h-5"
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
        </div>
      </div>
    </section>
  );
}
