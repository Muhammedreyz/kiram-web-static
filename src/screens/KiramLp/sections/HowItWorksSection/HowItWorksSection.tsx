import { Card, CardContent } from "../../../../components/ui/card";
import { useInView } from "../../../../hooks/useScrollAnimation";
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
    icon: ozellik1,
    iconBg: "bg-[linear-gradient(180deg,rgba(0,86,199,1)_0%,rgba(0,73,168,1)_100%)]",
    title: "Depozito Guvende ve Degerlenir",
    description:
      "Depozito taraflardan bagimsiz sistemde tutulur, seffaf sekilde iade edilir.",
  },
  {
    icon: fileShield,
    iconBg:
      "bg-[linear-gradient(180deg,rgba(14,165,233,1)_0%,rgba(6,182,212,1)_100%)]",
    title: "Dijital Kira Sozlesmesi",
    description:
      "Dakikalar icinde olusturulur, tum odemeler sozlesmeye baglidir.",
  },
  {
    icon: akilliOdeme,
    iconBg: "bg-[linear-gradient(180deg,rgba(251,146,60,1)_0%,rgba(249,115,22,1)_100%)]",
    title: "Akilli Odeme Takibi",
    description: "Bekleyen, tamamlanan, gecmis tum islemler tek panelde.",
  },
  {
    icon: kiraAkisi,
    iconBg: "bg-[linear-gradient(180deg,rgba(56,224,140,1)_0%,rgba(20,199,157,1)_100%)]",
    title: "Kira Akisini Yatirima Donusturme",
    description:
      "Kira sozlesme boyunca yatirim secenekleriyle degerlendirilebilir.",
  },
  {
    icon: tarafsiz,
    iconBg: "bg-[linear-gradient(180deg,rgba(99,102,241,1)_0%,rgba(79,70,229,1)_100%)]",
    title: "Tarafsiz ve Seffaf Sistem",
    description: "Her islem kayitli, her surec izlenebilir.",
  },
  {
    icon: kolayKurulum,
    iconBg: "bg-[linear-gradient(180deg,rgba(168,85,247,1)_0%,rgba(147,51,234,1)_100%)]",
    title: "Kolay Kurulum",
    description: "Karmasik surecler yok, dakikalar icinde baslayabilirsiniz.",
  },
  {
    icon: cokluPortfoy,
    iconBg:
      "bg-[linear-gradient(180deg,rgba(235,70,151,1)_0%,rgba(220,43,121,1)_100%)]",
    title: "Coklu Portfolyo Yonetimi",
    description:
      "Birden fazla mulku tek panelden yonet. Portfolyo gorunumu, Gelir raporlari, Performans analizi",
  },
  {
    icon: guvenliFinansal,
    iconBg:
      "bg-[linear-gradient(180deg,rgba(34,210,238,1)_0%,rgba(8,184,214,1)_100%)]",
    title: "Guvenli Finansal Altyapi",
    description:
      "KVKK uyumlu veri yapisi, Banka entegrasyonlari, Guvenli odeme altyapisi",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.3);
  const { ref: gridRef, isInView: gridVisible } = useInView(0.1);

  return (
    <section id="ozellikler" className="relative w-full bg-[#eaf3ff] px-4 sm:px-8 py-12 sm:py-[100px]">
      <img
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-auto pointer-events-none opacity-30"
        alt=""
        src={logoPattern}
        loading="lazy"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-8 sm:gap-10 max-w-[1440px] mx-auto">
        <div
          ref={headerRef}
          className={`flex flex-col items-center gap-3 sm:gap-4 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.25]">
            Ozellikler
          </h2>

          <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-lg text-center tracking-[0] leading-[27px]">
            Ne ekstra evrak, ne belirsiz adimlar.
          </p>
        </div>

        <div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full px-0 sm:px-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-all duration-700 ${
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: gridVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <Card className="bg-white rounded-2xl border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <CardContent className="p-5 sm:p-[33px] flex flex-col gap-6 sm:gap-[43px]">
                  <div className="flex items-start">
                    <div
                      className={`flex w-11 h-11 sm:w-14 sm:h-14 items-center justify-center rounded-[14px] ${feature.iconBg}`}
                    >
                      <img
                        className="w-5 h-5 sm:w-7 sm:h-7"
                        alt={feature.title}
                        src={feature.icon}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-[11px]">
                    <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-lg sm:text-2xl tracking-[0] leading-7">
                      {feature.title}
                    </h3>

                    <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-lg tracking-[-0.31px] leading-[26px]">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
