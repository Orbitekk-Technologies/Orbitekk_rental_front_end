type PropertySectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function PropertySection({
  title,
  children,
}: PropertySectionProps) {
  return (
    <section className="border-t border-[var(--border)] pt-5">
      <h2 className="mb-4 text-[20px] font-semibold text-[var(--fg)]">
        {title}
      </h2>
      {children}
    </section>
  );
}