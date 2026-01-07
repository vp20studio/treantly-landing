export default function CandidateCard() {
  const skills = [
    "Calendar Management",
    "Email Handling",
    "CRM Administration",
    "Travel Booking",
    "Data Entry",
  ];

  return (
    <div className="relative glass rounded-3xl p-8 shadow-soft max-w-md mx-auto lg:mx-0">
      {/* Verified Badge */}
      <div className="absolute -top-3 -right-3 bg-[var(--brand-teal)] text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Pre-Vetted
      </div>

      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-green)] flex items-center justify-center text-white text-2xl font-bold">
          SM
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--brand-green)]">
            Sarah M.
          </h3>
          <p className="text-[var(--muted)]">Executive Virtual Assistant</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[var(--brand-orange)]">★★★★★</span>
            <span className="text-sm text-[var(--muted)]">5.0 (47 reviews)</span>
          </div>
        </div>
      </div>

      {/* Vetting Score */}
      <div className="bg-[var(--brand-beige)] rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--brand-green)]">
            Vetting Score
          </span>
          <span className="text-lg font-bold text-[var(--brand-teal)]">
            98/100
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--brand-cream)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-lime)] rounded-full"
            style={{ width: "98%" }}
          ></div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">
          Top 1% of 10,000+ applicants
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[var(--brand-green)] mb-3">
          Core Competencies
        </h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-[var(--brand-lime)] text-[var(--brand-green)] px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--brand-green)]/10">
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--brand-green)]">5+</p>
          <p className="text-xs text-[var(--muted)]">Years Exp.</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--brand-green)]">EST</p>
          <p className="text-xs text-[var(--muted)]">Timezone</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--brand-teal)]">48h</p>
          <p className="text-xs text-[var(--muted)]">Availability</p>
        </div>
      </div>
    </div>
  );
}
