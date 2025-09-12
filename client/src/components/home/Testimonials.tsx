import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: "I found a second-hand phone in just 2 days through the platform.",
      author: "Ramesh",
      rating: 5,
    },
    {
      text: "Posting my old furniture was so simple, and I got messages quickly.",
      author: "Aditi",
      rating: 4,
    },
    {
      text: "Finally, a marketplace where I can connect directly with real buyers.",
      author: "Saurav",
      rating: 5,
    },
    {
      text: "Super easy to use, I sold my bike in less than a week.",
      author: "Priya",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-500"}`} />
    ));
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-12 left-10% w-40 h-40 bg-blue-500/10 rounded-full"></div>
        <div className="absolute bottom-12 right-15% w-32 h-32 bg-cyan-400/15 rounded-lg rotate-45"></div>
        <div className="absolute inset-0 opacity-20">
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
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">What Our Users Say</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="relative max-w-3xl mx-auto" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-3">
                  <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-blue-800/30 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center text-center">
                    <div className="mb-4 p-2 bg-blue-900/30 rounded-full text-cyan-300">
                      <Quote className="w-5 h-5 md:w-6 md:h-6" />
                    </div>

                    <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                    <blockquote className="text-sm md:text-base text-blue-100/90 italic mb-4">"{testimonial.text}"</blockquote>

                    <div className="text-cyan-300 font-medium text-sm md:text-base">– {testimonial.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 bg-slate-800/70 backdrop-blur-sm rounded-full p-2 border border-blue-800/30 hover:border-blue-500/50 text-cyan-300 hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 bg-slate-800/70 backdrop-blur-sm rounded-full p-2 border border-blue-800/30 hover:border-blue-500/50 text-cyan-300 hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-cyan-400 scale-125" : "bg-blue-700 hover:bg-blue-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
