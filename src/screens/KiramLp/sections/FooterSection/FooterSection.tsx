import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import kiramWhite from "../../../../img/kiram-white.svg";
import patternBg from "../../../../img/Frame_4205927.png";
import tcmbLogo from "../../../../img/tcmb_1.png";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" fill="currentColor" className={className}>
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
  </svg>
);

const SpkLogo = () => (
  <svg viewBox="0 0 42 42" className="w-[40px] h-[40px]" fill="none">
    <circle cx="21" cy="21" r="20" stroke="#98acc3" strokeWidth="1.5" />
    <text x="21" y="16" textAnchor="middle" fill="#98acc3" fontSize="7" fontFamily="serif" fontWeight="bold">SPK</text>
    <text x="21" y="25" textAnchor="middle" fill="#98acc3" fontSize="5" fontFamily="serif">Sermaye</text>
    <text x="21" y="31" textAnchor="middle" fill="#98acc3" fontSize="5" fontFamily="serif">Piyasası</text>
    <text x="21" y="37" textAnchor="middle" fill="#98acc3" fontSize="5" fontFamily="serif">Kurulu</text>
  </svg>
);

const MkkLogo = () => (
  <div className="flex flex-col items-start">
    <span className="[font-family:'Outfit',Helvetica] font-bold text-white text-[11px] leading-tight tracking-wide">MERKEZi KAYIT</span>
    <span className="[font-family:'Outfit',Helvetica] font-bold text-white text-[13px] leading-tight tracking-wide">iSTANBUL</span>
    <span className="[font-family:'Outfit',Helvetica] font-normal text-[#98acc3] text-[5px] leading-tight">Türkiye Sermaye Piyasaları - Merkezi</span>
    <span className="[font-family:'Outfit',Helvetica] font-normal text-[#98acc3] text-[5px] leading-tight">Saklama ve Veri Depolama Kuruluşu</span>
  </div>
);

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative flex flex-col items-center pt-10 pb-6 px-4 sm:px-8 lg:px-16 w-full bg-[#00357a] overflow-hidden">
      <img
        src={patternBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8 w-full max-w-[1440px] mx-auto pb-10 sm:pb-12">
        <div className="flex flex-col items-start gap-6 sm:gap-8 max-w-[577px]">
          <img src={kiramWhite} alt="Kiram" className="h-7 sm:h-8" />
          <p className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-white text-sm sm:text-base leading-[22px]">
            Kiram, kiracı ve ev sahibi arasında güvenli bir köprü kurar. Kira ve
            depozitonuzu yasal, şeffaf ve kazançlı bir şekilde yönetmenin en
            kolay yolu.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
          <p className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-[#e5eaee] text-sm sm:text-base leading-[22px] whitespace-nowrap">
            Bizi Takip Edin
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Facebook className="w-[18px] h-[18px] text-white" />
            </a>
            <a href="#" aria-label="Instagram" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Instagram className="w-[18px] h-[18px] text-white" />
            </a>
            <a href="#" aria-label="X" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <XIcon className="w-4 h-4 text-white" />
            </a>
            <a href="#" aria-label="LinkedIn" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Linkedin className="w-[18px] h-[18px] text-white" />
            </a>
            <a href="#" aria-label="YouTube" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Youtube className="w-[18px] h-[18px] text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-[1440px] mx-auto border-t border-[#ffffff1f]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-6">
              <img
                src={tcmbLogo}
                alt="TCMB - Türkiye Cumhuriyeti Merkez Bankası"
                className="w-[90px] sm:w-[103px] h-auto object-contain flex-shrink-0"
              />
              <SpkLogo />
              <MkkLogo />
            </div>

            <p className="max-w-[424px] [font-family:'Outfit',Helvetica] font-normal text-[#98acc3] text-[10px] sm:text-[11px] leading-[15px]">
              Ödeme ve elektronik para işlemleri TCMB lisanslı kuruluşlar
              aracılığıyla gerçekleştirilir.
              <br />
              Yatırım işlemleri SPK düzenlemesine tabi portföy yönetim
              şirketleri tarafından yürütülür.
              <br />
              Fon varlıklarının saklama ve kayıt işlemleri MKK sistemi
              kapsamında korunur.
            </p>
          </div>

          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#ffffff73] text-xs sm:text-sm leading-7 whitespace-nowrap flex-shrink-0">
            &copy; 2026 Kiram. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};
