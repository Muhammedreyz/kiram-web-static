import { useState, useCallback } from "react";
import { CalculatorSection } from "./sections/CalculatorSection/CalculatorSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FAQSection } from "./sections/FAQSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { NavbarSection } from "./sections/NavbarSection";
import { ProblemSolutionSection } from "./sections/ProblemSolutionSection";
import { UserTypeInfoSection } from "./sections/UserTypeInfoSection";
import { EarlyAccessModal } from "../../components/EarlyAccessModal";

export const KiramLp = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className="flex flex-col w-full bg-[#f6f6f9]">
      <NavbarSection />
      <main>
        <HeroSection onOpenModal={openModal} />
        <ProblemSolutionSection />
        <CalculatorSection />
        <UserTypeInfoSection />
        <HowItWorksSection />
        <FAQSection />
        <FeaturesSection />
        <CallToActionSection onOpenModal={openModal} />
      </main>
      <FooterSection />
      <EarlyAccessModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};
