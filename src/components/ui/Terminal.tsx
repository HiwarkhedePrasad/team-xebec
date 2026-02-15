"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const logs = [
  "Initializing runtime environment...",
  "Loading system kernels...",
  "Optimizing memory allocation...",
  "Establishing secure connection...",
  "System ready.",
  "Watching for input...",
];

export function Terminal() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 500 + 300;
      setTimeout(() => {
        setLines((prev) => [...prev, log]);
      }, delay);
    });
  }, []);

  return (
    <div className="font-mono text-xs md:text-sm text-muted-foreground/80 bg-muted/20 p-4 rounded-sm border border-border/50 w-full max-w-md h-40 overflow-hidden flex flex-col justify-end">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-accent-foreground/50 mr-2">$</span>
          {line}
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="h-4 w-2 bg-accent-foreground/50 mt-1"
      />
    </div>
  );
}
