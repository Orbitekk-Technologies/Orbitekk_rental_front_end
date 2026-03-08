"use client";

import Image from "next/image";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group cursor-pointer rounded-[28px] border border-[#d9d9df] bg-white p-4 transition md:hover:-translate-y-1 md:hover:shadow-[0_16px_36px_rgba(17,24,39,0.08)]">
      <div className="relative overflow-hidden rounded-[20px]">
        <div className="absolute left-4 top-4 z-10 rounded-[8px] border border-[#1e2430] bg-white/80 px-3 py-1 text-[14px] font-medium text-[var(--fg)] backdrop-blur-sm">
          {property.status}
        </div>

        <Image
          src={property.image}
          alt={property.title}
          width={700}
          height={500}
          className="h-[240px] w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.03] sm:h-[280px] md:h-[250px]"
        />
      </div>

      <div className="pt-5">
        <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
          {property.title}
        </h3>

        <p className="mt-2 text-[15px] text-[var(--fg)]/80">
          {property.distance}
        </p>

        <div className="mt-4 flex items-end gap-1">
          <span className="text-[20px] font-semibold text-[var(--brand)]">
            {property.price}
          </span>
          <span className="pb-[2px] text-[15px] text-[var(--fg)]">/ month</span>
        </div>

        <div className="mt-5 h-px w-full bg-[#e6e6eb]" />

        <div className="mt-4 flex flex-wrap items-center gap-5 text-[15px] text-[var(--fg)]">
          <div className="flex items-center gap-1.5">
            <BedOutlinedIcon sx={{ fontSize: 18 }} />
            <span>{property.beds}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <BathtubOutlinedIcon sx={{ fontSize: 18 }} />
            <span>{property.baths}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <SquareFootOutlinedIcon sx={{ fontSize: 18 }} />
            <span>{property.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
}