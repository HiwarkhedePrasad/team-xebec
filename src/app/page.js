export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)'
        }}></div>
      </div>

      {/* Animated Dots */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-white rounded-full animate-pulse delay-100"></div>
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>

      {/* Main Content */}
      <div className="z-10 text-center px-6 max-w-5xl">
        {/* Logo/Team Name */}
        <h1 className="text-7xl md:text-9xl font-bold tracking-wider mb-6 animate-fadeIn" 
            style={{ fontFamily: 'Georgia, serif' }}>
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            XEBEC
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-12 space-y-4">
          <p className="text-xl md:text-3xl font-light tracking-widest text-gray-300 animate-fadeIn delay-100">
            TEAM UNDER CONSTRUCTION
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white"></div>
            <p className="text-lg md:text-2xl font-light tracking-widest text-white animate-fadeIn delay-200">
              WE'LL BE LIVE SOON
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed animate-fadeIn delay-300">
          Something extraordinary is in the making. Our team is crafting an experience 
          that will redefine excellence. Stay tuned for the unveiling.
        </p>

        {/* Loading Animation */}
        <div className="flex items-center justify-center gap-2 animate-fadeIn delay-400">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      <style jsx>{`
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

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.2s;
        }

        .delay-200 {
          animation-delay: 0.4s;
        }

        .delay-300 {
          animation-delay: 0.6s;
        }

        .delay-400 {
          animation-delay: 0.8s;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}