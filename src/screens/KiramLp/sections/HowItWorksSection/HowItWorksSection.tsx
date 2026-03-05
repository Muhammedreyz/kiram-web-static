import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
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

const iconBgStyles: Record<string, React.CSSProperties> = {
  orange: { background: "linear-gradient(180deg, rgba(251,146,60,1) 0%, rgba(249,115,22,1) 100%)" },
  blue: { background: "linear-gradient(180deg, rgba(0,86,199,1) 0%, rgba(0,73,168,1) 100%)" },
  green: { background: "linear-gradient(180deg, rgba(56,224,140,1) 0%, rgba(20,199,157,1) 100%)" },
  cyan: { background: "linear-gradient(180deg, rgba(14,165,233,1) 0%, rgba(6,182,212,1) 100%)" },
  darkBlue: { background: "linear-gradient(180deg, rgba(0,86,199,1) 0%, rgba(0,60,140,1) 100%)" },
  darkOrange: { background: "linear-gradient(180deg, rgba(251,146,60,1) 0%, rgba(220,100,30,1) 100%)" },
  teal: { background: "linear-gradient(180deg, rgba(34,210,238,1) 0%, rgba(8,184,214,1) 100%)" },
};

const features = [
  {
    icon: akilliOdeme,
    iconBgKey: "orange",
    title: "Akıllı Kira Tahsilatı",
    description: "Bekleyen, tamamlanan ve geçmiş tüm kira işlemleri tek panelde. Ödemeler otomatik takip edilir.",
  },
  {
    icon: ozellik1,
    iconBgKey: "blue",
    title: "Depozito Güvence Sistemi",
    description: "Depozito taraflardan bağımsız sistemde tutulur, şeffaf şekilde iade edilir.",
  },
  {
    icon: kiraAkisi,
    iconBgKey: "green",
    title: "Kira Akışını Yatırıma Dönüştürme",
    description: "Kira sözleşme boyunca yatırım seçenekleriyle değerlendirilebilir.",
  },
  {
    icon: fileShield,
    iconBgKey: "cyan",
    title: "Dijital Kira Sözleşmesi",
    description: "Dakikalar içinde oluşturulur, tüm ödemeler sözleşmeye bağlıdır.",
  },
  {
    icon: tarafsiz,
    iconBgKey: "darkBlue",
    title: "Tarafsız ve Şeffaf Sistem",
    description: "Her işlem kayıtlı, her süreç izlenebilir.",
  },
  {
    icon: kolayKurulum,
    iconBgKey: "green",
    title: "Kolay Kurulum",
    description: "Karmaşık süreçler yok, dakikalar içinde başlayabilirsiniz.",
  },
  {
    icon: cokluPortfoy,
    iconBgKey: "darkOrange",
    title: "Çoklu Portföy Yönetimi",
    description: "Birden fazla mülkü tek panelden yönetin. Gelir raporları ve performans analizi.",
  },
  {
    icon: guvenliFinansal,
    iconBgKey: "teal",
    title: "Güvenli Finansal Altyapı",
    description: "KVKK uyumlu veri yapısı, banka entegrasyonları, güvenli ödeme altyapısı.",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.3);
  const { ref: gridRef, isInView: gridVisible } = useInView(0.1);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="ozellikler" className="relative w-full bg-[#eaf3ff] px-0 py-12 sm:py-[100px] overflow-hidden">
      <img
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-auto pointer-events-none opacity-30"
        alt=""
        src={logoPattern}
        loading="lazy"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-10 sm:gap-14 w-full">
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

        <div ref={gridRef} className="flex flex-col gap-3 px-4 w-full max-w-[600px] mx-auto sm:hidden">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`rounded-2xl border-0 bg-white shadow-sm transition-all duration-500 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: gridVisible ? `${index * 80}ms` : "0ms" }}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-[14px] w-[56px] h-[56px]"
                  style={iconBgStyles[feature.iconBgKey]}
                >
                  <img className="w-7 h-7" alt={feature.title} src={feature.icon} />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-base leading-tight">
                    {feature.title}
                  </h3>
                  <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm leading-[20px]">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4 px-6 w-full max-w-[800px] mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`rounded-2xl border-0 bg-white shadow-sm transition-all duration-500 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: gridVisible ? `${index * 80}ms` : "0ms" }}
            >
              <CardContent className="flex flex-col items-center text-center gap-4 p-5">
                <div
                  className="flex items-center justify-center rounded-[16px] w-[72px] h-[72px]"
                  style={iconBgStyles[feature.iconBgKey]}
                >
                  <img className="w-9 h-9" alt={feature.title} src={feature.icon} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-lg leading-tight">
                    {feature.title}
                  </h3>
                  <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-xs leading-[18px]">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block relative w-full features-swiper-wrapper">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-6 h-6 text-[#0b1f45]" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-6 h-6 text-[#0b1f45]" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            slidesPerView={2.6}
            centeredSlides
            loop
            spaceBetween={0}
            speed={500}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: ".features-pagination" }}
            className="features-swiper"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index} className="!h-auto">
                {({ isActive }) => (
                  <div className="py-10 px-1">
                    <Card
                      className={`rounded-2xl border-0 transition-all duration-500 w-full ${
                        isActive
                          ? "bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] scale-105 opacity-100 relative z-10"
                          : "bg-white/80 shadow-sm scale-100 opacity-50"
                      }`}
                    >
                      <CardContent className={`flex flex-col items-center text-center gap-5 sm:gap-6 ${isActive ? "p-10" : "p-6"}`}>
                        <div
                          className="flex items-center justify-center rounded-[18px] w-[96px] h-[96px] transition-all duration-500"
                          style={iconBgStyles[feature.iconBgKey]}
                        >
                          <img
                            className="w-12 h-12"
                            alt={feature.title}
                            src={feature.icon}
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <h3
                            className={`[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] tracking-[0] leading-7 transition-all duration-500 ${
                              isActive ? "text-2xl" : "text-lg"
                            }`}
                          >
                            {feature.title}
                          </h3>
                          <p
                            className={`[font-family:'Outfit',Helvetica] font-medium text-[#36466d] tracking-[-0.31px] leading-[24px] transition-all duration-500 ${
                              isActive ? "text-base" : "text-sm"
                            }`}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="features-pagination flex items-center justify-center gap-2 mt-2" />
        </div>
      </div>

      <style>{`
        .features-swiper .swiper-wrapper {
          align-items: center;
        }
        .features-swiper .swiper-slide {
          overflow: visible;
        }
        .features-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: #c4cdd5;
          opacity: 1;
          transition: all 0.3s;
        }
        .features-pagination .swiper-pagination-bullet-active {
          width: 32px;
          background: #0056c7;
        }
      `}</style>
    </section>
  );
};
