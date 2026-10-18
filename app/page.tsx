import { Header, Footer } from "@/src/components/layout";
import { Hero } from "@/src/components/sections/Hero";
import { FeaturesBar } from "@/src/components/sections/FeaturesBar";
import { Services } from "@/src/components/sections/Services";
import { PromoBanner } from "@/src/components/sections/PromoBanner";
import { PopularServices } from "@/src/components/sections/PopularServices";
import { ServiceTypes } from "@/src/components/sections/ServiceTypes";
import { HowItWorks } from "@/src/components/sections/HowItWorks";
import { BecomeProvider } from "@/src/components/sections/BecomeProvider";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { FAQ } from "@/src/components/sections/FAQ";
import { CTABanner } from "@/src/components/sections/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturesBar />
        <Services />
        <PromoBanner
          title="Get 20% OFF Beauty Services"
          description="Pamper yourself at home with professional facial, skincare, and beauty treatments."
          buttonText="Book Now"
          backgroundImage="/images/beauty-promo-bg.png"
        />
        <PopularServices />
        <ServiceTypes />
        <HowItWorks />
        <BecomeProvider />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
