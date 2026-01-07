export default function CandidateCard() {
  const skills = [
    "Calendar Management",
    "Email Handling",
    "CRM Administration",
    "Travel Booking",
    "Data Entry",
  ];

  return (
    <div className="relative glass rounded-3xl p-8 shadow-elevated max-w-md mx-auto lg:mx-0 hover-lift">
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-shimmer opacity-30"></div>
      </div>

      {/* Verified Badge */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[var(--brand-teal)] to-[#0a9f7d] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
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
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-green)] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            SM
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--brand-green)]">
            Sarah M.
          </h3>
          <p className="text-[var(--muted)] text-sm">Executive Virtual Assistant</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-[var(--brand-orange)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[var(--muted)]">5.0 (47)</span>
          </div>
        </div>
      </div>

      {/* Vetting Score */}
      <div className="bg-gradient-to-br from-[var(--brand-beige)] to-white rounded-2xl p-4 mb-6 border border-[var(--brand-green)]/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[var(--brand-green)]">
            Vetting Score
          </span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gradient">98</span>
            <span className="text-sm text-[var(--muted)]">/100</span>
          </div>
        </div>
        <div className="w-full h-3 bg-[var(--brand-cream)] rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[var(--brand-teal)] via-[#0a9f7d] to-[var(--brand-lime)] rounded-full relative"
            style={{ width: "98%" }}
          >
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-2 flex items-center gap-1">
          <svg className="w-3 h-3 text-[var(--brand-teal)]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Top 1% of 10,000+ applicants
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[var(--brand-green)] mb-3">
          Core Competencies
        </h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="bg-gradient-to-r from-[var(--brand-lime)] to-[#d4e87a] text-[var(--brand-green)] px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--brand-green)]/10">
        <div className="text-center group cursor-default">
          <p className="text-2xl font-bold text-[var(--brand-green)] group-hover:text-gradient transition-colors">5+</p>
          <p className="text-xs text-[var(--muted)]">Years Exp.</p>
        </div>
        <div className="text-center group cursor-default">
          <p className="text-2xl font-bold text-[var(--brand-green)] group-hover:text-gradient transition-colors">EST</p>
          <p className="text-xs text-[var(--muted)]">Timezone</p>
        </div>
        <div className="text-center group cursor-default">
          <p className="text-2xl font-bold text-[var(--brand-teal)]">48h</p>
          <p className="text-xs text-[var(--muted)]">Availability</p>
        </div>
      </div>
    </div>
  );
}
