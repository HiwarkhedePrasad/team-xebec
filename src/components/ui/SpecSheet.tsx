"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

interface SpecSheetProps {
    id: string;
    name: string;
    role: string;
    stack: string[];
    href?: string;
    github?: string;
    status?: "active" | "in-progress" | "archived";
}

const statusColors = {
  active: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  archived: "bg-muted/40",
};

const statusLabels = {
  active: "Active",
  "in-progress": "In Progress",
  archived: "Archived",
};

export function SpecSheet({ id, name, role, stack, href = "#", github, status = "active" }: SpecSheetProps) {
  return (
    <div className="group block relative border-t border-border hover:bg-white/[0.02] transition-all duration-300">
      {/* Scanline Effect */}
      <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent group-hover:w-full transition-all duration-700 ease-in-out opacity-50" />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 md:py-8 items-center px-2">
        
        {/* ID + Status */}
        <div className="md:col-span-2 flex items-center gap-3">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColors[status]} ${status === "active" ? "animate-pulse" : ""}`} />
          <span className="font-mono text-xs text-muted/40 uppercase tracking-widest group-hover:text-emerald-500/80 transition-colors">
            {id}
          </span>
        </div>

        {/* Info */}
        <div className="md:col-span-4">
            <h3 className="text-lg md:text-xl font-medium text-foreground flex items-center gap-2">
                {name}
                <ArrowUpRight className="w-4 h-4 text-muted opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
                {role}
            </p>
        </div>

        {/* Stack */}
        <div className="md:col-span-4 flex flex-wrap gap-2">
            {stack.map((tech) => (
                <span 
                    key={tech} 
                    className="px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded text-[10px] font-mono text-muted-foreground uppercase tracking-wide group-hover:border-white/[0.1] transition-colors"
                >
                    {tech}
                </span>
            ))}
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 hidden lg:block">
            {statusLabels[status]}
          </span>
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground/30 hover:text-foreground transition-colors rounded-sm hover:bg-white/[0.03]"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
