import { useInView } from "../../../../hooks/useScrollAnimation";
import warnIcon from "../../../../img/warn.svg";

const problems = [
  "Kiracı riskini görmek zor",
  "Depozitolar atıl şekilde bekliyor",
  "Kira ödemeleri manuel takip ediliyor",
  "Sözleşmeler farklı yerlerde saklanıyor",
];

export const ProblemSolutionSection = (): JSX.Element => {
  const { ref: leftRef, isInView: leftVisible } = useInView(0.2);
  const { ref: rightRef, isInView: rightVisible } = useInView(0.2);

  return (
    <section className="w-full bg-white px-4 sm:px-8 lg:px-16 py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div
          ref={leftRef}
          className={`bg-[#fef5f5] p-8 sm:p-10 lg:p-12 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none transition-all duration-700 ${
            leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <span className="inline-block [font-family:'Outfit',Helvetica] font-bold text-[#dc2626] text-sm tracking-widest uppercase mb-4">
            Problem
          </span>
          <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-xl sm:text-2xl lg:text-[28px] leading-tight mb-6">
            Bugün kira ilişkilerinin büyük kısmı hâlâ dağınık ve manuel şekilde yönetiliyor.
          </h3>
          <div className="flex flex-col gap-4">
            {problems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={warnIcon} alt="" className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-base leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={rightRef}
          className={`bg-[#eefaf1] p-8 sm:p-10 lg:p-12 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none transition-all duration-700 delay-200 ${
            rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <span className="inline-block [font-family:'Outfit',Helvetica] font-bold text-[#16a34a] text-sm tracking-widest uppercase mb-4">
            Çözüm
          </span>
          <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-xl sm:text-2xl lg:text-[28px] leading-tight mb-6">
            Kiram, kiralama sürecinin tüm aşamalarını dijitalleştirerek güvenli ve şeffaf bir altyapı sunar.
          </h3>
          <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-base leading-relaxed">
            Sözleşme, ödeme, depozito ve yatırım süreçleri tek platformda yönetilir.
          </p>
        </div>
      </div>
    </section>
  );
};
