"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Cpu, Database, Network } from "lucide-react";

export function PerspectiveStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const logs = [
    "Initializing runtime environment...",
    "Loading system kernels...",
    "Optimizing memory allocation...",
    "Establishing secure connection...",
    "System ready.",
    "Watching for input...",
  ];
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 500 + 300;
      setTimeout(() => {
        setLines((prev) => {
             const newLines = [...prev, log];
             return newLines.slice(-5); 
        });
      }, delay);
    });
  }, []);

  return (
    <div ref={ref} className="h-[480px] w-full flex items-center justify-center relative perspective-1000">
      
      {/* Bottom Layer: Raw Data (Infrastructure) */}
      <motion.div
        style={{ y: y1, scale, rotateX: 10, z: -100 }}
        className="absolute w-[400px] h-[360px] bg-surface border border-border/40 rounded-lg shadow-2xl flex flex-col p-4 opacity-40 blur-[1px]"
      >
        <div className="flex justify-between items-center mb-4 border-b border-border/30 pb-2">
           <span className="text-[10px] font-mono text-muted uppercase">Infrastructure</span>
           <Database className="w-3 h-3 text-muted" />
        </div>
        <div className="grid grid-cols-4 gap-2 flex-1 content-start opacity-30">
            {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="h-1 bg-muted rounded-full w-full" />
            ))}
        </div>
      </motion.div>

       {/* Middle Layer: Processing (Logic) */}
      <motion.div
        style={{ y: y2, scale, rotateX: 10, z: -50 }}
        className="absolute w-[400px] h-[360px] bg-surface border border-border/60 rounded-lg shadow-2xl flex flex-col p-4 opacity-70 translate-y-[-20px]"
      >
        <div className="flex justify-between items-center mb-4 border-b border-border/30 pb-2">
           <span className="text-[10px] font-mono text-muted uppercase">Logic Layer</span>
           <Cpu className="w-3 h-3 text-muted" />
        </div>
        <div className="space-y-3 flex-1">
             <div className="h-16 border border-dashed border-border rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-pulse" />
             </div>
             <div className="space-y-1">
                 <div className="h-1 w-2/3 bg-muted/20" />
                 <div className="h-1 w-1/2 bg-muted/20" />
                 <div className="h-1 w-3/4 bg-muted/20" />
             </div>
             <div className="h-16 border border-dashed border-border rounded flex items-center justify-center">
                 <div className="w-2 h-2 bg-blue-500/50 rounded-full animate-pulse delay-75" />
             </div>
        </div>
      </motion.div>

      {/* Top Layer: Insight (Interface) */}
      <motion.div
        style={{ y: y3, scale, opacity, rotateX: 10, z: 0 }}
        className="absolute w-[400px] h-[360px] bg-background border border-border rounded-lg shadow-2xl flex flex-col p-6 translate-y-[-40px]"
      >
         <div className="flex justify-between items-center mb-4">
           <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-500/20" />
               <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
               <div className="w-2 h-2 rounded-full bg-green-500" />
           </div>
           <Network className="w-4 h-4 text-foreground" />
        </div>
        
        <div className="mb-4">
            <div className="text-3xl font-bold tracking-tighter leading-none">System</div>
            <div className="text-3xl font-bold tracking-tighter leading-none text-muted-foreground">Ready</div>
        </div>

        <div className="font-mono text-xs text-emerald-500/80 mb-4 flex-1 min-h-[120px] flex flex-col justify-end overflow-hidden mask-image-b selection:bg-emerald-500/30">
             <AnimatePresence mode="popLayout">
                {lines.map((line, i) => (
                    <motion.div
                        key={`${i}-${line}`} 
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="py-1 whitespace-nowrap"
                    >
                        <span className="text-muted-foreground/50 mr-2 select-none">[INFO]</span>
                        {line}
                    </motion.div>
                ))}
             </AnimatePresence>
             <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="h-3 w-1.5 bg-emerald-500/50 mt-1"
             />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
            <div>
                <div className="text-[10px] font-mono text-muted uppercase mb-1">Memory</div>
                <div className="text-2xl font-mono text-foreground tracking-tight">32%</div>
            </div>
             <div>
                <div className="text-[10px] font-mono text-muted uppercase mb-1">Latency</div>
                <div className="text-2xl font-mono text-foreground tracking-tight">12ms</div>
            </div>
        </div>

      </motion.div>

    </div>
  );
}
