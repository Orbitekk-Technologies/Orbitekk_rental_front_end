import Image from "next/image";
import MarketingShell from "@/components/layout/MarketingShell";
import AppContainer from "@/components/shared/AppContainer";
import AboutServices from "@/components/about/AboutServices";
import AboutHowItWorks from "@/components/about/AboutHowItWorks";

export default function AboutPage() {
  return (
    <MarketingShell>
      <AppContainer className="pb-10 pt-6 sm:pb-12 lg:pb-10">
        {/* Heading */}
        <section className="mx-auto max-w-[900px] text-center">
          <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-[var(--fg)] sm:text-[46px] lg:text-[54px]">
            About ProNest
          </h1>

          <p className="mx-auto mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)] sm:text-[15px]">
            Whether you&apos;re buying, selling, or investing, let us be your trusted contact from discovery to move-in.
          </p>
        </section>

        {/* Image */}
        <section className="mt-6 overflow-hidden rounded-[32px] bg-white shadow-[var(--shadow-card)] lg:mt-8">
          <Image
            src="/images/about/about_hero.png"
            alt="People talking inside a bright modern home"
            width={1600}
            height={900}
            className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[420px]"
            priority
          />
        </section>

        {/* Services */}
        <section className="mt-8 lg:mt-10">
          <AboutServices />
        </section>

        {/* Video / How it works */}
        <section className="mt-10 lg:mt-12">
          <AboutHowItWorks />
        </section>
      </AppContainer>
    </MarketingShell>
  );
}