import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import kiramWhite from "../../../../img/kiram-white.svg";
import patternBg from "../../../../img/Frame_4205927.png";

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative flex flex-col items-center gap-8 sm:gap-12 pt-8 sm:pt-10 pb-6 px-4 sm:px-8 lg:px-16 w-full bg-[#00357a] overflow-hidden">
      <img
        src={patternBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
      />
      <div className="relative z-10 flex flex-col max-w-[542px] items-center gap-6 sm:gap-8 w-full">
        <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
          <img src={kiramWhite} alt="Kiram" className="h-6 sm:h-8" />

          <div className="flex flex-col items-start gap-4 w-full">
            <p className="w-full text-center [font-family:'Kumbh_Sans',Helvetica] font-medium text-white text-sm sm:text-base tracking-[0] leading-[22px]">
              Kiram, kiracı ve ev sahibi arasında güvenli bir köprü kurar.
              Depozitonuzu yasal, şeffaf ve kazançlı bir şekilde yönetmenin en
              kolay yolu.
            </p>
          </div>
        </div>

        <div className="inline-flex flex-col items-center gap-3">
          <p className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-[#e5eaee] text-sm sm:text-base tracking-[0] leading-[22px] whitespace-nowrap">
            Bizi Takip Edin
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a href="#" aria-label="Twitter" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a href="#" aria-label="LinkedIn" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col max-w-[454px] items-center gap-1 px-0 py-4 border-t border-[#ffffff1f] w-full">
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#ffffff73] text-xs sm:text-sm tracking-[0] leading-7 whitespace-nowrap">
          2026 Kiram. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};
