import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueComparison from "@/components/ValueComparison";
import HowItWorks from "@/components/HowItWorks";
import CalendlySection from "@/components/CalendlySection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HireNow() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueComparison />
        <HowItWorks />
        <CalendlySection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
