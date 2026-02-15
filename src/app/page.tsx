"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Network, 
  Terminal as TerminalIcon, 
  Zap, 
  Beaker,
  Github,
  Mail,
  FileText
} from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Terminal } from "@/components/ui/Terminal";
import { Grid } from "@/components/ui/Grid";
import { ProjectItem } from "@/components/ui/ProjectItem";
import { DemoPanel } from "@/components/ui/DemoPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
      
      {/* 1. Hero Section */}
      <Section className="min-h-[80vh] flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-6">
              Engineering <br/>
              <span className="text-muted-foreground">intelligent software systems.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-lg mb-8 leading-relaxed">
              Team Xebec builds infrastructure, tooling, and applied AI systems focused on performance, architecture, and real-world reliability.
            </p>
            <div className="flex gap-4">
              {/* No CTA, credibility first */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Systems Operational
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-end"
          >
            <Terminal />
          </motion.div>
        </div>
      </Section>

      {/* 2. Capabilities */}
      <Section>
        <div className="mb-12 border-b border-border pb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Capabilities</h2>
        </div>
        <Grid cols={3}>
          <Capability 
            icon={<Network className="w-5 h-5"/>}
            title="Systems Architecture"
            description="Runtime overhead analysis, memory usage patterns, and native vs web execution tradeoffs."
          />
          <Capability 
            icon={<Cpu className="w-5 h-5"/>}
            title="AI Agents & Automation"
            description="System integration over model usage. Autonomous workflows, behavior automation, and human-AI loops."
          />
          <Capability 
            icon={<TerminalIcon className="w-5 h-5"/>}
            title="Developer Tooling"
            description="CLI tools, memory visualizers, and experimental build systems for modern engineering teams."
          />
          <Capability 
            icon={<Zap className="w-5 h-5"/>}
            title="Performance Engineering"
            description="Low-overhead software approaches. We prioritize understanding constraints over convenience."
          />
          <Capability 
            icon={<Beaker className="w-5 h-5"/>}
            title="Research Prototypes"
            description="Rapid iteration to answer technical questions about software behavior and limits."
          />
        </Grid>
      </Section>

      {/* 4. Engineering Philosophy (Moved up as it builds trust) */}
      <Section className="bg-muted/5">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Philosophy</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We treat software as a system, not a feature. Projects begin as questions rather than product ideas, and development is treated as an investigation process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-accent-foreground">→</span> Reasoning over frameworks
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-foreground">→</span> Constraints over convenience
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-foreground">→</span> Understanding over speed
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-foreground">→</span> Experiments over assumptions
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground space-y-4 font-mono border-l border-border pl-6">
            <p>
              "The objective is to learn how software behaves under real conditions — memory usage, execution flow, user interaction, automation behavior, and architecture limits."
            </p>
            <p className="pt-4">
              — Team Xebec Manifesto
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Projects */}
      <Section>
        <div className="mb-12 border-b border-border pb-4 flex justify-between items-end">
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Engineering Logs / Projects</h2>
          <span className="text-xs font-mono text-muted-foreground">INDEX-2026</span>
        </div>
        <div className="space-y-0">
          <ProjectItem 
            name="GhostFence"
            description="AI Phishing Detection System focusing on intent understanding rather than keywords."
            stack={["Python", "LLM Integration", "Trust Analysis"]}
            challenge="Building a system that understands manipulative intent in secure communications."
            href="#"
          />
          <ProjectItem 
            name="ByteWise"
            description="Memory Layout Visualizer showing padding, alignment, and wasted memory."
            stack={["C++", "Visualization", "Compiler Internals"]}
            challenge="Visualizing invisible compiler optimization decisions for educational purposes."
            href="#"
          />
          <ProjectItem 
            name="LinkedIn Automator"
            description="System that reads conversations and responds intelligently using simulated human behavior."
            stack={["Puppeteer", "AI Agents", "Behavior Modelling"]}
            challenge="At what point does automation represent the user authentically?"
            href="#"
          />
           <ProjectItem 
            name="Local AI Assistant"
            description="On-device language model execution for mobile hardware."
            stack={["Mobile Systems", "Edge AI", "Latency Optimization"]}
            challenge="Balancing resource usage and response latency on constrained devices."
            href="#"
          />
           <ProjectItem 
            name="DocuUnderstand"
            description="Extracting structured information from unstructured PDFs using layout semantics."
            stack={["Computer Vision", "NLP", "Structured Data"]}
            challenge="Going beyond OCR to understand spatial and semantic layout of documents."
            href="#"
          />
        </div>
      </Section>

      {/* 5. Interactive Demo */}
      <Section>
         <div className="mb-8 border-b border-border pb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Live Inference Demo</h2>
        </div>
        <DemoPanel />
      </Section>

      {/* 6. About */}
      <Section className="border-t border-border mt-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-2">Team Xebec</h3>
            <p className="text-sm text-muted-foreground">Student Engineering Collective</p>
          </div>
          <div className="md:col-span-2 text-sm text-muted-foreground leading-relaxed">
            <p className="mb-4">
              Team Xebec is a student-driven engineering group that builds experimental software systems through hackathons, research projects, and architectural explorations.
            </p>
            <p>
              We prioritize native performance and deep understanding of system internals.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Core Member</h4>
            <div className="space-y-2">
              <div className="text-sm font-medium">Prasad Hiwarkhede</div>
              <div className="text-xs text-muted-foreground">Systems & AI Developer</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-muted-foreground font-mono">
            © 2026 Team Xebec. All systems nominal.
          </div>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" /> Docs
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Capability({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-6 border border-border/50 hover:border-foreground/20 hover:bg-muted/5 transition-all rounded-sm">
      <div className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}