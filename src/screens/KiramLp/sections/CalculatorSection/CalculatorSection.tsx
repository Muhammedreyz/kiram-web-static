import { Card, CardContent } from "../../../../components/ui/card";
import { useInView } from "../../../../hooks/useScrollAnimation";
import userIcon from "../../../../img/user-01.svg";
import homeIcon from "../../../../img/home.svg";
import tickIcon from "../../../../img/tick.svg";

const landlordsFeatures = [
  "Kiracı finansal risk analizi",
  "Otomatik kira tahsilatı",
  "Depozito güvence sistemi",
  "Portföy yönetimi",
];

const tenantsFeatures = [
  "Değerlenen depozito",
  "Dijital sözleşme",
  "Şeffaf ödeme geçmişi",
  "Finansal güven oluşturma",
];

export const CalculatorSection = (): JSX.Element => {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.3);
  const { ref: card1Ref, isInView: card1Visible } = useInView(0.2);
  const { ref: card2Ref, isInView: card2Visible } = useInView(0.2);

  return (
    <section id="kimin-icin" className="flex flex-col w-full items-center justify-center gap-8 sm:gap-10 px-4 sm:px-8 lg:px-16 py-12 sm:py-[100px] bg-white">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-8 sm:gap-10">
      <header
        ref={headerRef}
        className={`flex flex-col items-center gap-3 sm:gap-4 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.25]">
          Kimin İçin?
        </h2>
        <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-lg text-center tracking-[0] leading-[27px] max-w-2xl px-4">
          Herkes İçin Daha Güvenli Kiralama
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-[30px] w-full">
        <div
          ref={card1Ref}
          className={`transition-all duration-700 ${
            card1Visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <Card className="bg-[#f5f9ff] border-0 rounded-2xl sm:rounded-3xl h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex flex-col items-start gap-3 sm:gap-5 p-5 sm:p-9">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[19.2px] bg-[linear-gradient(180deg,rgba(229,241,255,1)_0%,rgba(207,226,252,1)_100%)] flex items-center justify-center">
                <img className="w-6 h-6 sm:w-8 sm:h-8" alt="Home" src={homeIcon} />
              </div>

              <h3 className="self-stretch [font-family:'Outfit',Helvetica] font-bold text-[#0e1e44] text-xl sm:text-[28px] tracking-[0] leading-[1.3]">
                Ev Sahipleri İçin
              </h3>

              <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-base leading-relaxed">
                Ev kiralamayı profesyonel bir varlık yönetimine dönüştürün.
              </p>

              {landlordsFeatures.map((feature, index) => (
                <div key={index} className="flex items-start sm:items-center gap-3">
                  <img className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" alt="Tick" src={tickIcon} />
                  <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-base tracking-[0] leading-[26px]">
                    {feature}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div
          ref={card2Ref}
          className={`transition-all duration-700 delay-200 ${
            card2Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <Card className="bg-[#fffbea] border-0 rounded-2xl sm:rounded-3xl h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex flex-col items-start gap-3 sm:gap-5 p-5 sm:p-9">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[19.2px] bg-[linear-gradient(180deg,rgba(255,245,211,1)_0%,rgba(252,238,182,1)_100%)] flex items-center justify-center">
                <img className="w-6 h-6 sm:w-8 sm:h-8" alt="User" src={userIcon} />
              </div>

              <h3 className="self-stretch [font-family:'Outfit',Helvetica] font-bold text-[#0e1e44] text-xl sm:text-[28px] tracking-[0] leading-[1.3]">
                Kiracılar İçin
              </h3>

              <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-base leading-relaxed">
                Kira ödemelerinizi düzenli bir finansal referansa dönüştürün.
              </p>

              {tenantsFeatures.map((feature, index) => (
                <div key={index} className="flex items-start sm:items-center gap-3">
                  <img className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" alt="Tick" src={tickIcon} />
                  <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-base tracking-[0] leading-[26px]">
                    {feature}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </section>
  );
};
