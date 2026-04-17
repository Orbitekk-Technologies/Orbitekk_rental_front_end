// components/shared/SearchBar.tsx
"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextInput from "@/components/shared/TextInput";
import { cn } from "@/lib/utils/cn";

type SearchBarProps = {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  compact?: boolean;
  onSearch?: () => void;
};

export default function SearchBar({
  placeholder = "Enter an address, city or pincode to search",
  buttonLabel = "Search",
  className,
  compact = false,
  onSearch,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "w-full rounded-[40px] bg-white p-3 shadow-[var(--shadow-soft)]",
        compact && "rounded-full p-2",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          compact ? "flex-row" : "flex-row"
        )}
      >
        <div className="min-w-0 flex-1">
          <TextInput
            placeholder={placeholder}
            className={cn(
              "border-none bg-transparent shadow-none ring-0 focus:ring-0",
              "placeholder:text-[var(--muted-2)]",
              compact
                ? "h-10 px-3 text-sm"
                : "h-12 px-4 text-[15px] sm:h-14 sm:px-5 sm:text-base"
            )}
          />
        </div>

        <PrimaryButton
          type="button"
          className={cn(
            "shrink-0 gap-2",
            compact
              ? "h-10 rounded-full px-4 text-sm"
              : "h-12 rounded-[20px] px-5 sm:h-14 sm:min-w-[155px] sm:px-8"
          )}
          onClick={onSearch}
        >
          {compact ? <SearchRoundedIcon fontSize="small" /> : null}
          <span>{buttonLabel}</span>
        </PrimaryButton>
      </div>
    </div>
  );
}