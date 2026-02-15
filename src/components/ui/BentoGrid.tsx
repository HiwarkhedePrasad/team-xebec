"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export function BentoGrid({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]", className)}>
      {children}
    </div>
  );
}

export function BentoCard({ 
    title, 
    subtitle, 
    icon, 
    children, 
    className,
    colSpan = 1 
}: { 
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
}) {
  return (
    <div className={clsx(
        "group relative overflow-hidden rounded-xl border border-white/[0.08] bg-surface p-6 transition-all duration-300 hover:border-white/[0.15]",
        colSpan === 2 ? "md:col-span-2" : colSpan === 3 ? "md:col-span-3" : "md:col-span-1",
        className
    )}>
      {/* Dynamic Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
             <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-muted-foreground group-hover:text-foreground transition-colors">
                {icon}
             </div>
             {subtitle && (
                 <span className="text-[10px] font-mono uppercase tracking-wider text-muted/60 bg-white/[0.02] px-2 py-1 rounded">
                     {subtitle}
                 </span>
             )}
        </div>
        
        <h3 className="text-lg font-medium text-foreground tracking-tight mb-2">
            {title}
        </h3>
        
        <div className="text-sm text-muted-foreground leading-relaxed flex-1">
            {children}
        </div>
      </div>
    </div>
  );
}
