import { CheckIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useInView } from "../../../../hooks/useScrollAnimation";
import patternBg from "../../../../img/Frame_4205927.png";

const features = [
  { text: "Kurulum gerekmez" },
  { text: "Taahhüt yoktur" },
  { text: "Dakikalar içinde başlayın" },
];

export const CallToActionSection = (): JSX.Element => {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="flex flex-col items-center gap-8 sm:gap-12 px-4 sm:px-8 lg:px-16 py-12 sm:py-20 relative w-full bg-[#00449c] border-b border-solid border-[#184379] overflow-hidden"
    >
      <img
        src={patternBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />
      <div
        className={`flex flex-col items-center gap-4 sm:gap-6 relative z-10 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="[font-family:'Outfit',Helvetica] font-bold text-white text-2xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.2]">
          Depozitonuzu güvene alın.
          <br />
          Kira sürecini netleştirin.
        </h2>
      </div>

      <div
        className={`flex items-start gap-4 relative z-10 transition-all duration-700 delay-200 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Button className="h-12 sm:h-16 px-4 sm:px-6 bg-[#ff8d0a] hover:bg-[#e67e09] rounded-xl transition-transform duration-300 hover:scale-105 active:scale-95">
          <span className="[font-family:'Outfit',Helvetica] font-semibold text-white text-base sm:text-lg lg:text-[22px] tracking-[0.44px] leading-[22px] whitespace-nowrap">
            Sözleşmeni Şimdi Oluştur
          </span>
        </Button>
      </div>

      <div
        className={`flex items-center gap-4 sm:gap-10 relative z-10 flex-wrap justify-center transition-all duration-700 delay-400 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#22c55e]" />
            <span className="[font-family:'Kumbh_Sans',Helvetica] font-normal text-[#98acc3] text-xs sm:text-[13px] text-center tracking-[0] leading-[16px] whitespace-nowrap">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
