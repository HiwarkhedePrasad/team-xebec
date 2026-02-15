"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectItemProps {
  name: string;
  description: string;
  stack: string[];
  challenge: string;
  href: string;
}

export function ProjectItem({
  name,
  description,
  stack,
  challenge,
  href,
}: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group border-t border-border py-8 hover:bg-muted/5 transition-colors"
    >
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium tracking-tight group-hover:text-foreground/80 transition-colors flex items-center gap-2">
            {name}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            {stack.join(" • ")}
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-base text-muted-foreground">{description}</p>
          <div className="mt-4">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">
              Key Challenge
            </span>
            <p className="text-sm mt-1">{challenge}</p>
          </div>
        </div>
        <div className="md:col-span-1 flex items-start justify-end">
          <Link
            href={href}
            className="text-sm font-medium underline decoration-muted-foreground/30 hover:decoration-foreground/100 underline-offset-4 transition-all"
          >
            View Specs
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
