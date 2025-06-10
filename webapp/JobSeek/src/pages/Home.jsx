import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import CTA from "../components/CTA"
import Footer from "../components/Footer"

function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}

export default Home