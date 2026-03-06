import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Card, CardContent } from "../../../../components/ui/card";
import { useInView } from "../../../../hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import containerDijital from "../../../../img/Container.svg";
import containerRisk from "../../../../img/Container-1.svg";
import containerDepozito from "../../../../img/Container-3.svg";
import containerKiraAkisi from "../../../../img/Container-4.svg";
import containerPortfoy from "../../../../img/Container-5.svg";
import containerFinansal from "../../../../img/Container-6.svg";
import logoPattern from "../../../../img/logo-pattern.png";

const AkilliTahsilatIcon = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0H72C85.2548 0 96 10.7452 96 24V72C96 85.2548 85.2548 96 72 96H24C10.7452 96 0 85.2548 0 72V24Z" fill="url(#paint0_akilli)"/>
    <path d="M68.0007 48.0001H63.0407C62.1666 47.9982 61.316 48.2827 60.6189 48.81C59.9218 49.3373 59.4167 50.0785 59.1807 50.9201L54.4807 67.6401C54.4504 67.7439 54.3872 67.8352 54.3007 67.9001C54.2141 67.965 54.1089 68.0001 54.0007 68.0001C53.8925 68.0001 53.7872 67.965 53.7007 67.9001C53.6141 67.8352 53.551 67.7439 53.5207 67.6401L42.4807 28.3601C42.4504 28.2562 42.3872 28.165 42.3007 28.1001C42.2141 28.0352 42.1089 28.0001 42.0007 28.0001C41.8925 28.0001 41.7872 28.0352 41.7007 28.1001C41.6141 28.165 41.551 28.2562 41.5207 28.3601L36.8207 45.0801C36.5856 45.9184 36.0834 46.6571 35.3904 47.1841C34.6974 47.7111 33.8513 47.9976 32.9807 48.0001H28.0007" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_akilli" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EB4697"/>
        <stop offset="1" stopColor="#DC2B79"/>
      </linearGradient>
    </defs>
  </svg>
);

const features = [
  {
    icon: containerDijital,
    title: "Dijital Kira Sözleşmesi",
    description: "Sözleşmeler dakikalar içinde oluşturulur ve güvenli şekilde saklanır.",
  },
  {
    icon: containerRisk,
    title: "Kiracı Risk Analizi",
    description: "Kiracıların finansal güvenilirliği sözleşme öncesi analiz edilebilir.",
  },
  {
    icon: null,
    title: "Akıllı Kira Tahsilatı",
    description: "Bekleyen, tamamlanan, geçmiş tüm işlemler tek panelde. Ödemeler otomatik takip edilir.",
    CustomIcon: AkilliTahsilatIcon,
  },
  {
    icon: containerDepozito,
    title: "Depozito Güvence Sistemi",
    description: "Depozito taraflardan bağımsız sistemde tutulur, şeffaf şekilde yönetilir.",
  },
  {
    icon: containerKiraAkisi,
    title: "Kira Akışını Yatırıma Dönüştürme",
    description: "Kira ve depozito akışları yatırım araçları ile entegre edilebilir.",
  },
  {
    icon: containerPortfoy,
    title: "Çoklu Portföy Yönetimi",
    description: "Birden fazla mülkü tek panelden yönet. Portföy görünümü, Gelir raporları, Performans analizi",
  },
  {
    icon: containerFinansal,
    title: "Güvenli Finansal Altyapı",
    description: "KVKK uyumlu veri yapısı ve güvenli ödeme sistemleri.",
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
                <div className="flex-shrink-0 w-[56px] h-[56px]">
                  {feature.CustomIcon ? <feature.CustomIcon /> : <img className="w-full h-full" alt={feature.title} src={feature.icon!} />}
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
                <div className="w-[72px] h-[72px]">
                  {feature.CustomIcon ? <feature.CustomIcon /> : <img className="w-full h-full" alt={feature.title} src={feature.icon!} />}
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
                        <div className="w-[96px] h-[96px] transition-all duration-500">
                          {feature.CustomIcon ? <feature.CustomIcon /> : <img className="w-full h-full" alt={feature.title} src={feature.icon!} />}
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
