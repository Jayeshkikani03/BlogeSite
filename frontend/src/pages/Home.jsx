
import HeroSection from '../components/sections/HeroSection';
import TrustedBySection from '../components/sections/TrustedBySection';
import FeaturesSection from '../components/sections/FeaturesSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import StatisticsSection from '../components/sections/StatisticsSection';
import PricingSection from '../components/sections/PricingSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FaqSection from '../components/sections/FaqSection';
import CallToActionSection from '../components/sections/CallToActionSection';
import ContactSection from '../components/sections/ContactSection';

/**
 * Home View displaying all structured SaaS landing page components.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <BenefitsSection />
      <StatisticsSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CallToActionSection />
      <ContactSection />
    </>
  );
}
