import FooterSection from "../landing/FooterSection";
import FaqAccordion from "./FaqAccordion";

export default function FaqPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 text-primary-900 sm:px-8 sm:py-20 lg:py-24">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-primary-600">
            Find quick answers to common questions about Shagriha.
          </p>
        </header>
        <FaqAccordion />
      </section>
      <FooterSection />
    </>
  );
}
