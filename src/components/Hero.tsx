"use client";

export default function Hero() {
  const handleGetStarted = () => {
    const bookCallSection = document.getElementById("book-call");
    if (bookCallSection) {
      bookCallSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-6 lg:px-8 bg-[var(--brand-cream)] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-lime)] rounded-full blur-[100px] opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--brand-teal)] rounded-full blur-[120px] opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--brand-teal)]/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--brand-lime)]/80 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-soft animate-fade-in-up">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-teal)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[var(--brand-teal)]"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--brand-green)]">
                Over 200 businesses work with Treantly
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--brand-green)] leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Scale Your Operations with the{" "}
              <span className="text-gradient relative">
                Top 1%
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="var(--brand-teal)" strokeWidth="3" strokeLinecap="round" className="animate-pulse-soft"/>
                </svg>
              </span>{" "}
              of Global Talent.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--muted)] leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Stop overpaying for local operations. Hire pre-vetted,
              English-speaking Virtual Assistants and scale your team with
              <span className="font-semibold text-[var(--brand-green)] bg-[var(--brand-lime)]/50 px-1.5 sm:px-2 py-0.5 rounded ml-1">top talent</span>.
            </p>

            {/* Get Started Button */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={handleGetStarted}
                className="btn-primary text-[var(--brand-cream)] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg whitespace-nowrap flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                Get Started
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex -space-x-2 sm:-space-x-3">
                {[
                  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", name: "James" },
                  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", name: "Sarah" },
                  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", name: "Michael" },
                  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", name: "Amanda" },
                  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", name: "Robert" },
                ].map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar.src}
                    alt={avatar.name}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 sm:border-3 border-[var(--brand-cream)] object-cover shadow-lg transition-transform hover:scale-110 hover:z-10"
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--brand-green)] text-base sm:text-lg">500+</span>
                  <span className="text-[var(--brand-green)] font-medium text-sm sm:text-base">Placements</span>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-[var(--muted)]">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--brand-orange)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 from 200+ reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Video Call Card */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--brand-lime)] blob opacity-60 animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[var(--brand-teal)] blob opacity-25 animate-float-delayed"></div>

            {/* Video Call Card */}
            <div className="relative glass rounded-3xl p-3 sm:p-4 shadow-elevated max-w-lg mx-auto lg:mx-0 overflow-hidden">
              {/* Video call image container */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/hero-video-call.png"
                  alt="Victor from Treantly interviewing a VA candidate"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              {/* Card footer */}
              <div className="mt-3 sm:mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-green)]">Discovery Interview</p>
                  <p className="text-xs text-[var(--muted)]">Victor K. with Jessa Mae</p>
                </div>
                <div className="flex items-center gap-1 bg-[var(--brand-lime)]/30 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-[var(--brand-green)]">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-12 sm:mt-16 lg:mt-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Source Any Role",
                description: "Find talent for any position",
                gradient: "from-[var(--brand-teal)] to-[#0a9f7d]",
                iconColor: "text-white",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Pre-Vetted Talent",
                description: "We meet every candidate",
                gradient: "from-[var(--brand-lime)] to-[#d4e87a]",
                iconColor: "text-[var(--brand-green)]",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Pay Nothing Upfront",
                description: "Interview candidates first",
                gradient: "from-[var(--brand-green)] to-[#3d5f45]",
                iconColor: "text-white",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                title: "1-Week Guarantee",
                description: "Or your money back",
                gradient: "from-[var(--brand-orange)] to-[#f0b85a]",
                iconColor: "text-white",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center ${feature.iconColor} shadow-soft flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--brand-green)] text-sm sm:text-base truncate">{feature.title}</p>
                  <p className="text-xs sm:text-sm text-[var(--muted)] truncate">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
