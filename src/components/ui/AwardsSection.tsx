"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, Star, Flame } from "lucide-react";
import { ReactNode } from "react";

interface Achievement {
  icon: ReactNode;
  title: string;
  event: string;
  rank: string;
  year: string;
  accentColor: string;
  glowClass: string;
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Nasa Space App Challenge",
    event: "Nagpur Division",
    rank: "3rd Place — Winner",
    year: "2025",
    accentColor: "text-amber-400",
    glowClass: "from-amber-500/20 to-amber-500/0 border-amber-500/20 hover:border-amber-500/40",
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Enigma",
    event: "Enigma Hackathon",
    rank: "1st Place — Winner",
    year: "2025",
    accentColor: "text-emerald-400",
    glowClass: "from-emerald-500/20 to-emerald-500/0 border-emerald-500/20 hover:border-emerald-500/40",
  },
  {
    icon: <Medal className="w-6 h-6" />,
    title: "CIH 2.0",
    event: "Code Innovation Hub",
    rank: "Top 12 Finalists",
    year: "2025",
    accentColor: "text-violet-400",
    glowClass: "from-violet-500/20 to-violet-500/0 border-violet-500/20 hover:border-violet-500/40",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "CIH 3.0",
    event: "Code Innovation Hub",
    rank: "Top 7 Finalists",
    year: "2026",
    accentColor: "text-cyan-400",
    glowClass: "from-cyan-500/20 to-cyan-500/0 border-cyan-500/20 hover:border-cyan-500/40",
  },
];

export function AwardsSection() {
  return (
    <section className="py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            Awards & Recognition
          </h2>
          <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground/80 max-w-2xl">
            Validated in competition. Built to win hackathons, designed to ship production systems.
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title + item.year}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-xl border bg-gradient-to-b p-6 transition-all duration-500 ${item.glowClass}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Top row: Icon + Year */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`${item.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider bg-white/[0.03] px-2 py-1 rounded">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider mb-4">
                  {item.event}
                </p>

                {/* Rank Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm font-medium ${item.accentColor}`}>
                  {item.rank}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10"
        >
          {[
            { value: "4+", label: "Competitions Finalist" },
            { value: "12+", label: "Production Modules" },
            { value: "100%", label: "Open Source" },
            { value: "∞", label: "Ambition" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
