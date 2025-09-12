import React from "react";
import { Megaphone, Search, Handshake, Users } from "lucide-react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Megaphone className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Post What You Have",
      description: "List your products easily and reach people looking for them.",
    },
    {
      icon: <Search className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Discover What You Need",
      description: "Search and request items you want to buy, from gadgets to daily essentials.",
    },
    {
      icon: <Handshake className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Direct Connection",
      description: "When a seller accepts your request, connect directly and finalize the deal.",
    },
    {
      icon: <Users className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Community Driven",
      description: "Built for people-to-people trade, no middlemen or hidden fees.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-lg rotate-45"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
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
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">A Marketplace Built for You</h2>
          <p className="text-sm md:text-base text-blue-200 max-w-2xl mx-auto">Simple, direct, and community-driven trading for everyone.</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/40 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="p-2 bg-blue-900/30 rounded-full group-hover:bg-gradient-to-r from-blue-600 to-cyan-600 transition-colors duration-300">
                  <div className="text-cyan-300 group-hover:text-white transition-colors duration-300">{feature.icon}</div>
                </div>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white text-center mb-2">{feature.title}</h3>
              <p className="text-blue-200/90 text-center text-xs md:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
