"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number | string;
  suffix?: string;
  label: string;
  duration?: number;
}

export function AnimatedCounter({ target, suffix = "", label, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const numericTarget = typeof target === "string" ? parseInt(target) : target;
  const isNumeric = !isNaN(numericTarget);

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    let start = 0;
    const end = numericTarget;
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, Math.max(stepTime, 16));

    return () => clearInterval(timer);
  }, [isInView, numericTarget, duration, isNumeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 text-center group"
    >
      <div className="relative">
        <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
          {isNumeric ? count : target}
          {suffix}
        </span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-px glow-line-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
        {label}
      </span>
    </motion.div>
  );
}
