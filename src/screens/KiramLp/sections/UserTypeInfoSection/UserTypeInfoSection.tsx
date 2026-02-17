import { useRef, useState, useEffect, useCallback } from "react";
import nasilCalisir1 from "../../../../img/nasil-calisir-1.png";

const steps = [
  {
    number: 1,
    title: "Hesabini olustur, rolunu sec",
    description:
      "Ev sahibi / Kiraci / Emlak ofisi olarak kaydol. Profil bilgilerini tamamla ve sureci baslat.",
    highlight: "2 dakikada hazir.",
    image: nasilCalisir1,
  },
  {
    number: 2,
    title: "Kimligini dogrula ve guvenli eslestirme yap",
    description: "Kiminle sozlesme yaptigini bil.",
    image: nasilCalisir1,
  },
  {
    number: 3,
    title: "Dijital kira sozlesmesini olustur",
    description: "Sozlesme tek yerde, her an erisilebilir.",
    image: nasilCalisir1,
  },
  {
    number: 4,
    title: "Depozitonu guvenceye al",
    description: "Depozitoda seffaflik ve guven.",
    image: nasilCalisir1,
  },
  {
    number: 5,
    title: "Kira odemelerini otomatiklestir",
    description: "Takip yok, stres yok.",
    image: nasilCalisir1,
  },
  {
    number: 6,
    title: "Kira akisini yatirima bagla (opsiyonel)",
    description: "Kira gideri degil, finansal akis.",
    image: nasilCalisir1,
  },
  {
    number: 7,
    title: "Tum sureci raporla ve kayit altinda tut",
    description: "Kiralama surecleri tek panelde.",
    image: nasilCalisir1,
  },
];

export const UserTypeInfoSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const scrollableDistance = sectionHeight - viewportHeight;

    if (scrolled < 0 || scrollableDistance <= 0) {
      setActiveStep(0);
      return;
    }

    const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
    const step = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    setActiveStep(step);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      id="nasil-calisir"
      style={{ height: `${steps.length * 100}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col bg-white">
        <div className="flex flex-col items-center gap-2 w-full pt-8 sm:pt-12 pb-4 sm:pb-6 px-5">
          <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center leading-[1.25]">
            Nasil Calisir?
          </h2>
          <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-base sm:text-lg text-center leading-[27px]">
            3 Dakikada Kur, Kirani Akilli Yonet
          </p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-stretch max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-16 gap-8 lg:gap-16 pb-8">
          <div className="flex-shrink-0 flex items-center justify-center lg:w-[420px] xl:w-[460px]">
            <div className="relative w-[260px] sm:w-[320px] lg:w-full bg-[#F3F3F3] rounded-[48px] sm:rounded-[64px] p-4 sm:p-6 flex items-center justify-center">
              {steps.map((step, index) => (
                <img
                  key={index}
                  className={`${index === 0 ? "relative" : "absolute inset-0 p-4 sm:p-6"} w-full h-auto object-contain transition-all duration-700 ease-in-out ${
                    index === activeStep
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  alt={`Adim ${index + 1}: ${step.title}`}
                  src={step.image}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-0 overflow-y-auto lg:overflow-visible">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`py-3 sm:py-4 transition-all duration-500 ${
                  index === activeStep ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-500 [font-family:'Outfit',Helvetica] ${
                      index === activeStep
                        ? "bg-[#0056c7] text-white shadow-lg shadow-blue-200"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`[font-family:'Outfit',Helvetica] font-semibold text-base sm:text-lg leading-[1.3] mb-0.5 transition-colors duration-500 ${
                        index === activeStep ? "text-[#0b1f45]" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`[font-family:'Outfit',Helvetica] font-normal text-sm sm:text-base leading-[1.5] transition-colors duration-500 ${
                        index === activeStep ? "text-[#36466d]" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                    {step.highlight && (
                      <p
                        className={`[font-family:'Outfit',Helvetica] font-medium text-[#0056c7] text-sm sm:text-base leading-[22px] mt-1 transition-opacity duration-500 ${
                          index === activeStep ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {step.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
