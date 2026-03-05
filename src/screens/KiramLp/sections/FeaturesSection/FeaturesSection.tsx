import { useState, useCallback } from "react";
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

  const getPrev = useCallback(
    () => (activeIndex - 1 + features.length) % features.length,
    [activeIndex]
  );
  const getNext = useCallback(
    () => (activeIndex + 1) % features.length,
    [activeIndex]
  );

  const goTo = (index: number) => setActiveIndex(index);

  const prev = getPrev();
  const next = getNext();

  return (
    <section
      ref={ref}
      className={`w-full bg-[#1e1e2e] py-16 sm:py-24 overflow-hidden transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="relative w-full max-w-[1000px] mx-auto h-[320px] sm:h-[360px] px-4">
        <div
          onClick={() => goTo(prev)}
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-[200px] sm:w-[260px] lg:w-[300px] bg-[#c8c8d0] rounded-2xl cursor-pointer transition-all duration-500 ease-out z-0 opacity-70 -translate-x-[15%] sm:-translate-x-[10%]"
        >
          <div className="flex flex-col items-center text-center gap-3 p-5 sm:p-6">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${features[prev].iconBg} flex items-center justify-center`}
            >
              <img
                src={features[prev].icon}
                alt=""
                className="w-7 h-7"
                aria-hidden="true"
              />
            </div>
            <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-sm sm:text-base leading-tight">
              {features[prev].title}
            </h3>
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#515966] text-xs sm:text-sm leading-[1.6]">
              {features[prev].desc}
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[340px] lg:w-[400px] bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.4)] z-20 transition-all duration-500 ease-out">
          <div className="flex flex-col items-center text-center gap-4 sm:gap-5 p-7 sm:p-10">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${features[activeIndex].iconBg} flex items-center justify-center`}
            >
              <img
                src={features[activeIndex].icon}
                alt=""
                className="w-8 h-8 sm:w-9 sm:h-9"
                aria-hidden="true"
              />
            </div>
            <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-lg sm:text-xl lg:text-2xl leading-tight">
              {features[activeIndex].title}
            </h3>
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#515966] text-sm sm:text-base leading-[1.6]">
              {features[activeIndex].desc}
            </p>
          </div>
        </div>

        <div
          onClick={() => goTo(next)}
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-[200px] sm:w-[260px] lg:w-[300px] bg-[#c8c8d0] rounded-2xl cursor-pointer transition-all duration-500 ease-out z-0 opacity-70 translate-x-[15%] sm:translate-x-[10%]"
        >
          <div className="flex flex-col items-center text-center gap-3 p-5 sm:p-6">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${features[next].iconBg} flex items-center justify-center`}
            >
              <img
                src={features[next].icon}
                alt=""
                className="w-7 h-7"
                aria-hidden="true"
              />
            </div>
            <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-sm sm:text-base leading-tight">
              {features[next].title}
            </h3>
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#515966] text-xs sm:text-sm leading-[1.6]">
              {features[next].desc}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
