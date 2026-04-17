"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

type ListingsFiltersProps = {
  location?: string;
};

function SelectChip({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[92px]">
      <label className="mb-2 block text-[12px] font-medium text-[var(--muted)]">
        {label}
      </label>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-between rounded-[12px] border border-[var(--border)] bg-white px-4 text-[15px] text-[var(--fg)] transition-colors hover:border-[#d7dbe3]"
      >
        <span>{value}</span>
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
      </button>
    </div>
  );
}

export default function ListingsFilters({
  location = "",
}: ListingsFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-[12px] font-medium text-[var(--muted)]">
          Location
        </label>

        <div className="flex w-full overflow-hidden rounded-[18px] border border-[var(--border)] bg-white">
          <input
            defaultValue={location}
            placeholder="Enter Your Location"
            className="h-14 flex-1 bg-transparent px-5 text-[16px] outline-none placeholder:text-[var(--muted-2)]"
          />
          <button
            type="button"
            className="inline-flex h-14 w-14 items-center justify-center rounded-l-[0] rounded-r-[18px] bg-[var(--brand)] text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            <SearchRoundedIcon sx={{ fontSize: 22 }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <SelectChip label="Type" value="Any" />
        <SelectChip label="Property" value="Townhouse" />
        <SelectChip label="MinPrice" value="$300" />
        <SelectChip label="MaxPrice" value="$500" />
        <SelectChip label="More Filters" value="Any" />
      </div>
    </div>
  );
}