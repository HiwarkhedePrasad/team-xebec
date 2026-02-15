"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Terminal, ShieldAlert, Cpu, Network, Zap } from "lucide-react";
import clsx from "clsx";

export function JoinForm() {
  const [step, setStep] = useState<"idle" | "form" | "vetting" | "approved">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    specialization: "",
  });
  const [vettingLogs, setVettingLogs] = useState<{msg: string, status: 'pending' | 'success'}[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("vetting");
    runVettingProcess();
  };

  const runVettingProcess = () => {
    const logs = [
      "[] Initializing runtime environment...",
      "[] Loading system kernels...",
      "[] Optimizing memory allocation...",
      "[] Establishing secure connection...",
      "[] System ready.",
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 800 + 400;
      setTimeout(() => {
        setVettingLogs((prev) => [...prev, { msg: log, status: 'success' }]);
        
        if (index === logs.length - 1) {
          setTimeout(() => {
            setStep("approved");
            setTimeout(() => {
                window.open("https://www.linkedin.com/company/team-xebec/", "_blank");
            }, 2000);
          }, 1000);
        }
      }, delay);
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      <div className="relative z-10 border-t border-b border-border bg-background/50 backdrop-blur-sm py-24">
        <div className="max-w-4xl mx-auto px-6">
            
            <AnimatePresence mode="wait">
                {step === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center md:text-left"
                    >
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-none">
                                    DEPLOY YOUR <br/>
                                    <span className="text-muted-foreground">INTELLIGENCE.</span>
                                </h2>
                                <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-xl leading-relaxed mb-8">
                                    We don't hire. We recruit system architects to build the next generation of autonomous infrastructure through open source contributions.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setStep("form")}
                                        className="group h-14 px-8 bg-foreground text-background text-lg font-medium tracking-tight flex items-center justify-center gap-3 hover:bg-neutral-200 transition-colors"
                                    >
                                        Initialize Protocol
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="h-14 px-6 border border-border flex items-center gap-3 text-sm text-muted-foreground font-mono bg-muted/5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        RECRUITMENT: OPEN
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Agents/Skills visual */}
                            <div className="hidden md:grid grid-cols-2 gap-4 opacity-50 select-none pointer-events-none">
                                <SkillCard icon={<Cpu />} label="System Design" />
                                <SkillCard icon={<Network />} label="Distributed Logic" />
                                <SkillCard icon={<Zap />} label="Low Latency" />
                                <SkillCard icon={<Terminal />} label="Automation" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-xl mx-auto"
                    >
                         <h3 className="text-3xl font-bold tracking-tight mb-8 text-center">Candidate Parameters</h3>
                         <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="group relative">
                                <input
                                    id="name"
                                    required
                                    className="peer w-full bg-transparent border-b border-border py-4 text-xl md:text-2xl focus:outline-none focus:border-foreground transition-colors placeholder:text-transparent"
                                    placeholder="Name"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <label htmlFor="name" className="absolute left-0 top-4 text-xl md:text-2xl text-muted-foreground/50 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-muted-foreground peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-muted-foreground pointer-events-none uppercase tracking-wider">
                                    Codename / Identity
                                </label>
                            </div>

                            <div className="group relative">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="peer w-full bg-transparent border-b border-border py-4 text-xl md:text-2xl focus:outline-none focus:border-foreground transition-colors placeholder:text-transparent"
                                    placeholder="Email"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <label htmlFor="email" className="absolute left-0 top-4 text-xl md:text-2xl text-muted-foreground/50 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-muted-foreground peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-muted-foreground pointer-events-none uppercase tracking-wider">
                                     Email
                                </label>
                            </div>

                            <div className="group relative">
                                <input
                                    id="github"
                                    required
                                    className="peer w-full bg-transparent border-b border-border py-4 text-xl md:text-2xl focus:outline-none focus:border-foreground transition-colors placeholder:text-transparent"
                                    placeholder="GitHub"
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                />
                                <label htmlFor="github" className="absolute left-0 top-4 text-xl md:text-2xl text-muted-foreground/50 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-muted-foreground peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-muted-foreground pointer-events-none uppercase tracking-wider">
                                    GitHub Frequency Source
                                </label>
                            </div>

                            <div className="pt-4">
                                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Select Core Competency</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button type="button" onClick={() => setFormData({...formData, specialization: 'systems'})} className={clsx("p-4 border text-left hover:bg-muted/10 transition-colors", formData.specialization === 'systems' ? 'border-foreground bg-muted/10' : 'border-border')}>
                                        <div className="font-mono text-sm mb-1">SYS.ARCH</div>
                                        <div className="text-xs text-muted-foreground">Systems Architecture</div>
                                    </button>
                                    <button type="button" onClick={() => setFormData({...formData, specialization: 'ai'})} className={clsx("p-4 border text-left hover:bg-muted/10 transition-colors", formData.specialization === 'ai' ? 'border-foreground bg-muted/10' : 'border-border')}>
                                        <div className="font-mono text-sm mb-1">AI.AGENT</div>
                                        <div className="text-xs text-muted-foreground">Autonomous Agents</div>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="pt-8 flex justify-between items-center">
                                <button type="button" onClick={() => setStep("idle")} className="text-sm text-muted-foreground hover:text-foreground">
                                    Cancel
                                </button>
                                <button type="submit" className="h-12 px-8 bg-foreground text-background font-medium hover:bg-neutral-200 transition-colors">
                                    Initiate Scan
                                </button>
                            </div>
                         </form>
                    </motion.div>
                )}

                {step === "vetting" && (
                    <motion.div
                        key="vetting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-2xl mx-auto font-mono text-sm md:text-base space-y-2"
                    >
                         <div className="mb-8 flex items-center gap-3 text-muted-foreground border-b border-border pb-4">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            ANALYZING SYSTEM COMPATIBILITY...
                         </div>
                         <div className="space-y-1">
                            {vettingLogs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="text-green-500">➜</span>
                                    <span className="text-foreground/80">{log.msg}</span>
                                </motion.div>
                            ))}
                         </div>
                    </motion.div>
                )}

                {step === "approved" && (
                     <motion.div
                        key="approved"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-center py-12"
                    >
                         <div className="w-24 h-24 border border-green-500/30 rounded-full flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse" />
                            <Check className="w-10 h-10 text-green-500" />
                         </div>
                         <h3 className="text-4xl font-bold tracking-tight mb-4">Protocol Accepted.</h3>
                         <p className="text-muted-foreground max-w-md mb-8 text-lg">
                            Redirecting to secure channel for final onboarding...
                         </p>
                         <Loader2 className="w-6 h-6 animate-spin text-muted-foreground/50" />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

function SkillCard({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="p-4 border border-border/40 flex items-center gap-3 text-muted-foreground/40">
            {icon}
            <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
        </div>
    )
}
