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
    <section id="faq" className="py-20 px-6 lg:px-8 bg-[var(--brand-cream)]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
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
              className="glass rounded-2xl overflow-hidden shadow-soft"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[var(--brand-green)] pr-4">
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 bg-[var(--brand-lime)] rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-[var(--brand-green)]"
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
                <div className="px-6 pb-5 text-[var(--muted)] leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-[var(--muted)] mb-4">Still have questions?</p>
          <a
            href="#book-call"
            className="inline-flex items-center gap-2 text-[var(--brand-teal)] font-semibold hover:text-[var(--brand-green)] transition-colors"
          >
            Schedule a call with our team
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
    </section>
  );
}
