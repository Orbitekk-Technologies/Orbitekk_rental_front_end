"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I search for a property?",
    answer:
      "Use the search page to enter a city, neighborhood, or address and explore available rental properties. Your final FAQ answer can replace this text.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Select Sign In in the navigation, then choose the option to create an account and follow the steps shown.",
  },
  {
    question: "How can I add a property?",
    answer:
      "Choose Add Property from the navigation. You may be asked to sign in before entering the property details.",
  },
  {
    question: "Can I save properties I like?",
    answer:
      "Signed-in tenants can keep track of properties they are interested in from their account.",
  },
  {
    question: "How do I contact a property manager?",
    answer:
      "Open a property listing to view the available contact and application options for that property.",
  },
  {
    question: "Where can I get more help?",
    answer:
      "Visit the Contact page to send your question to the Shagriha team.",
  },
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-primary-200 border-y border-primary-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-answer-${index}`;

        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-primary-900 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-4"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-base font-semibold sm:text-lg">{faq.question}</span>
              {isOpen ? (
                <Minus aria-hidden="true" className="h-5 w-5 shrink-0 text-black" />
              ) : (
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-secondary-500" />
              )}
            </button>
            <div
              id={contentId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 pr-10 text-base leading-7 text-primary-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
