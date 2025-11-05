'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 150;
    const mouse = { x: null, y: null };
    const connectionDistance = 150;

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

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Draw connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = stars[i].x - mouse.x;
          const dy = stars[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance * 1.5) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / (connectionDistance * 1.5))})`;
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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <div className="z-10 text-center px-6 max-w-5xl">
        {/* Logo/Team Name */}
        <h1 
          className="text-7xl md:text-9xl font-bold tracking-wider mb-6 opacity-0"
          style={{ 
            fontFamily: 'Georgia, serif',
            animation: 'fadeIn 1s ease-out forwards'
          }}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            XEBEC
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-12 space-y-4">
          <p 
            className="text-xl md:text-3xl font-light tracking-widest text-gray-300 opacity-0"
            style={{ animation: 'fadeIn 1s ease-out 0.2s forwards' }}
          >
            TEAM UNDER CONSTRUCTION
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
            <p 
              className="text-lg md:text-2xl font-light tracking-widest text-white opacity-0"
              style={{ animation: 'fadeIn 1s ease-out 0.4s forwards' }}
            >
              WE'LL BE LIVE SOON
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed opacity-0"
          style={{ animation: 'fadeIn 1s ease-out 0.6s forwards' }}
        >
          Something extraordinary is in the making. Our team is crafting an experience 
          that will redefine excellence. Stay tuned for the unveiling.
        </p>

        {/* Loading Animation */}
        <div 
          className="flex items-center justify-center gap-2 opacity-0"
          style={{ animation: 'fadeIn 1s ease-out 0.8s forwards' }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
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