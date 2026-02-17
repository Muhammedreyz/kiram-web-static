import { Card, CardContent } from "../../../../components/ui/card";
import { useInView } from "../../../../hooks/useScrollAnimation";
import appStore from "../../../../img/app-store.svg";
import googlePlay from "../../../../img/google-play.svg";
import footerMockup from "../../../../img/footer-mockup.png";
import tickIcon from "../../../../img/tick.svg";

const features = [
  {
    column: 1,
    items: [
      { text: "Güvenli İşlemler" },
      { text: "Anında Bildirim" },
      { text: "Dijital Belgeler" },
    ],
  },
  {
    column: 2,
    items: [
      { text: "7/24 Erişim" },
      { text: "Akıllı Hatırlatıcılar" },
      { text: "Kolay Kullanım" },
    ],
  },
];

export const FeaturesSection = (): JSX.Element => {
  const { ref, isInView } = useInView(0.2);

  return (
    <section className="flex flex-col w-full items-center gap-2.5 px-4 sm:px-8 lg:px-16 py-12 sm:py-16 bg-white">
      <div className="w-full max-w-[1440px] mx-auto">
      <Card
        ref={ref}
        className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[linear-gradient(332deg,rgba(235,244,255,1)_60%,rgba(246,246,249,1)_100%)] border-0 shadow-none transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <CardContent className="relative w-full p-0">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-[400px] sm:min-h-[520px]">
            <div className="relative w-full lg:w-[45%] min-h-[250px] sm:min-h-[350px] lg:min-h-0 flex items-end justify-center lg:justify-start overflow-hidden">
              <img
                className="w-[50%] sm:w-[40%] lg:w-[70%] h-auto object-contain lg:absolute lg:bottom-0 lg:left-[8%]"
                alt="Kiram App"
                src={footerMockup}
              />
            </div>

            <div className="flex flex-col w-full lg:w-[55%] items-center lg:items-start gap-5 sm:gap-6 p-6 sm:p-8 lg:p-0 lg:py-12 lg:pr-16">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <h2 className="[font-family:'Kumbh_Sans',Helvetica] font-bold text-black text-2xl sm:text-[32px] lg:text-[40px] tracking-[0] leading-[1.2] text-center lg:text-left">
                  Kiram'i <br />
                  Cebinize Taşıyın
                </h2>

                <p className="w-full max-w-[472px] [font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-lg tracking-[0] leading-[26px] text-center lg:text-left">
                  Kira sürecinizi her yerden yönetin. Depozito, ödeme ve
                  sözleşmeleriniz her zaman elinizin altında.
                </p>
              </div>

              <div className="flex items-start gap-8 sm:gap-16 w-full justify-center lg:justify-start">
                {features.map((column) => (
                  <div
                    key={column.column}
                    className="flex flex-col items-start gap-3 sm:gap-3.5"
                  >
                    {column.items.map((item, index) => (
                      <div
                        key={`${column.column}-${index}`}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <img className="w-5 h-5 sm:w-6 sm:h-6" alt="Icon" src={tickIcon} />
                        <span className="[font-family:'Kumbh_Sans',Helvetica] font-semibold text-slate-900 text-sm sm:text-lg lg:text-xl tracking-[0] leading-7 whitespace-nowrap">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 sm:gap-[22px]">
                <img className="h-9 sm:h-12" alt="App Store" src={appStore} />
                <img className="h-9 sm:h-12" alt="Google Play" src={googlePlay} />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
      </div>
    </section>
  );
};
