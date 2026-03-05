import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useInView } from "../../../../hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ozellik1 from "../../../../img/ozellik-1.svg";
import fileShield from "../../../../img/file-shield.svg";
import akilliOdeme from "../../../../img/akilli-odeme.svg";
import kiraAkisi from "../../../../img/kira-akisi.svg";
import tarafsiz from "../../../../img/tarafsiz.svg";
import kolayKurulum from "../../../../img/kolay-kurulum.svg";
import cokluPortfoy from "../../../../img/coklu-portfoy.svg";
import guvenliFinansal from "../../../../img/guvenli-finansal-altyapi.svg";
import logoPattern from "../../../../img/logo-pattern.png";

const features = [
  {
    icon: akilliOdeme,
    iconBg: "bg-[linear-gradient(180deg,rgba(251,146,60,1)_0%,rgba(249,115,22,1)_100%)]",
    title: "Akıllı Kira Tahsilatı",
    description: "Bekleyen, tamamlanan ve geçmiş tüm kira işlemleri tek panelde. Ödemeler otomatik takip edilir.",
  },
  {
    icon: ozellik1,
    iconBg: "bg-[linear-gradient(180deg,rgba(0,86,199,1)_0%,rgba(0,73,168,1)_100%)]",
    title: "Depozito Güvence Sistemi",
    description: "Depozito taraflardan bağımsız sistemde tutulur, şeffaf şekilde iade edilir.",
  },
  {
    icon: kiraAkisi,
    iconBg: "bg-[linear-gradient(180deg,rgba(56,224,140,1)_0%,rgba(20,199,157,1)_100%)]",
    title: "Kira Akışını Yatırıma Dönüştürme",
    description: "Kira sözleşme boyunca yatırım seçenekleriyle değerlendirilebilir.",
  },
  {
    icon: fileShield,
    iconBg: "bg-[linear-gradient(180deg,rgba(14,165,233,1)_0%,rgba(6,182,212,1)_100%)]",
    title: "Dijital Kira Sözleşmesi",
    description: "Dakikalar içinde oluşturulur, tüm ödemeler sözleşmeye bağlıdır.",
  },
  {
    icon: tarafsiz,
    iconBg: "bg-[linear-gradient(180deg,rgba(0,86,199,1)_0%,rgba(0,60,140,1)_100%)]",
    title: "Tarafsız ve Şeffaf Sistem",
    description: "Her işlem kayıtlı, her süreç izlenebilir.",
  },
  {
    icon: kolayKurulum,
    iconBg: "bg-[linear-gradient(180deg,rgba(56,224,140,1)_0%,rgba(20,199,157,1)_100%)]",
    title: "Kolay Kurulum",
    description: "Karmaşık süreçler yok, dakikalar içinde başlayabilirsiniz.",
  },
  {
    icon: cokluPortfoy,
    iconBg: "bg-[linear-gradient(180deg,rgba(251,146,60,1)_0%,rgba(220,100,30,1)_100%)]",
    title: "Çoklu Portföy Yönetimi",
    description: "Birden fazla mülkü tek panelden yönetin. Gelir raporları ve performans analizi.",
  },
  {
    icon: guvenliFinansal,
    iconBg: "bg-[linear-gradient(180deg,rgba(34,210,238,1)_0%,rgba(8,184,214,1)_100%)]",
    title: "Güvenli Finansal Altyapı",
    description: "KVKK uyumlu veri yapısı, banka entegrasyonları, güvenli ödeme altyapısı.",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.3);
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, features.length - 1));
    setActiveIndex(clamped);
  }, []);

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((p) => (p + 1) % features.length);
    }, 5000);
  }, []);

  useEffect(() => {
    resetAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetAutoplay]);

  const handleInteraction = useCallback((index: number) => {
    goTo(index);
    resetAutoplay();
  }, [goTo, resetAutoplay]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { handleInteraction(Math.min(activeIndex + 1, features.length - 1)); }
      else { handleInteraction(Math.max(activeIndex - 1, 0)); }
    }
  }, [activeIndex, handleInteraction]);

  return (
    <section id="ozellikler" className="relative w-full bg-[#eaf3ff] px-0 py-12 sm:py-[100px] overflow-hidden">
      <img
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-auto pointer-events-none opacity-30"
        alt=""
        src={logoPattern}
        loading="lazy"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-10 sm:gap-14 max-w-[1440px] mx-auto">
        <div
          ref={headerRef}
          className={`flex flex-col items-center gap-3 sm:gap-4 px-4 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.25]">
            Özellikler
          </h2>
          <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-lg text-center tracking-[0] leading-[27px]">
            Kiralamanın Yeni Standardı
          </p>
        </div>

        <div
          className="relative w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => { prev(); resetAutoplay(); }}
            disabled={activeIndex === 0}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#0b1f45]" />
          </button>

          <button
            onClick={() => { next(); resetAutoplay(); }}
            disabled={activeIndex === features.length - 1}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#0b1f45]" />
          </button>

          <div className="flex items-center justify-center min-h-[280px] sm:min-h-[320px] px-14 sm:px-20 lg:px-28">
            {features.map((feature, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);

              if (absOffset > 2) return null;

              const isActive = offset === 0;
              const translateX = offset * 110;
              const scale = isActive ? 1 : 0.85;
              const opacity = isActive ? 1 : absOffset === 1 ? 0.65 : 0.3;
              const zIndex = 10 - absOffset;

              return (
                <div
                  key={index}
                  onClick={() => handleInteraction(index)}
                  className={`absolute transition-all duration-500 ease-out cursor-pointer ${
                    absOffset > 0 ? "hidden sm:block" : "block"
                  }`}
                  style={{
                    transform: `translateX(${translateX}%) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <Card
                    className={`rounded-2xl border-0 transition-all duration-500 ${
                      isActive
                        ? "bg-white shadow-2xl"
                        : "bg-white/80 shadow-sm"
                    }`}
                    style={{
                      width: isActive ? "340px" : "300px",
                    }}
                  >
                    <CardContent className={`flex flex-col gap-5 sm:gap-8 ${isActive ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
                      <div className="flex items-start">
                        <div
                          className={`flex items-center justify-center rounded-[14px] ${feature.iconBg} ${
                            isActive ? "w-14 h-14" : "w-11 h-11"
                          } transition-all duration-500`}
                        >
                          <img
                            className={`${isActive ? "w-7 h-7" : "w-5 h-5"} transition-all duration-500`}
                            alt={feature.title}
                            src={feature.icon}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <h3
                          className={`[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] tracking-[0] leading-7 transition-all duration-500 ${
                            isActive ? "text-xl sm:text-2xl" : "text-lg"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`[font-family:'Outfit',Helvetica] font-medium text-[#36466d] tracking-[-0.31px] leading-[24px] transition-all duration-500 ${
                            isActive ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => handleInteraction(index)}
              aria-label={`Özellik ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-3 bg-[#0056c7]"
                  : "w-3 h-3 bg-[#c4cdd5] hover:bg-[#9aa5b4]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
