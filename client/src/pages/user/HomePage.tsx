import { FeaturesSection } from "@/components/home/FeaturesSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowItWorks } from "@/components/home/HowItWorks"
import { StatsSection } from "@/components/home/Stats"
import { TestimonialsSection } from "@/components/home/Testimonials"


const HomePage = () => {
  return (
   <main className="relative">
   <HeroSection/>
   <FeaturesSection/>
   <HowItWorks/>
   <StatsSection/>
   <TestimonialsSection/>
   </main>
  )
}

export default HomePage