import { useRef, useState, useEffect, useCallback, useMemo } from "react";
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
  const stepsListRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const direction = useMemo(() => (activeStep >= prevStep ? 1 : -1), [activeStep, prevStep]);

  const scrollActiveIntoView = useCallback((index: number) => {
    const el = stepRefs.current[index];
    const container = stepsListRef.current;
    if (!el || !container) return;

    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.top - containerRect.top - containerRect.height / 2 + elRect.height / 2;
    container.scrollBy({ top: offset, behavior: "smooth" });
  }, []);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep((prev) => {
      setPrevStep(prev);
      return index;
    });
    setUserClicked(true);
    scrollActiveIntoView(index);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setUserClicked(false);
    }, 2000);
  }, [scrollActiveIntoView]);

  const handleScroll = useCallback(() => {
    if (userClicked) return;

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
    const newStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

    setActiveStep((prev) => {
      if (prev !== newStep) {
        setPrevStep(prev);
        requestAnimationFrame(() => scrollActiveIntoView(newStep));
      }
      return newStep;
    });
  }, [userClicked, scrollActiveIntoView]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nasil-calisir"
      style={{ height: `${steps.length * 100}vh` }}
      className="relative w-full"
      aria-label="Nasil calisir adimlari"
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

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-center lg:items-stretch max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-16 gap-6 lg:gap-16 pb-6 sm:pb-8">
          <div className="flex-shrink-0 flex items-center justify-center lg:w-[420px] xl:w-[460px]">
            <div className="relative w-[220px] sm:w-[280px] lg:w-full bg-[#F3F3F3] rounded-[40px] sm:rounded-[48px] lg:rounded-[64px] p-3 sm:p-4 lg:p-6 flex items-center justify-center overflow-hidden">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isExiting = index === prevStep && index !== activeStep;

                let transform = "translateY(40px) scale(0.97)";
                let opacity = "0";
                let filter = "blur(4px)";

                if (isActive) {
                  transform = "translateY(0) scale(1)";
                  opacity = "1";
                  filter = "blur(0px)";
                } else if (isExiting) {
                  transform = `translateY(${direction > 0 ? "-30px" : "30px"}) scale(0.97)`;
                  opacity = "0";
                  filter = "blur(4px)";
                } else if (index > activeStep) {
                  transform = "translateY(40px) scale(0.97)";
                } else {
                  transform = "translateY(-40px) scale(0.97)";
                }

                return (
                  <img
                    key={index}
                    style={{
                      transform,
                      opacity,
                      filter,
                      transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, filter 0.6s ease",
                      willChange: "transform, opacity, filter",
                    }}
                    className={`${index === 0 ? "relative" : "absolute inset-0 p-3 sm:p-4 lg:p-6"} w-full h-auto object-contain`}
                    alt={`Adim ${index + 1}: ${step.title}`}
                    src={step.image}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>

          <div
            ref={stepsListRef}
            className="flex-1 flex flex-col justify-start lg:justify-center gap-0 overflow-y-auto lg:overflow-visible min-h-0 scroll-smooth"
          >
            {steps.map((step, index) => (
              <button
                key={step.number}
                ref={(el) => { stepRefs.current[index] = el; }}
                type="button"
                onClick={() => handleStepClick(index)}
                className={`text-left py-2.5 sm:py-3 lg:py-4 transition-all duration-500 cursor-pointer rounded-xl px-2 -mx-2 hover:bg-gray-50 flex-shrink-0 ${
                  index === activeStep ? "opacity-100" : "opacity-40 hover:opacity-60"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg transition-all duration-500 [font-family:'Outfit',Helvetica] ${
                      index === activeStep
                        ? "bg-[#0056c7] text-white shadow-lg shadow-blue-200"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`[font-family:'Outfit',Helvetica] font-semibold text-sm sm:text-base lg:text-lg leading-[1.3] mb-0.5 transition-colors duration-500 ${
                        index === activeStep ? "text-[#0b1f45]" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`[font-family:'Outfit',Helvetica] font-normal text-xs sm:text-sm lg:text-base leading-[1.5] transition-all duration-500 ${
                        index === activeStep
                          ? "text-[#36466d] max-h-20 opacity-100 mt-0.5"
                          : "text-gray-400 max-h-0 lg:max-h-20 opacity-0 lg:opacity-100 overflow-hidden"
                      }`}
                    >
                      {step.description}
                    </p>
                    {step.highlight && (
                      <p
                        className={`[font-family:'Outfit',Helvetica] font-medium text-[#0056c7] text-xs sm:text-sm lg:text-base leading-[22px] transition-all duration-500 ${
                          index === activeStep
                            ? "opacity-100 max-h-10 mt-1"
                            : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                      >
                        {step.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
