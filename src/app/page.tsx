import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Problem from '@/components/landing/Problem'
import HowItWorks from '@/components/landing/HowItWorks'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Footer />
    </main>
  )
}
