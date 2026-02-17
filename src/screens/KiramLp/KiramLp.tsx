import { CalculatorSection } from "./sections/CalculatorSection/CalculatorSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FAQSection } from "./sections/FAQSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { NavbarSection } from "./sections/NavbarSection";
import { UserTypeInfoSection } from "./sections/UserTypeInfoSection";

export const KiramLp = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-[#f6f6f9]">
      <NavbarSection />
      <main>
        <HeroSection />
        <CalculatorSection />
        <UserTypeInfoSection />
        <HowItWorksSection />
        <FAQSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>
      <FooterSection />
    </div>
  );
};
