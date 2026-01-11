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
      "Working with Treantly has been such a great experience. They made the entire process simple and supportive, and our business is running smoother than ever. I highly recommend Treantly to anyone looking to bring on a virtual assistant.",
    videoUrl: "/testimonials/samantha-hoffart.mp4",
  },
  {
    id: "4",
    name: "Victor Gershkovich",
    company: "Acculedgars Corp",
    role: "Professional Accountant",
    quote:
      "Treantly made hiring a virtual assistant seamless. They handled everything from sourcing to scheduling, and I only had to show up for the interviews. It allowed me to delegate daily tasks and focus on providing more value to my clients.",
    videoUrl: "/testimonials/victor-gershkovich.mp4",
  },
  {
    id: "5",
    name: "Silke",
    company: "Hen Dog Marketing",
    role: "Owner",
    quote:
      "With Treantly, I finally gained the administrative and project management support my business needed. Their assistants work in my timezone and have been amazing partners in my growth.",
    videoUrl: "/testimonials/silke.mp4",
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
      className="relative py-24 px-6 lg:px-8 bg-[var(--brand-beige)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-lime)] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--brand-teal)] rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-[var(--brand-green)]">
              Success Stories
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            See how businesses like yours have scaled with Treantly talent.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass rounded-3xl overflow-hidden shadow-elevated hover-lift group"
            >
              {/* Video player */}
              <div className="relative aspect-video bg-[var(--brand-green)]">
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
                {/* Play button overlay */}
                {activeVideo !== testimonial.id && (
                  <button
                    onClick={() => {
                      handlePlayVideo(testimonial.id);
                      videoRefs.current[testimonial.id]?.play();
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  >
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg
                        className="w-7 h-7 text-[var(--brand-green)] ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                )}
              </div>

              {/* Info section */}
              <div className="p-6">
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-[var(--brand-orange)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[var(--muted)] mb-4 text-sm leading-relaxed line-clamp-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-green)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--brand-green)] text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
