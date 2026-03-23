import PrimaryButton from "@/components/shared/PrimaryButton";

type InputProps = {
  placeholder: string;
  textarea?: boolean;
};

function GhostInput({ placeholder, textarea = false }: InputProps) {
  if (textarea) {
    return (
      <textarea
        placeholder={placeholder}
        rows={6}
        className="w-full resize-none rounded-[20px] border border-transparent bg-white px-5 py-4 text-lg text-[var(--fg)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
      />
    );
  }

  return (
    <input
      placeholder={placeholder}
      className="h-16 w-full rounded-[20px] border border-transparent bg-white px-5 text-lg text-[var(--fg)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
    />
  );
}

export default function ContactFormCard() {
  return (
    <section className="rounded-[32px] border border-[var(--border)] bg-transparent p-5 sm:p-8 lg:p-12">
      <h1 className="text-[40px] font-semibold tracking-[-0.04em] text-[var(--fg)] sm:text-[52px] lg:text-[60px]">
        Send Us a Message
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5">
        <GhostInput placeholder="Enter your name" />
        <GhostInput placeholder="Enter phone number" />
        <div className="md:col-span-2">
          <GhostInput placeholder="Email address" />
        </div>
        <div className="md:col-span-2">
          <GhostInput placeholder="Your address" />
        </div>
        <div className="md:col-span-2">
          <GhostInput placeholder="Write your message" textarea />
        </div>
      </div>

      <div className="mt-7 lg:mt-8">
        <PrimaryButton className="h-14 rounded-full border border-[var(--brand)] bg-transparent px-10 text-[32px] font-semibold text-[var(--brand)] shadow-none hover:bg-[var(--brand-soft)] hover:text-[var(--brand-strong)] sm:text-[18px] lg:min-w-[250px]">
          Send Message
        </PrimaryButton>
      </div>
    </section>
  );
}
