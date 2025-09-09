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
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full "></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-400/10 rounded-lg rotate-45 "></div>
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-40 h-40 bg-sky-500/15 rounded-full"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `${3 + Math.random() * 4}s infinite`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-lg md:text-xl text-blue-300 font-light mb-2 tracking-wider">Buy and Sell in Your Community</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-6"></div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          <span className="block mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 font-extrabold">
            Your Community Marketplace to
          </span>
          <span className="inline-block min-h-[1.5em] text-center relative">
            {words.map((word, index) => (
              <span
                key={index}
                className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                  index === currentWordIndex
                    ? "opacity-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-lg"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-light">
          The seamless way to buy and sell within your community
          <span className="block mt-2 text-cyan-200 font-medium">No fees, no hassle.</span>
        </p>
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/products"
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer group overflow-hidden"
          >
            <span className="relative z-10">Browse Listings</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/5 transition-all duration-500"></div>
          </Link>

          <Link
            to="/sell"
            className="relative px-8 py-4 rounded-full border-2 border-blue-400/40 text-white font-semibold hover:border-blue-400/70 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer group overflow-hidden backdrop-blur-sm"
          >
            <span className="relative z-10">Sell Your Product</span>
            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/15 transition-all duration-500"></div>
          </Link>
        </div>
        <div className="mt-16">
          <div className="w-6 h-10 border-2 border-blue-400/30 rounded-full flex justify-center mx-auto">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-blue-300/70 text-sm mt-2">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};
