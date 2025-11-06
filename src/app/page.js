'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- Star & Animation Constants ---
    const stars = [];
    const numStars = 150;
    const mouse = { x: null, y: null };
    
    // Pre-calculate squared distances
    const connectionDistance = 150;
    const connectionDistSq = connectionDistance * connectionDistance;
    const mouseMaxDist = connectionDistance * 1.5;
    const mouseMaxDistSq = mouseMaxDist * mouseMaxDist;

    // --- Star Class (with new 'id' property) ---
    class Star {
      constructor(id) {
        this.id = id; // Unique ID to prevent double-checking
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numStars; i++) {
      stars.push(new Star(i)); // Pass in the ID
    }

    // --- OPTIMIZATION: Spatial Hash Grid ---
    class SpatialHashGrid {
      constructor(cellSize) {
        this.cellSize = cellSize;
        this.grid = new Map();
      }

      _getKey(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX},${cellY}`;
      }

      clear() {
        this.grid.clear();
      }

      insert(star) {
        const key = this._getKey(star.x, star.y);
        if (!this.grid.has(key)) {
          this.grid.set(key, []);
        }
        this.grid.get(key).push(star);
      }

      // Get all stars from the 9-cell area (self + 8 neighbors)
      getNearby(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        const nearbyStars = [];

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const key = `${cellX + i},${cellY + j}`;
            if (this.grid.has(key)) {
              nearbyStars.push(...this.grid.get(key));
            }
          }
        }
        return nearbyStars;
      }
    }

    // Create the grid instance. The cell size MUST be >= connectionDistance
    const grid = new SpatialHashGrid(connectionDistance);

    // --- Combined Event Handlers (Unchanged) ---
    const showCursor = () => { cursor.style.opacity = '1'; };
    const hideCursor = () => { cursor.style.opacity = '0'; };

    const handleWindowMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(-50%, -50%, 0)`;
    };
    
    const handleWindowMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      hideCursor();
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleWindowMouseLeave, { passive: true });

    const textElements = document.querySelectorAll('.invert-hover');
    textElements.forEach((el) => {
      el.addEventListener('mouseenter', showCursor, { passive: true });
      el.addEventListener('mouseleave', hideCursor, { passive: true });
    });
    

    // --- Main Animation Loop (Refactored) ---
    const animate = () => {
      // 1. Clear canvas and grid
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid.clear();

      // 2. Update, draw, and insert stars into the grid
      stars.forEach((star) => {
        star.update();
        star.draw();
        grid.insert(star);
      });

      // 3. Check Star-to-Star connections (O(n*k) - FAST)
      ctx.lineWidth = 0.5;
      stars.forEach((star) => {
        const neighbors = grid.getNearby(star.x, star.y);
        
        neighbors.forEach((neighbor) => {
          // Use ID check to ensure we only connect a pair once
          if (star.id < neighbor.id) {
            const dx = star.x - neighbor.x;
            const dy = star.y - neighbor.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectionDistSq) {
              const opacity = 0.15 * (1 - distSq / connectionDistSq);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(neighbor.x, neighbor.y);
              ctx.stroke();
            }
          }
        });
      });

      // 4. Check Star-to-Mouse connections (O(k) - FAST)
      if (mouse.x !== null && mouse.y !== null) {
        ctx.lineWidth = 1;
        // Get only stars near the mouse
        const nearbyStars = grid.getNearby(mouse.x, mouse.y);
        
        nearbyStars.forEach((star) => {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseMaxDistSq) {
            const opacity = 0.3 * (1 - distSq / mouseMaxDistSq);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup all listeners
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseleave', handleWindowMouseLeave);
      window.removeEventListener('resize', handleResize);
      
      textElements.forEach((el) => {
        el.removeEventListener('mouseenter', showCursor);
        el.removeEventListener('mouseleave', hideCursor);
      });
    };
  }, []);

  return (
    // Main wrapper
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      <div ref={cursorRef} className="custom-cursor" />

      {/* Main Content (Unchanged) */}
      <div className="z-10 text-center px-6 max-w-5xl">
        <h1 
          className="text-7xl md:text-9xl font-bold tracking-wider mb-6 opacity-0 invert-hover"
          style={{ 
            fontFamily: 'Georgia, serif',
            animation: 'fadeIn 1s ease-out forwards'
          }}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            XEBEC
          </span>
        </h1>
        <div className="mb-12 space-y-4">
          <p 
            className="text-xl md:text-3xl font-light tracking-widest text-gray-300 opacity-0 invert-hover"
            style={{ animation: 'fadeIn 1s ease-out 0.2s forwards' }}
          >
            TEAM UNDER CONSTRUCTION
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
            <p 
              className="text-lg md:text-2xl font-light tracking-widest text-white opacity-0 invert-hover"
              style={{ animation: 'fadeIn 1s ease-out 0.4s forwards' }}
            >
              WE'LL BE LIVE SOON
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
          </div>
        </div>
        <p 
          className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed opacity-0 invert-hover"
          style={{ animation: 'fadeIn 1s ease-out 0.6s forwards' }}
        >
          Something extraordinary is in the making. Our team is crafting an experience 
          that will redefine excellence. Stay tuned for the unveiling.
        </p>
        <div 
          className="flex items-center justify-center gap-2 opacity-0"
          style={{ animation: 'fadeIn 1s ease-out 0.8s forwards' }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* CSS (Unchanged) */}
      <style dangerouslySetInnerHTML={{__html: `
        .invert-hover:hover {
          cursor: none;
        }

        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px; 
          height: 32px;
          background-color: white; 
          border-radius: 50%;
          pointer-events: none; 
          z-index: 1000; 
          mix-blend-mode: difference; 
          opacity: 0; 
          transform: translate3d(0, 0, 0) translate3d(-50%, -50%, 0);
          transition: opacity 0.3s ease-out;
          will-change: transform;
        }
      
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </div>
  );
}