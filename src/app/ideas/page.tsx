"use client";

import { Navbar } from "@/components/ui/Navbar";
import { TldrawCanvas } from "@/components/ui/TldrawCanvas";
import { motion } from "framer-motion";

export default function IdeasPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-foreground selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
            <Navbar />
            
            <div className="pt-32 px-6 md:px-12 max-w-[90rem] mx-auto w-full flex-1 flex flex-col">
                 <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                             <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-500/80">
                                Live Workspace
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            <span className="text-emerald-500">Concept</span> Board
                        </h1>
                         <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
                            A collaborative space for visualizing future architectures, drafting system designs, and exploring new ideas in real-time.
                         </p>
                    </motion.div>
                 </div>

                 <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 w-full min-h-[600px] mb-12"
                 >
                    <TldrawCanvas />
                 </motion.div>
            </div>
        </main>
    )
}
