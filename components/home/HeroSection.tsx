// components/home/HeroSection.tsx
import AppContainer from "@/components/shared/AppContainer";
import LottiePlayer from "@/components/shared/LottiePlayer";
import SearchBar from "@/components/shared/SearchBar";
import homeHeroAnimation from "@/public/images/home/home_hero.json";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <AppContainer className="flex min-h-[calc(100dvh-78px-88px)] flex-col lg:min-h-[calc(100dvh-88px-72px)]">
        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center text-center pt-4 sm:pt-6 lg:pt-8">
          <h1 className="max-w-[18ch] text-[36px] font-semibold leading-[1.05] tracking-[-0.04em] text-black sm:text-[48px] md:text-[58px] lg:max-w-[16ch] lg:text-[64px] xl:text-[68px] 2xl:text-[72px]">
            Find your living space without a hustle.
          </h1>
          <div className="mt-6 w-full max-w-[920px] sm:mt-8 lg:mt-10">
            <SearchBar />
          </div>
        </div>

        <div className="mt-auto flex justify-center pt-4 sm:pt-6 lg:pt-4">
          <LottiePlayer
            animationData={homeHeroAnimation}
            className="w-full max-w-[220px] sm:max-w-[270px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[350px]"
          />
        </div>
      </AppContainer>
    </section>
  );
}
