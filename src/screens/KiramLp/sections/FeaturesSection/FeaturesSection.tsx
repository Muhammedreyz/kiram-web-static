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
        .features-swiper .swiper-slide {
          background: #b0b0b8;
          border-radius: 1rem;
          transition: all 0.5s ease;
          overflow: hidden;
        }
        .features-swiper .swiper-slide-active {
          background: #ffffff;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
          border-radius: 1.25rem;
        }
        .features-swiper .swiper-pagination {
          position: relative;
          margin-top: 2.5rem;
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
      `}</style>

      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        initialSlide={1}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        className="features-swiper !overflow-visible"
      >
        {features.map((feature, i) => {
          const isActive = i === activeIndex;
          return (
            <SwiperSlide
              key={i}
              style={{ width: isActive ? "420px" : "280px", maxWidth: "90vw" }}
            >
              <div
                className={`flex flex-col items-center text-center transition-all duration-500 ${
                  isActive ? "px-8 py-10 sm:px-12 sm:py-14" : "px-5 py-6 sm:px-6 sm:py-8"
                }`}
              >
                <div
                  className="flex items-center justify-center rounded-2xl mb-5"
                  style={{
                    width: isActive ? 96 : 56,
                    height: isActive ? 96 : 56,
                    backgroundColor: feature.iconBg,
                    transition: "all 0.5s ease",
                  }}
                >
                  <img
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: isActive ? 48 : 28,
                      height: isActive ? 48 : 28,
                      transition: "all 0.5s ease",
                    }}
                  />
                </div>
                <h3
                  className={`[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] leading-tight transition-all duration-500 ${
                    isActive ? "text-xl sm:text-2xl mb-3" : "text-sm sm:text-base mb-2"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`[font-family:'Outfit',Helvetica] font-normal text-[#515966] leading-[1.6] transition-all duration-500 ${
                    isActive ? "text-sm sm:text-base" : "text-xs sm:text-sm"
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
