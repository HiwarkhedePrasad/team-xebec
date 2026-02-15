"use client";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export function TldrawCanvas() {
  return (
    <div className="w-full h-[calc(100vh-12rem)] relative border border-white/5 rounded-xl overflow-hidden shadow-2xl shadow-black/50 bg-zinc-950">
      <Tldraw 
        persistenceKey="xebec-ideas-v1"
        hideUi={false} 
      />
    </div>
  );
}
