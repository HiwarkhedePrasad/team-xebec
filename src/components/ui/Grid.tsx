import clsx from "clsx";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

export function Grid({ children, className, cols = 3 }: GridProps) {
  return (
    <div
      className={clsx(
        "grid gap-6 md:gap-12",
        {
          "grid-cols-1": cols === 1,
          "grid-cols-1 md:grid-cols-2": cols === 2,
          "grid-cols-1 md:grid-cols-3": cols === 3,
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": cols === 4,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
