"use client";

import Image from "next/image";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

import Reveal from "@/components/marketing/shared/Reveal";

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#f1f2f6] text-[var(--fg)]">
        {icon}
      </div>

      <div>
        <h3 className="text-[24px] font-medium tracking-[-0.03em] text-[var(--fg)] md:text-[28px]">
          {title}
        </h3>
        <p className="mt-2 max-w-[420px] text-[14px] leading-7 text-[var(--muted)] md:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="pb-16 pt-8 md:pb-28 md:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="text-center text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)] md:text-[48px]">
            About Our Real Estate
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <p className="max-w-[560px] text-[15px] leading-8 text-[var(--muted)] md:text-[16px]">
                Our agency takes a collaborative approach, working closely with
                you to understand your business, how to grow up, craft
                personalized marketing solutions that align with our vision, and
                stay updated with the latest trends.
              </p>
            </Reveal>

            <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
              <Reveal delay={0.05}>
                <FeatureItem
                  icon={<ApartmentRoundedIcon sx={{ fontSize: 24 }} />}
                  title="High Standard"
                  description="Lorem ipsum dolor sit amet consectetur. Malesua vehicula netu urna in elit amet."
                />
              </Reveal>

              <Reveal delay={0.1}>
                <FeatureItem
                  icon={<ForumRoundedIcon sx={{ fontSize: 24 }} />}
                  title="Ease Of Communication"
                  description="Lorem ipsum dolor sit amet consectetur. Malesua vehicula netu urna in elit amet."
                />
              </Reveal>
            </div>
          </div>

          <Reveal className="hidden md:block">
            <div className="relative mx-auto h-[500px] w-full max-w-[520px]">
              <div className="absolute right-0 top-0 overflow-hidden rounded-[36px]">
                <Image
                  src="/images/about/about-main.png"
                  alt="Modern real estate building"
                  width={460}
                  height={520}
                  className="h-[430px] w-[380px] object-cover lg:h-[470px] lg:w-[410px]"
                />
              </div>

              <div className="absolute bottom-0 left-0 overflow-hidden rounded-[28px] border-[8px] border-[var(--bg)]">
                <Image
                  src="/images/about/about-overlay.png"
                  alt="House model in hand"
                  width={220}
                  height={220}
                  className="h-[190px] w-[190px] object-cover lg:h-[220px] lg:w-[220px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}