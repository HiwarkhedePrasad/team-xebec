"use client";

import { motion } from "framer-motion";
import { 
  Network, 
  Terminal as TerminalIcon, 
  Zap, 
  Cpu,
  Github,
  Mail,
  Linkedin,
  Activity,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { PerspectiveStack } from "@/components/ui/PerspectiveStack";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { SpecSheet } from "@/components/ui/SpecSheet";
import { JoinForm } from "@/components/ui/JoinForm";
import { AwardsSection } from "@/components/ui/AwardsSection";
import { TeamSection } from "@/components/ui/TeamSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
      
      {/* NAVBAR */}
      <Navbar />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHASE 1: THE HOOK (HERO)                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="mission-control" className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 py-32 overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.07] blur-[120px] animate-gradient-shift pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px] animate-gradient-shift pointer-events-none" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left: Narrative */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
            >
                <div className="flex items-center gap-3 mb-8">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80">
                        System Status: Online
                    </span>
                </div>
                
                <h1 className="text-[clamp(3rem,6vw+1rem,5rem)] font-semibold tracking-[-0.03em] leading-[1.05] mb-8">
                    <span className="gradient-text">The new standard</span> for{" "}
                    <span className="text-foreground">intelligent software systems.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10">
                    Team Xebec builds infrastructure, tooling, and applied AI systems focused on performance, architecture, and real-world reliability.
                </p>

                <div className="flex flex-wrap gap-3">
                    {["SYSTEMS_ARCH", "AGENTIC_AI", "LOW_LATENCY", "OPEN_SOURCE"].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 border border-border/50 bg-white/[0.02] rounded-full text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 cursor-default">
                        {tag}
                      </span>
                    ))}
                </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center md:justify-end"
            >
                <PerspectiveStack />
            </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHASE 2: THE MECHANISM (SYSTEM ARCHITECTURE)           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="architecture" className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
             <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">System Architecture</h2>
             <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground/80 max-w-2xl">
                We engineer across the full stack of modern intelligence, from bare-metal optimization to cognitive agent workflows.
             </p>
        </motion.div>
        
        <BentoGrid>
            <BentoCard 
                colSpan={2}
                title="Intelligence Layer"
                subtitle="Autonomous Agents"
                icon={<Cpu className="w-5 h-5"/>}
            >
                Building self-reasoning agent swarms capable of complex task execution. 
                Focusing on <span className="text-foreground">GhostFence</span> and <span className="text-foreground">Jassos</span> for security and automation.
            </BentoCard>
            
            <BentoCard 
                title="Infrastructure"
                subtitle="Low-Level"
                icon={<Zap className="w-5 h-5"/>}
            >
                Runtime analysis and memory optimization. See <span className="text-foreground">ByteWise</span>.
            </BentoCard>

             <BentoCard 
                title="Human-Mimetic Interface"
                subtitle="Simulation"
                icon={<Activity className="w-5 h-5"/>}
            >
                Systems that understand and replicate human behavior patterns.
            </BentoCard>

            <BentoCard 
                colSpan={2}
                title="Applied Research"
                subtitle="Innovation Lab"
                icon={<Network className="w-5 h-5"/>}
            >
               Continually iterating on novel architectures. Winners of Smart India Hackathon 2025.
               Active research into digital-physical bridging systems.
            </BentoCard>
        </BentoGrid>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHASE 3: AWARDS & RECOGNITION                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div id="awards">
        <AwardsSection />
      </div>


      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHASE 4: THE PROOF (ENGINEERING LOGS)                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="projects" className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-24 flex items-end justify-between"
         >
             <div>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">Engineering Logs</h2>
                <p className="text-3xl font-medium tracking-tight text-foreground/80">
                    System Modules & Deployed Code
                </p>
             </div>
             <div className="hidden md:block text-xs font-mono text-muted-foreground">
                INDEX_V.2.0.4
             </div>
        </motion.div>

        <div className="space-y-0 border-b border-border">
            <SpecSheet 
                id="MOD_01"
                name="GhostFence"
                role="Intent Analysis Engine"
                stack={["Python", "LLM", "Security"]}
                status="active"
                github="https://github.com/HiwarkhedePrasad/GhostFence"
            />
            <SpecSheet 
                id="MOD_02"
                name="ByteWise"
                role="Memory Layout Visualizer"
                stack={["C++", "Compiler Tech", "WASM"]}
                status="active"
                github="https://github.com/HiwarkhedePrasad/ByteWise"
            />
            <SpecSheet 
                id="MOD_03"
                name="DocuUnderstand"
                role="Spatial Semantic Extraction"
                stack={["Vision", "NLP", "RAG"]}
                status="active"
                github="https://github.com/HiwarkhedePrasad/DocuUnderstand"
            />
            <SpecSheet 
                id="MOD_04"
                name="LinkedIn Automator"
                role="Behavioral Simulation"
                stack={["Puppeteer", "Heuristic Logic"]}
                status="in-progress"
                github="https://github.com/HiwarkhedePrasad/LinkedIn-Automator"
            />
             <SpecSheet 
                id="MOD_05"
                name="Local AI"
                role="Edge Inference Optimization"
                stack={["ONNX", "Mobile", "Performance"]}
                status="in-progress"
                github="https://github.com/HiwarkhedePrasad/Local-AI"
            />
        </div>
        
        <div className="mt-12 text-center">
             <Link href="https://github.com/HiwarkhedePrasad" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-500/40 pb-1">
                <TerminalIcon className="w-4 h-4"/> VIEW_ALL_REPOSITORIES
                <ExternalLink className="w-3 h-3 opacity-50" />
             </Link>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHASE 5: THE ENGINEERS (TEAM)                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div id="team">
        <TeamSection />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHASE 6: THE ACTION (RECRUITMENT)                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="join" className="py-32 relative overflow-hidden">
         <div className="max-w-4xl mx-auto relative z-10">
            <JoinForm />
         </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FOOTER                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <footer className="relative bg-background">
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm font-mono font-bold tracking-[0.15em] uppercase">XEBEC</span>
              </div>
              <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-xs">
                Building the next generation of intelligent software systems. Open source, performance-first, architecture-driven.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Navigate</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Architecture", href: "#architecture" },
                  { label: "Projects", href: "#projects" },
                  { label: "Team", href: "#team" },
                  { label: "Join Us", href: "#join" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors w-fit">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3: Connect */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Connect</h4>
              <div className="flex flex-col gap-3">
                <Link href="https://github.com/HiwarkhedePrasad" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-foreground transition-colors w-fit">
                  <Github className="w-4 h-4" /> GitHub
                </Link>
                <Link href="https://www.linkedin.com/company/team-xebec/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-foreground transition-colors w-fit">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Link>
                <Link href="mailto:contact@teamxebec.dev" className="flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-foreground transition-colors w-fit">
                  <Mail className="w-4 h-4" /> Contact
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs font-mono text-muted-foreground/30">
                © {new Date().getFullYear()} TEAM XEBEC LABS. All rights reserved.
            </div>
            <div className="text-xs font-mono text-muted-foreground/20">
                Engineered with precision.
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}