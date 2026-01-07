"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do you vet your talent?",
    answer:
      "Only the top 1% of applicants pass our rigorous 4-stage testing process. We evaluate English proficiency, logical reasoning, technical skills specific to the role, and personality fit. Each candidate undergoes live interviews, practical assessments, and reference checks before joining our talent pool.",
  },
  {
    question: "What time zones do they work?",
    answer:
      "Our VAs work your business hours. Whether you're in EST, PST, GMT, or any other timezone, we match you with talent that aligns perfectly with your schedule. Many of our VAs are experienced in working with US, UK, and Australian businesses and are flexible with overlapping hours.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No long-term commitments required. We believe in the quality of our talent, which is why we offer flexible month-to-month arrangements. There are no hidden placement fees, no lock-in periods, and no penalties for scaling up or down based on your needs.",
  },
  {
    question: "Who manages the VA?",
    answer:
      "You lead the tasks and day-to-day work, but we provide the infrastructure and ongoing support to ensure the relationship is a success. This includes performance monitoring, replacement guarantees, and dedicated account management to address any concerns quickly.",
  },
  {
    question: "What if the VA isn't a good fit?",
    answer:
      "We offer a risk-free trial period and replacement guarantee. If you're not satisfied with your VA within the first two weeks, we'll find you a replacement at no additional cost. Our 98% retention rate speaks to our matching accuracy, but we've got you covered just in case.",
  },
  {
    question: "What tasks can a VA handle?",
    answer:
      "Our VAs specialize in a wide range of administrative and operational tasks including calendar management, email handling, travel booking, CRM administration, data entry, customer support, social media management, research, and more. During your discovery call, we'll map out exactly what you need.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 px-6 lg:px-8 bg-[var(--brand-cream)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--brand-lime)] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-teal)] rounded-full blur-[150px] opacity-15"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6">
            <svg className="w-5 h-5 text-[var(--brand-teal)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-[var(--brand-green)]">Got Questions?</span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`glass rounded-2xl overflow-hidden shadow-soft transition-all duration-300 ${
                openIndex === index ? "shadow-elevated" : ""
              }`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                <span className={`font-semibold pr-4 transition-colors ${
                  openIndex === index ? "text-[var(--brand-teal)]" : "text-[var(--brand-green)]"
                } group-hover:text-[var(--brand-teal)]`}>
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[var(--brand-lime)] to-[#d4e87a] rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                    openIndex === index ? "rotate-180 shadow-md" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-[var(--brand-green)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-[var(--muted)] leading-relaxed border-t border-[var(--brand-green)]/5 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 glass rounded-3xl shadow-soft">
          <p className="text-[var(--brand-green)] font-medium mb-4">Still have questions?</p>
          <a
            href="#book-call"
            className="group inline-flex items-center gap-2 btn-primary text-[var(--brand-cream)] px-8 py-4 rounded-xl font-semibold"
          >
            Schedule a call with our team
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
