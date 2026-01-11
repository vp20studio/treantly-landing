import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import ValueComparison from "@/components/ValueComparison";
import CalendlySection from "@/components/CalendlySection";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HireNow() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
        <HowItWorks />
        <ValueComparison />
        <CalendlySection />
        <CaseStudies />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
