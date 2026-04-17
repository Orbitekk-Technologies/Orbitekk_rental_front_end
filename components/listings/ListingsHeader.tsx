type ListingsHeaderProps = {
  locationTitle?: string;
};

export default function ListingsHeader({
  locationTitle = "Your Location",
}: ListingsHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-[28px] font-medium tracking-[-0.02em] text-[var(--fg)] sm:text-[34px]">
        Search results for{" "}
        <span className="font-semibold text-[var(--fg)]">{locationTitle}</span>
      </h1>
    </div>
  );
}