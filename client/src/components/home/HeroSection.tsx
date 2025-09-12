import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const words: string[] = ["Connect", "Buy", "Sell"];

export const HeroSection: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full  h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-48 h-48 bg-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 bg-cyan-400/10 rounded-lg rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-32 h-32 bg-sky-500/15 rounded-full"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-base md:text-lg text-blue-300 font-semibold mb-2 tracking-wider">Buy and Sell in Your Community</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-4"></div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          <span className="block mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 font-extrabold">
            Your Community Marketplace to
          </span>
          <span className="inline-block min-h-[1.2em] text-center relative">
            {words.map((word, index) => (
              <span
                key={index}
                className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                  index === currentWordIndex
                    ? "opacity-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-lg"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-semibold">
          The seamless way to buy and sell within your community
          <span className="block mt-1 text-cyan-200 font-medium">No fees, no hassle.</span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer group overflow-hidden"
          >
            <span className="relative z-10 text-sm md:text-base">Browse Listings</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/5 transition-all duration-500"></div>
          </Link>

          <Link
            to="/sell"
            className="relative px-6 py-3 rounded-full border-2 border-blue-400/40 text-white font-semibold hover:border-blue-400/70 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer group overflow-hidden backdrop-blur-sm text-sm md:text-base"
          >
            <span className="relative z-10">Sell Your Product</span>
            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/15 transition-all duration-500"></div>
          </Link>
        </div>
        <div className="mt-12">
          <div className="w-5 h-8 border-2 border-blue-400/30 rounded-full flex justify-center mx-auto">
            <div className="w-1 h-2 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-blue-300/70 text-xs mt-1">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};
