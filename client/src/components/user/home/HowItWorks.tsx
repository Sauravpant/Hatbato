import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { UserPlus, ShoppingCart, Handshake } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Create a Free Account",
      description: "Join the community and set up your profile.",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Post or Request Products",
      description: "Share what you're selling or request what you're looking for.",
    },
    {
      icon: <Handshake className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Connect & Deal Directly",
      description: "If the seller accepts, chat and arrange the exchange on your own terms.",
    },
  ];

  const [animatedSteps, setAnimatedSteps] = useState([false, false, false]);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timer1 = setTimeout(() => {
        setAnimatedSteps([true, false, false]);
      }, 100);

      const timer2 = setTimeout(() => {
        setAnimatedSteps([true, true, false]);
      }, 300);

      const timer3 = setTimeout(() => {
        setAnimatedSteps([true, true, true]);
      }, 500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [inView]);

  return (
    <section ref={ref} className="w-full py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-12 left-10 md:left-16 w-32 h-32 bg-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-12 right-10 md:right-16 w-28 h-28 bg-cyan-400/10 rounded-lg rotate-45"></div>
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
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Buy & Sell in 3 Simple Steps</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-5 md:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center bg-slate-800/40 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-blue-800/30 transition-all duration-700 relative ${
                animatedSteps[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm mb-3">
                {index + 1}
              </div>

              <div className="p-2 bg-blue-900/30 rounded-full mb-3 text-cyan-300">{step.icon}</div>

              <h3 className="text-base md:text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-blue-200/90 text-xs md:text-sm">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 left-auto w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform translate-x-6 -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
