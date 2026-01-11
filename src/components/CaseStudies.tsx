import React from "react";

interface CaseStudy {
  name: string;
  description: string;
  url: string;
  industry: string;
  metric: string;
  metricLabel: string;
  gradient: string;
  iconBg: string;
}

const caseStudies: CaseStudy[] = [
  {
    name: "EFFYDESK",
    description:
      "How EFFYDESK scaled customer support and operations with dedicated virtual assistants.",
    url: "https://treantly.com/case-studies/effydesk/",
    industry: "E-commerce",
    metric: "4",
    metricLabel: "VAs Hired",
    gradient: "from-[var(--brand-teal)]/10 to-[var(--brand-teal)]/5",
    iconBg: "from-[var(--brand-teal)] to-[#0a9f7d]",
  },
  {
    name: "Dex Diu",
    description:
      "Building a reliable remote team to handle day-to-day operations efficiently.",
    url: "https://treantly.com/case-studies/dex-diu/",
    industry: "Professional Services",
    metric: "60%",
    metricLabel: "Cost Saved",
    gradient: "from-[var(--brand-green)]/10 to-[var(--brand-green)]/5",
    iconBg: "from-[var(--brand-green)] to-[#3d5f45]",
  },
  {
    name: "Bear Watch",
    description:
      "Streamlining administrative tasks to focus on core business growth.",
    url: "https://treantly.com/case-studies/bear-watch/",
    industry: "Security Services",
    metric: "40+",
    metricLabel: "Hours Saved/Week",
    gradient: "from-[var(--brand-orange)]/10 to-[var(--brand-orange)]/5",
    iconBg: "from-[var(--brand-orange)] to-[#f0b85a]",
  },
  {
    name: "Lee Miller",
    description:
      "Empowering contractors with scalable virtual talent solutions.",
    url: "https://treantly.com/case-studies/lee-miller/",
    industry: "Business Coaching",
    metric: "3x",
    metricLabel: "Team Growth",
    gradient: "from-[var(--brand-lime)]/20 to-[var(--brand-lime)]/10",
    iconBg: "from-[var(--brand-lime)] to-[#a8c45a]",
  },
  {
    name: "DeepSeas",
    description: "Optimizing operations with skilled offshore professionals.",
    url: "https://treantly.com/case-studies/deepseas/",
    industry: "Technology",
    metric: "24/7",
    metricLabel: "Coverage",
    gradient: "from-[var(--brand-teal)]/10 to-[var(--brand-green)]/5",
    iconBg: "from-[var(--brand-teal)] to-[var(--brand-green)]",
  },
];

const industryIcons: { [key: string]: React.ReactNode } = {
  "E-commerce": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  ),
  "Professional Services": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
  ),
  "Security Services": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  "Business Coaching": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
    </svg>
  ),
  Technology: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative py-20 sm:py-24 px-6 lg:px-8 bg-[var(--brand-cream)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--brand-lime)] rounded-full blur-[150px] opacity-25"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[var(--brand-teal)] rounded-full blur-[150px] opacity-15"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-teal)] to-[#0a9f7d] text-white px-5 py-2.5 rounded-full shadow-lg mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold">Proven Results</span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Discover how companies like yours achieved success with Treantly
            talent.
          </p>
        </div>

        {/* Case Studies - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 hide-scrollbar">
          {caseStudies.map((study, index) => (
            <a
              key={study.name}
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 w-[300px] sm:w-auto relative group block snap-center ${
                index === 3 || index === 4 ? "lg:col-span-1" : ""
              }`}
            >
              {/* Card */}
              <div
                className={`relative h-full bg-gradient-to-br ${study.gradient} backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/50 p-5 sm:p-6 shadow-soft hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1 overflow-hidden`}
              >
                {/* Decorative gradient orb */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${study.iconBg} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}
                ></div>

                {/* Metric badge */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  <div className="text-right">
                    <div
                      className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${study.iconBg} bg-clip-text text-transparent`}
                    >
                      {study.metric}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[var(--muted)] font-medium uppercase tracking-wide">
                      {study.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Icon and header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div
                    className={`h-11 w-11 sm:h-14 sm:w-14 bg-gradient-to-br ${study.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {industryIcons[study.industry]}
                  </div>
                  <div className="min-w-0 pr-16 sm:pr-20">
                    <h3 className="font-bold text-[var(--brand-green)] text-base sm:text-lg group-hover:text-[var(--brand-teal)] transition-colors truncate">
                      {study.name}
                    </h3>
                    <span
                      className={`inline-flex items-center text-[10px] sm:text-xs font-medium bg-white/80 text-[var(--brand-green)] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm mt-1`}
                    >
                      {study.industry}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[var(--muted)] mb-4 sm:mb-5 text-sm leading-relaxed relative z-10">
                  {study.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[var(--brand-teal)] font-semibold text-sm relative z-10">
                  <span className="group-hover:underline">Read Case Study</span>
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-teal)]/10 flex items-center justify-center group-hover:bg-[var(--brand-teal)] group-hover:text-white transition-all duration-300">
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${study.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            </a>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <a
            href="https://treantly.com/case-studies/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--brand-green)] hover:text-[var(--brand-teal)] font-semibold transition-colors group"
          >
            View All Case Studies
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
        </div>
      </div>
    </section>
  );
}
