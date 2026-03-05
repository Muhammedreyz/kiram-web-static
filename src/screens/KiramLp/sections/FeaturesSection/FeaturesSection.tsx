import { useState, useRef, useEffect, useCallback } from "react";
import { useInView } from "../../../../hooks/useScrollAnimation";
import akilliOdemeIcon from "../../../../img/akilli-odeme.svg";
import fileShieldIcon from "../../../../img/file-shield.svg";
import kiraAkisiIcon from "../../../../img/kira-akisi.svg";
import cokluPortfoyIcon from "../../../../img/coklu-portfoy.svg";
import guvenliAltyapiIcon from "../../../../img/guvenli-finansal-altyapi.svg";
import tarafsizIcon from "../../../../img/tarafsiz.svg";

const features = [
  {
    icon: akilliOdemeIcon,
    iconBg: "bg-[#16a34a]",
    title: "Akıllı Kira Tahsilatı",
    desc: "Bekleyen, tamamlanan, gecikmiş tüm işlemler tek panelde. Ödemeler otomatik takip edilir.",
  },
  {
    icon: fileShieldIcon,
    iconBg: "bg-[#0056c7]",
    title: "Depozito Güvence Sistemi",
    desc: "Depozito taraflardan bağımsız sistemde tutulur, şeffaf şekilde yönetilir.",
  },
  {
    icon: kiraAkisiIcon,
    iconBg: "bg-[#7c3aed]",
    title: "Kira Akışını Yatırıma Dönüştürme",
    desc: "Kira ve depozito akışları yatırım araçları ile entegre edilebilir.",
  },
  {
    icon: cokluPortfoyIcon,
    iconBg: "bg-[#0056c7]",
    title: "Dijital Sözleşme Yönetimi",
    desc: "Kira sözleşmelerinizi dijital ortamda oluşturun, imzalayın ve güvenle saklayın.",
  },
  {
    icon: guvenliAltyapiIcon,
    iconBg: "bg-[#16a34a]",
    title: "Güvenli Finansal Altyapı",
    desc: "Lisanslı kurumlar ve banka güvencesiyle desteklenen güvenli altyapı.",
  },
  {
    icon: tarafsizIcon,
    iconBg: "bg-[#7c3aed]",
    title: "Tarafsız Platform",
    desc: "Kiracı ve ev sahibi arasında adil, tarafsız ve şeffaf bir köprü kurar.",
  },
];

export const FeaturesSection = (): JSX.Element => {
  const { ref, isInView } = useInView(0.15);
  const [activeIndex, setActiveIndex] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    const scrollTarget =
      card.offsetLeft - track.clientWidth / 2 + card.offsetWidth / 2;
    track.scrollTo({ left: scrollTarget, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const findClosest = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    return closest;
  }, []);

  const handleScroll = useCallback(() => {
    if (isDragging.current) return;
    setActiveIndex(findClosest());
  }, [findClosest]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const timer = setTimeout(() => scrollToIndex(1), 150);
    return () => clearTimeout(timer);
  }, [scrollToIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    trackRef.current.scrollLeft =
      startScrollLeft.current - (e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const closest = findClosest();
    scrollToIndex(closest);
  };

  return (
    <section
      ref={ref}
      className={`w-full bg-[#0f1a2e] py-16 sm:py-20 overflow-hidden transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        ref={trackRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-16 touch-pan-x"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {features.map((feature, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[300px] rounded-2xl bg-white cursor-pointer transition-all duration-500 ease-out ${
                isActive
                  ? "scale-[1.08] shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-10"
                  : "scale-[0.92] opacity-60"
              }`}
            >
              <div className="flex flex-col items-center text-center gap-3 sm:gap-4 p-6 sm:p-8">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${feature.iconBg} flex items-center justify-center`}
                >
                  <img
                    src={feature.icon}
                    alt=""
                    className="w-7 h-7"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-sm sm:text-base lg:text-lg leading-tight">
                  {feature.title}
                </h3>
                <p className="[font-family:'Outfit',Helvetica] font-normal text-[#515966] text-xs sm:text-sm leading-[1.6]">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 h-2.5 bg-[#0056c7]"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Kart ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
