import clsx from "clsx";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12",
        className
      )}
    >
      {children}
    </section>
  );
}
