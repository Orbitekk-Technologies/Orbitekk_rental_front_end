"use client";

import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import Reveal from "@/components/marketing/shared/Reveal";

const faqItems = [
  {
    question: "Do I need to book in advance?",
    answer:
      "Yes, booking in advance is recommended so you can secure the property and complete the verification process smoothly.",
  },
  {
    question: "Can I move in before contract?",
    answer:
      "Move-in timing depends on listing approval, payment confirmation, and lease readiness. In most cases, contract confirmation comes first.",
  },
  {
    question: "What is included in my rent?",
    answer:
      "What is included depends on the listing. Some rentals include utilities or maintenance, while others may list them separately.",
  },
  {
    question: "Outstanding Property",
    answer:
      "Explore our extensive listings of properties, ranging from cozy apartments to luxurious estates.",
  },
  {
    question: "Find Excellent Deals",
    answer:
      "We regularly feature competitive pricing and highlighted properties that help renters discover strong value options.",
  },
  {
    question: "Can I move out hustle free ?",
    answer:
      "Yes, move-out is designed to be simple as long as notice terms, inspections, and final settlement requirements are completed properly.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#dcdceb] pb-5 pt-2">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span className="text-[20px] font-medium tracking-[-0.03em] text-[var(--fg)] md:text-[22px]">
          {question}
        </span>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
            isOpen
              ? "border-[var(--brand)] bg-[var(--brand)] text-white"
              : "border-[#aeb3c1] bg-transparent text-[var(--fg)]"
          }`}
        >
          {isOpen ? (
            <RemoveRoundedIcon sx={{ fontSize: 20 }} />
          ) : (
            <AddRoundedIcon sx={{ fontSize: 20 }} />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100 pt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="max-w-[440px] text-[15px] leading-7 text-[var(--muted)]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(3);

  const leftColumn = faqItems.slice(0, 3);
  const rightColumn = faqItems.slice(3, 6);

  return (
    <section id="faq" className="pb-16 pt-4 md:pb-28 md:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="rounded-[34px] bg-[var(--surface-soft)] px-5 py-8 sm:px-6 md:px-10 md:py-12 lg:px-16 lg:py-14">
          <Reveal>
            <div className="text-center">
              <p className="text-[14px] font-medium text-[var(--muted)]">
                Info Point
              </p>
              <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] text-[var(--fg)] md:text-[48px]">
                Q&A You all Need to know
              </h2>
            </div>
          </Reveal>

          {/* Desktop */}
          <div className="mt-10 hidden grid-cols-2 gap-16 md:grid">
            <div className="space-y-2">
              {leftColumn.map((item, idx) => (
                <Reveal key={item.question} delay={idx * 0.05}>
                  <FAQItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === idx}
                    onClick={() =>
                      setOpenIndex(openIndex === idx ? -1 : idx)
                    }
                  />
                </Reveal>
              ))}
            </div>

            <div className="space-y-2">
              {rightColumn.map((item, idx) => {
                const actualIndex = idx + 3;

                return (
                  <Reveal key={item.question} delay={idx * 0.05}>
                    <FAQItem
                      question={item.question}
                      answer={item.answer}
                      isOpen={openIndex === actualIndex}
                      onClick={() =>
                        setOpenIndex(openIndex === actualIndex ? -1 : actualIndex)
                      }
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="mt-8 space-y-2 md:hidden">
            {faqItems.map((item, idx) => (
              <Reveal key={item.question} delay={idx * 0.04}>
                <FAQItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}