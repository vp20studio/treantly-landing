interface CaseStudy {
  name: string;
  description: string;
  url: string;
  industry: string;
}

const caseStudies: CaseStudy[] = [
  {
    name: "EFFYDESK",
    description: "How EFFYDESK scaled customer support and operations with dedicated virtual assistants.",
    url: "https://treantly.com/case-studies/effydesk/",
    industry: "E-commerce",
  },
  {
    name: "Dex Diu",
    description: "Building a reliable remote team to handle day-to-day operations efficiently.",
    url: "https://treantly.com/case-studies/dex-diu/",
    industry: "Professional Services",
  },
  {
    name: "Bear Watch",
    description: "Streamlining administrative tasks to focus on core business growth.",
    url: "https://treantly.com/case-studies/bear-watch/",
    industry: "Security Services",
  },
  {
    name: "Lee Miller",
    description: "Empowering contractors with scalable virtual talent solutions.",
    url: "https://treantly.com/case-studies/lee-miller/",
    industry: "Business Coaching",
  },
  {
    name: "DeepSeas",
    description: "Optimizing operations with skilled offshore professionals.",
    url: "https://treantly.com/case-studies/deepseas/",
    industry: "Technology",
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative py-24 px-6 lg:px-8 bg-[var(--brand-cream)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--brand-lime)] rounded-full blur-[150px] opacity-25"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[var(--brand-teal)] rounded-full blur-[150px] opacity-15"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6">
            <svg
              className="w-5 h-5 text-[var(--brand-teal)]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-[var(--brand-green)]">
              Case Studies
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Discover how companies like yours achieved success with Treantly talent.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <a
              key={study.name}
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 shadow-soft hover-lift group block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-green)] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-soft">
                  {study.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--brand-green)] group-hover:text-[var(--brand-teal)] transition-colors">
                    {study.name}
                  </h3>
                  <span className="text-xs text-[var(--muted)] bg-[var(--brand-beige)] px-2 py-0.5 rounded-full">
                    {study.industry}
                  </span>
                </div>
              </div>

              <p className="text-[var(--muted)] mb-4 text-sm leading-relaxed">
                {study.description}
              </p>

              <div className="flex items-center gap-2 text-[var(--brand-teal)] font-medium text-sm">
                Read Case Study
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
