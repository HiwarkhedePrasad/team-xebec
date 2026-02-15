"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Terminal, Cpu, Database } from "lucide-react";

export function DemoPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const runDemo = () => {
    setIsRunning(true);
    setOutput([]);
    setLogs([]);

    const steps = [
      { type: "log", content: "Initializing inference engine..." },
      { type: "log", content: "Loading vector index shard-04..." },
      { type: "text", content: "Analyzing" },
      { type: "text", content: " system" },
      { type: "text", content: " architecture" },
      { type: "text", content: " patterns..." },
      { type: "log", content: "Retrieving context from knowledge base..." },
      { type: "text", content: "\nDetected" },
      { type: "text", content: " bottleneck" },
      { type: "text", content: " in" },
      { type: "text", content: " data" },
      { type: "text", content: " pipeline." },
      { type: "log", content: "Optimizing query execution plan..." },
      { type: "text", content: "\nSuggestion:" },
      { type: "text", content: " Implement" },
      { type: "text", content: " zero-copy" },
      { type: "text", content: " deserialization." },
    ];

    let delay = 0;
    steps.forEach((step, i) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        if (step.type === "log") {
          setLogs((prev) => [...prev, step.content]);
        } else {
          setOutput((prev) => [...prev, step.content]);
        }
        if (i === steps.length - 1) setIsRunning(false);
      }, delay);
    });
  };

  return (
    <div className="border border-border bg-background rounded-md overflow-hidden flex flex-col md:flex-row h-[400px] shadow-sm">
      {/* Left Interface: Prompt Editor */}
      <div className="w-full md:w-1/2 border-r border-border p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Input Buffer
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-amber-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
          </div>
        </div>
        <textarea
          className="flex-1 bg-transparent border-none resize-none focus:outline-none font-mono text-sm text-foreground/80 placeholder:text-muted-foreground/40"
          placeholder="// Enter system query...
Analyze current runtime performance and suggest optimizations for high-throughput data processing."
          defaultValue="// Enter system query...
Analyze current runtime performance and suggest optimizations for high-throughput data processing."
        />
        <button
          onClick={!isRunning ? runDemo : undefined}
          disabled={isRunning}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <>
              <Square className="w-4 h-4 fill-current" /> Processing
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Execute
            </>
          )}
        </button>
      </div>

      {/* Right Interface: Streamed Output */}
      <div className="w-full md:w-1/2 bg-muted/5 p-6 font-mono text-sm flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            System Output
          </div>
          {isRunning && (
            <div className="flex items-center gap-2 text-[10px] text-accent-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              STREAMING
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={`log-${i}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-muted-foreground/60 text-xs flex items-center gap-2 pl-2 border-l-2 border-muted"
              >
                <Database className="w-3 h-3" />
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div className="text-foreground/90 whitespace-pre-wrap">
            {output.map((chunk, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {chunk}
              </motion.span>
            ))}
            {isRunning && (
              <span className="inline-block w-2 h-4 bg-foreground/50 align-middle ml-1 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
