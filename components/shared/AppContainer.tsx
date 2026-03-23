// components/shared/AppContainer.tsx
import { cn } from "@/lib/utils/cn";

type AppContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AppContainer({
  children,
  className,
}: AppContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}