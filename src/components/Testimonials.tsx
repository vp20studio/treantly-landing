"use client";

import { useState, useRef } from "react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  videoUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lee Miller",
    company: "Brave Academy",
    role: "Business Coach for Contractors",
    quote:
      "Treantly makes it possible for our contractors to scale without the heavy cost of hiring locally. Their virtual talent gives our clients reliable, long-term support.",
    videoUrl: "/testimonials/lee-miller.mp4",
  },
  {
    id: "2",
    name: "Brent Weiss",
    company: "Beyond Med",
    role: "Co-Founder",
    quote:
      "What stood out about Treantly was how seamless the process was. We didn't have to go through endless interviews, and every candidate was strong from day one.",
    videoUrl: "/testimonials/brent-weiss.mp4",
  },
  {
    id: "3",
    name: "Samantha Hoffart",
    company: "You Move Me",
    role: "Owner, Vancouver BC",
    quote:
      "Working with Treantly has been such a great experience. They made the entire process simple and supportive, and our business is running smoother than ever.",
    videoUrl: "/testimonials/samantha-hoffart.mp4",
  },
  {
    id: "4",
    name: "Victor Gershkovich",
    company: "Acculedgars Corp",
    role: "Professional Accountant",
    quote:
      "Treantly made hiring a virtual assistant seamless. They handled everything from sourcing to scheduling, and I only had to show up for the interviews.",
    videoUrl: "/testimonials/victor-gershkovich.mp4",
  },
  {
    id: "5",
    name: "Silke",
    company: "Hen Dog Marketing",
    role: "Owner",
    quote:
      "With Treantly, I finally gained the administrative and project management support my business needed. Their assistants work in my timezone and have been amazing partners.",
    videoUrl: "/testimonials/silke.mp4",
  },
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlayVideo = (id: string) => {
    Object.keys(videoRefs.current).forEach((key) => {
      if (key !== id && videoRefs.current[key]) {
        videoRefs.current[key]?.pause();
      }
    });
    setActiveVideo(id);
  };

  const handleVideoEnd = () => {
    setActiveVideo(null);
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-20 lg:py-24 px-6 lg:px-8 bg-gradient-to-b from-[var(--brand-beige)] to-[var(--brand-cream)] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E4934' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-[var(--brand-lime)] px-4 py-2 rounded-full shadow-sm mb-5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-[var(--brand-teal)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-[var(--brand-green)]">
              4.9/5 from 200+ reviews
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--brand-green)] mb-3 sm:mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--muted)] max-w-xl mx-auto">
            Hear directly from business owners who scaled with Treantly.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 hide-scrollbar">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-auto snap-center group"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(46,73,52,0.12)] hover:shadow-[0_8px_40px_-8px_rgba(46,73,52,0.2)] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                {/* Video Container */}
                <div className="relative aspect-[9/14] bg-[var(--brand-green)] overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRefs.current[testimonial.id] = el;
                    }}
                    src={testimonial.videoUrl}
                    className="w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    onEnded={handleVideoEnd}
                    onClick={() => {
                      if (activeVideo === testimonial.id) {
                        videoRefs.current[testimonial.id]?.pause();
                        setActiveVideo(null);
                      } else {
                        handlePlayVideo(testimonial.id);
                        videoRefs.current[testimonial.id]?.play();
                      }
                    }}
                  />

                  {/* Top gradient for badge visibility */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>

                  {/* Play Button */}
                  {activeVideo !== testimonial.id && (
                    <button
                      onClick={() => {
                        handlePlayVideo(testimonial.id);
                        videoRefs.current[testimonial.id]?.play();
                      }}
                      className="absolute inset-0 flex items-center justify-center group/play"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform duration-300">
                          <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--brand-green)] ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  )}

                  {/* Company badge at top - positioned further down */}
                  <div className="absolute top-4 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-[11px] sm:text-xs font-semibold text-[var(--brand-green)]">
                        {testimonial.company}
                      </span>
                    </div>
                    <div className="bg-[var(--brand-teal)] px-2.5 py-1 rounded-full shadow-lg">
                      <span className="text-[10px] text-white font-medium">
                        Video
                      </span>
                    </div>
                  </div>

                  {/* Name overlay at bottom */}
                  <div className="absolute bottom-4 left-3 right-3">
                    <p className="text-white font-semibold text-sm sm:text-base drop-shadow-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm drop-shadow-md">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-[var(--brand-teal)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[var(--foreground)] text-sm leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--muted)]">
                <span className="font-semibold text-[var(--brand-green)]">
                  200+
                </span>{" "}
                happy clients
              </p>
            </div>
            <a
              href="https://calendly.com/mponce-treantly/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--brand-green)] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[var(--brand-teal)] transition-colors shadow-lg hover:shadow-xl"
            >
              Join them today
              <svg
                className="w-4 h-4"
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
      </div>
    </section>
  );
}
