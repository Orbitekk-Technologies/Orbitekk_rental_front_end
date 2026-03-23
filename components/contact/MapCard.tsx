import { contactConfig } from "@/lib/constants/contact";

export default function MapCard() {
  const mapEmbed = `https://www.google.com/maps?q=${contactConfig.latitude},${contactConfig.longitude}&z=13&output=embed`;

  return (
    <section className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[var(--shadow-card)]">
      <iframe
        title="ProNest office map"
        src={mapEmbed}
        className="h-[420px] w-full border-0 sm:h-[540px] lg:h-[740px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
