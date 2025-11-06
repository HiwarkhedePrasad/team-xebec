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
    
    // --- OPTIMIZATION 1: Pre-calculate squared distances ---
    const connectionDistance = 150;
    const connectionDistSq = connectionDistance * connectionDistance;
    const mouseMaxDist = connectionDistance * 1.5;
    const mouseMaxDistSq = mouseMaxDist * mouseMaxDist;

    // --- Star Class (Unchanged) ---
    class Star {
      constructor() {
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
      stars.push(new Star());
    }

    // --- OPTIMIZATION 2: Combined Event Handlers ---
    
    const showCursor = () => {
      cursor.style.opacity = '1';
    };
    const hideCursor = () => {
      cursor.style.opacity = '0';
    };

    // One handler for window mousemove
    const handleWindowMouseMove = (e) => {
      // Update star animation mouse coordinates
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update custom cursor position
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(-50%, -50%, 0)`;
    };
    
    // One handler for window mouseleave
    const handleWindowMouseLeave = () => {
      // Reset star animation mouse
      mouse.x = null;
      mouse.y = null;
      
      // Hide the custom cursor
      hideCursor();
    };

    // --- OPTIMIZATION 3: Add { passive: true } ---
    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleWindowMouseLeave, { passive: true });

    const textElements = document.querySelectorAll('.invert-hover');
    textElements.forEach((el) => {
      el.addEventListener('mouseenter', showCursor, { passive: true });
      el.addEventListener('mouseleave', hideCursor, { passive: true });
    });
    

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          
          // --- OPTIMIZATION 1: Use squared distance ---
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            // Calculate opacity based on squared distance (avoids sqrt)
            const opacity = 0.15 * (1 - distSq / connectionDistSq);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = stars[i].x - mouse.x;
          const dy = stars[i].y - mouse.y;
          
          // --- OPTIMIZATION 1: Use squared distance ---
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseMaxDistSq) {
            // Calculate opacity based on squared distance (avoids sqrt)
            const opacity = 0.3 * (1 - distSq / mouseMaxDistSq);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
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
    // Main wrapper (no cursor-none)
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      <div ref={cursorRef} className="custom-cursor" />

      {/* Main Content */}
      <div className="z-10 text-center px-6 max-w-5xl">
        {/* Add 'invert-hover' to all interactive text */}
        <h1 
          className="text-7xl md:text-9xl font-bold tracking-wider mb-6 opacity-0 invert-hover"
          // This is the line that was broken
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
            // This is the line that was broken
            style={{ animation: 'fadeIn 1s ease-out 0.2s forwards' }}
          >
            TEAM UNDER CONSTRUCTION
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
            <p 
              className="text-lg md:text-2xl font-light tracking-widest text-white opacity-0 invert-hover"
              // This is the line that was broken
              style={{ animation: 'fadeIn 1s ease-out 0.4s forwards' }}
            >
              WE'LL BE LIVE SOON
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
          </div>
        </div>
        <p 
          className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed opacity-0 invert-hover"
          // This is the line that was broken
          style={{ animation: 'fadeIn 1s ease-out 0.6s forwards' }}
        >
          Something extraordinary is in the making. Our team is crafting an experience 
          that will redefine excellence. Stay tuned for the unveiling.
        </p>
        <div 
          className="flex items-center justify-center gap-2 opacity-0"
          // This is the line that was broken
          style={{ animation: 'fadeIn 1s ease-out 0.8s forwards' }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

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
          
          /* --- OPTIMIZATION 4: Add will-change --- */
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