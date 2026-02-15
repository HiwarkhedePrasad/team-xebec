"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  initial: string;
  accentColor: string;
}

const team: TeamMember[] = [
  {
    name: "Prasad Hiwarkhedkar",
    role: "Lead Systems Architect",
    skills: ["AI/ML", "Systems Design", "Security"],
    github: "https://github.com/HiwarkhedePrasad",
    linkedin: "https://www.linkedin.com/in/prasadhiwarkhedkar/",
    initial: "PH",
    accentColor: "emerald",
  },
  {
    name: "Team Member",
    role: "Infrastructure Engineer",
    skills: ["C++", "Compiler Tech", "WASM"],
    github: "#",
    initial: "TM",
    accentColor: "blue",
  },
  {
    name: "Team Member",
    role: "AI Research Engineer",
    skills: ["NLP", "Vision", "RAG Pipelines"],
    github: "#",
    initial: "TM",
    accentColor: "violet",
  },
  {
    name: "Team Member",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "DevOps"],
    github: "#",
    initial: "TM",
    accentColor: "amber",
  },
];

const accentMap: Record<string, string> = {
  emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40",
  violet: "from-violet-500/20 to-violet-500/5 border-violet-500/20 hover:border-violet-500/40",
  amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20 hover:border-amber-500/40",
};

const initialBgMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400",
  blue: "bg-blue-500/10 text-blue-400",
  violet: "bg-violet-500/10 text-violet-400",
  amber: "bg-amber-500/10 text-amber-400",
};

export function TeamSection() {
  return (
    <section id="team" className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-24">
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
          The Engineers
        </h2>
        <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground/80 max-w-2xl">
          A small team of builders obsessed with performance, architecture, and shipping real systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={member.name + index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-xl border bg-gradient-to-b p-6 transition-all duration-500 ${accentMap[member.accentColor]}`}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Avatar initial */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-mono mb-5 ${initialBgMap[member.accentColor]}`}>
                {member.initial}
              </div>

              {/* Info */}
              <h3 className="text-lg font-medium text-foreground tracking-tight mb-1">
                {member.name}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60 mb-4">
                {member.role}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded text-[10px] font-mono text-muted-foreground uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                {member.github && (
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground/40 hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground/40 hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
