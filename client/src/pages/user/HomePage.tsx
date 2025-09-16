import { FeaturesSection } from "@/components/user/home/FeaturesSection"
import { HeroSection } from "@/components/user/home/HeroSection"
import { HowItWorks } from "@/components/user/home/HowItWorks"
import { StatsSection } from "@/components/user/home/Stats"
import { TestimonialsSection } from "@/components/user/home/Testimonials"


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