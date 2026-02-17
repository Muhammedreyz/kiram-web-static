import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import kiramDark from "../../../../img/kiram-dark.svg";

const navItems = [
  { label: "Kimin Icin?", href: "#kimin-icin" },
  { label: "Nasil Calisir?", href: "#nasil-calisir" },
  { label: "Ozellikler", href: "#ozellikler" },
  { label: "SSS", href: "#sss" },
];

export const NavbarSection = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white">
      <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0047ab] focus:text-white focus:rounded-lg">
        Icerige atla
      </a>
      <header className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-16 w-full max-w-[1440px] mx-auto">
        <a href="#hero" onClick={() => handleNavClick("#hero")}>
          <img src={kiramDark} alt="Kiram - Guvenli Kira Yonetim Platformu" className="h-6 sm:h-7" />
        </a>

        <nav aria-label="Ana navigasyon" className="hidden lg:flex items-center justify-center gap-6">
          <ul className="flex items-center gap-8 xl:gap-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-[#0b0902] text-sm xl:text-base leading-6 whitespace-nowrap hover:text-[#0047ab] transition-colors duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <Button className="h-11 px-6 py-2.5 bg-[#0047ab] hover:bg-[#003a8c] rounded-[100px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-white text-base transition-transform duration-300 hover:scale-105 active:scale-95">
            Uye Ol
          </Button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menuyu kapat" : "Menuyu ac"}
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileOpen ? (
            <XIcon className="w-6 h-6 text-[#0b1f45]" />
          ) : (
            <MenuIcon className="w-6 h-6 text-[#0b1f45]" />
          )}
        </button>
      </header>

      <div
        className={`lg:hidden absolute top-[72px] left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobil navigasyon" className="flex flex-col p-4 gap-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.href)}
              className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-[#0b0902] text-base leading-6 py-3 px-4 rounded-xl hover:bg-gray-50 text-left transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => setMobileOpen(false)}
            className="h-11 mt-2 bg-[#0047ab] hover:bg-[#003a8c] rounded-[100px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-white text-base"
          >
            Uye Ol
          </Button>
        </nav>
      </div>
    </div>
  );
};
