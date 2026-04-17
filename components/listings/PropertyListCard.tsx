import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import { Property } from "@/data/properties";

type PropertyListCardProps = {
  property: Property;
};

export default function PropertyListCard({
  property,
}: PropertyListCardProps) {
  return (
    <article className="flex gap-4 rounded-[22px] border border-[#e2e5ea] bg-white p-4 transition-transform hover:-translate-y-0.5">
      <div className="relative h-[116px] w-[158px] shrink-0 overflow-hidden rounded-[18px] sm:h-[128px] sm:w-[168px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-[20px] font-semibold leading-[1.25] text-[var(--fg)]">
          {property.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-[13px] text-[var(--muted)]">
          <StarRoundedIcon sx={{ fontSize: 16, color: "#f5b301" }} />
          <span>{property.rating ?? 4.5}</span>
          <span>{property.locationLabel}</span>
        </div>

        <p className="mt-3 text-[13px] text-[var(--muted)]">
          {property.guests ?? 2} guests | {property.beds} bedroom | {property.baths} bathroom
        </p>

        <div className="mt-4 flex items-center gap-2 text-[13px] text-[var(--brand)]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-soft)]">
            <BedRoundedIcon sx={{ fontSize: 14 }} />
          </span>
          <span>{property.rentalType}</span>
        </div>
      </div>
    </article>
  );
}