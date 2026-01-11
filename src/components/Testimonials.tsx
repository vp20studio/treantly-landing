"use client";

import { useState, useRef } from "react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  videoUrl: string;
  accentColor: string;
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
    accentColor: "from-[var(--brand-teal)] to-[#0a9f7d]",
  },
  {
    id: "2",
    name: "Brent Weiss",
    company: "Beyond Med",
    role: "Co-Founder",
    quote:
      "What stood out about Treantly was how seamless the process was. We didn't have to go through endless interviews, and every candidate was strong from day one.",
    videoUrl: "/testimonials/brent-weiss.mp4",
    accentColor: "from-[var(--brand-green)] to-[#3d5f45]",
  },
  {
    id: "3",
    name: "Samantha Hoffart",
    company: "You Move Me",
    role: "Owner, Vancouver BC",
    quote:
      "Working with Treantly has been such a great experience. They made the entire process simple and supportive, and our business is running smoother than ever. I highly recommend Treantly to anyone looking to bring on a virtual assistant.",
    videoUrl: "/testimonials/samantha-hoffart.mp4",
    accentColor: "from-[var(--brand-lime)] to-[#a8c45a]",
  },
  {
    id: "4",
    name: "Victor Gershkovich",
    company: "Acculedgars Corp",
    role: "Professional Accountant",
    quote:
      "Treantly made hiring a virtual assistant seamless. They handled everything from sourcing to scheduling, and I only had to show up for the interviews. It allowed me to delegate daily tasks and focus on providing more value to my clients.",
    videoUrl: "/testimonials/victor-gershkovich.mp4",
    accentColor: "from-[var(--brand-orange)] to-[#f0b85a]",
  },
  {
    id: "5",
    name: "Silke",
    company: "Hen Dog Marketing",
    role: "Owner",
    quote:
      "With Treantly, I finally gained the administrative and project management support my business needed. Their assistants work in my timezone and have been amazing partners in my growth.",
    videoUrl: "/testimonials/silke.mp4",
    accentColor: "from-[var(--brand-teal)] to-[var(--brand-green)]",
  },
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlayVideo = (id: string) => {
    // Pause any other playing videos
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
      className="relative py-20 sm:py-24 px-6 lg:px-8 bg-[var(--brand-beige)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-lime)] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--brand-teal)] rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-orange)] to-[#f0b85a] text-white px-5 py-2.5 rounded-full shadow-lg mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold">5-Star Reviews</span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto">
            See how businesses like yours have scaled with Treantly talent.
          </p>
        </div>

        {/* Testimonials - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-5 sm:overflow-visible sm:pb-0 hide-scrollbar">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[280px] sm:w-auto relative group snap-center"
            >
              {/* Card with gradient border effect */}
              <div className="relative h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevated group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                {/* Top gradient accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.accentColor}`}
                ></div>

                {/* Video player */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-[var(--brand-green)] to-[#1f3326]">
                  <video
                    ref={(el) => {
                      videoRefs.current[testimonial.id] = el;
                    }}
                    src={testimonial.videoUrl}
                    className="w-full h-full object-cover"
                    playsInline
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

                  {/* Gradient overlay at bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                  {/* Play button overlay */}
                  {activeVideo !== testimonial.id && (
                    <button
                      onClick={() => {
                        handlePlayVideo(testimonial.id);
                        videoRefs.current[testimonial.id]?.play();
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${testimonial.accentColor} rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <svg
                          className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </button>
                  )}

                  {/* Video badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs text-white font-medium">
                      Video
                    </span>
                  </div>
                </div>

                {/* Info section */}
                <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[var(--brand-beige)]/30">
                  {/* Star rating with verified badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--brand-orange)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[var(--brand-teal)]">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[10px] font-semibold">Verified</span>
                    </div>
                  </div>

                  {/* Quote with decorative mark */}
                  <div className="relative">
                    <svg
                      className="absolute -top-1 -left-1 w-6 h-6 text-[var(--brand-lime)] opacity-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-[var(--muted)] mb-4 text-xs sm:text-sm leading-relaxed pl-4">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[var(--brand-beige)]">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br ${testimonial.accentColor} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 shadow-md`}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--brand-green)] text-xs sm:text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[var(--muted)] truncate">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <svg
              className="w-5 h-5 text-[var(--brand-teal)]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">200+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <svg
              className="w-5 h-5 text-[var(--brand-orange)]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <svg
              className="w-5 h-5 text-[var(--brand-green)]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">All Reviews Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
