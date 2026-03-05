import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useInView } from "../../../../hooks/useScrollAnimation";
import akilliOdemeIcon from "../../../../img/akilli-odeme.svg";
import fileShieldIcon from "../../../../img/file-shield.svg";
import kiraAkisiIcon from "../../../../img/kira-akisi.svg";
import cokluPortfoyIcon from "../../../../img/coklu-portfoy.svg";
import kolayKurulumIcon from "../../../../img/kolay-kurulum.svg";
import tarafsizIcon from "../../../../img/tarafsiz.svg";
import bankaGuvencesiIcon from "../../../../img/banka-guvencesi.svg";

const features = [
  {
    icon: akilliOdemeIcon,
    iconBg: "#16a34a",
    title: "Akıllı Kira Tahsilatı",
    desc: "Bekleyen, tamamlanan, gecikmiş tüm işlemler tek panelde. Ödemeler otomatik takip edilir.",
  },
  {
    icon: fileShieldIcon,
    iconBg: "#0056c7",
    title: "Depozito Güvence Sistemi",
    desc: "Depozito taraflardan bağımsız sistemde tutulur, şeffaf şekilde yönetilir.",
  },
  {
    icon: kiraAkisiIcon,
    iconBg: "#7c3aed",
    title: "Kira Akışını Yatırıma Dönüştürme",
    desc: "Kira ve depozito akışları yatırım araçları ile entegre edilebilir.",
  },
  {
    icon: cokluPortfoyIcon,
    iconBg: "#0056c7",
    title: "Dijital Kira Sözleşmesi",
    desc: "Dakikalar içinde oluşturulur, tüm ödemeler sözleşmeye bağlıdır.",
  },
  {
    icon: tarafsizIcon,
    iconBg: "#0b2a5c",
    title: "Tarafsız ve Şeffaf Sistem",
    desc: "Her işlem kayıtlı, her süreç izlenebilir.",
  },
  {
    icon: kolayKurulumIcon,
    iconBg: "#16a34a",
    title: "Kolay Kurulum",
    desc: "Karmaşık süreçler yok, dakikalar içinde başlayabilirsiniz.",
  },
  {
    icon: bankaGuvencesiIcon,
    iconBg: "#b45309",
    title: "Çoklu Portföy Yönetimi",
    desc: "Birden fazla mülkü tek panelden yönetin. Gelir raporları ve performans çıktıları.",
  },
];

export const FeaturesSection = (): JSX.Element => {
  const { ref, isInView } = useInView(0.15);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={ref}
      id="ozellikler"
      className={`w-full bg-[#1a1a2e] py-16 sm:py-24 overflow-hidden transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <style>{`
        .features-swiper {
          padding: 20px 0;
        }
        .features-swiper .swiper-wrapper {
          align-items: center;
        }
        .features-swiper .swiper-slide {
          background: #bbbbc4;
          border-radius: 1rem;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          width: 260px !important;
          opacity: 0.8;
        }
        .features-swiper .swiper-slide-active {
          background: #ffffff;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
          border-radius: 1.25rem;
          width: 420px !important;
          opacity: 1;
          z-index: 10;
        }
        .features-swiper .swiper-slide-prev,
        .features-swiper .swiper-slide-next {
          opacity: 0.85;
        }
        .features-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }
        .features-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.3);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .features-swiper .swiper-pagination-bullet-active {
          width: 32px;
          height: 10px;
          background: #0056c7;
          border-radius: 9999px;
        }
        @media (max-width: 640px) {
          .features-swiper .swiper-slide {
            width: 200px !important;
          }
          .features-swiper .swiper-slide-active {
            width: 280px !important;
          }
        }
      `}</style>

      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        initialSlide={1}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          0: { slidesPerView: 1.4 },
          480: { slidesPerView: 1.8 },
          768: { slidesPerView: 3 },
        }}
        className="features-swiper"
      >
        {features.map((feature, i) => {
          const isActive = i === activeIndex;
          return (
            <SwiperSlide key={i}>
              <div
                className={`flex flex-col items-center text-center transition-all duration-500 ${
                  isActive
                    ? "px-8 py-10 sm:px-10 sm:py-12"
                    : "px-4 py-5 sm:px-5 sm:py-6"
                }`}
              >
                <div
                  className="flex items-center justify-center rounded-2xl mb-4"
                  style={{
                    width: isActive ? 96 : 48,
                    height: isActive ? 96 : 48,
                    backgroundColor: feature.iconBg,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <img
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: isActive ? 48 : 24,
                      height: isActive ? 48 : 24,
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>
                <h3
                  className={`[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] leading-tight transition-all duration-500 ${
                    isActive
                      ? "text-xl sm:text-2xl mb-3"
                      : "text-sm sm:text-base mb-2"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`[font-family:'Outfit',Helvetica] font-normal text-[#515966] leading-[1.6] transition-all duration-500 ${
                    isActive
                      ? "text-sm sm:text-base"
                      : "text-xs sm:text-sm"
                  }`}
                >
                  {feature.desc}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
