import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const steps = [
  {
    id: "01",
    title: "We Are Working Deal",
    description:
      "Let us know what you would like cleaned, and we give you the best prices on the market.",
  },
  {
    id: "02",
    title: "Making A Deal",
    description:
      "We will curate your housing plan with best layouts and services that suit your taste.",
  },
  {
    id: "03",
    title: "Property Handover",
    description:
      "Now you just sit back and relax, while we ensure your home is spotless, top-to-bottom.",
  },
];

export default function AboutHowItWorks() {
  return (
    <section>
      <div className="mx-auto max-w-[520px] text-center">
        <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)] sm:text-[42px]">
          How We Work?
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)] sm:text-[15px]">
          Whether you&apos;re buying, selling, or investing, let us be your trusted partner from first inquiry to final handover.
        </p>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[32px] bg-white shadow-[var(--shadow-card)]">
        <video
          className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[310px]"
          src="/images/about/arial_view.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            aria-label="Play video"
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[var(--brand)] shadow-lg backdrop-blur"
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 34 }} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3 lg:mt-8 lg:gap-8">
        {steps.map((step) => (
          <div key={step.id}>
            <p className="text-5xl font-semibold tracking-[-0.04em] text-[var(--brand-soft)] sm:text-6xl">
              {step.id}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-[var(--fg)] lg:text-[22px]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[30ch] text-sm leading-6 text-[var(--muted)] lg:text-[15px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
