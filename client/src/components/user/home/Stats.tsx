import React from "react";
import { Users, Package, Grid, TrendingUp } from "lucide-react";

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      value: "5,000+",
      label: "Active Users",
      iconColor: "text-blue-400",
    },
    {
      icon: <Package className="w-5 h-5 md:w-6 md:h-6" />,
      value: "20,000+",
      label: "Products Listed",
      iconColor: "text-purple-400",
    },
    {
      icon: <Grid className="w-5 h-5 md:w-6 md:h-6" />,
      value: "50+",
      label: "Categories",
      iconColor: "text-amber-400",
    },
    {
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      value: "10,000+",
      label: "Products Sold",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-lg rotate-45"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
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
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Trusted by Our Growing Community</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-slate-800/40 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="p-2 bg-blue-900/30 rounded-full mb-3 text-cyan-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:text-white transition-colors duration-300">
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>

              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>

              <div className="text-blue-200/90 text-xs md:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
