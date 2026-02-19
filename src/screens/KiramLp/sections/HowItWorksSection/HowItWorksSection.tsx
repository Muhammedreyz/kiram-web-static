import { useState } from "react";
import nasilCalisir from "../../../../img/nasil-calisir-1.png";

const steps = [
  {
    id: 1,
    title: "Hesabını oluştur, rolunu seç",
    description:
      "Ev sahibi / Kiracı / Emlak aracısı olarak kayıt ol. Profil bilgilerini tamamla ve sisteme giriş yap. 2 dakikada hazır.",
    badge: "2 dakikada hazır",
  },
  {
    id: 2,
    title: "Kiralığı doğrula ve görselleri yükle",
    description:
      "Mülk bilgilerini ve adresini gir, fotoğrafları yükle. Sistem otomatik olarak mülkünü doğrular.",
  },
  {
    id: 3,
    title: "Dijital kira sözleşmesini oluştur",
    description:
      "Tarafların bilgilerini gir, kira şartlarını belirle ve dijital imza ile sözleşmeyi anında onaya gönder.",
  },
  {
    id: 4,
    title: "Depozitoyu güvenli emanete yatır",
    description:
      "Kiracı depozitoyu tarafsız Kiram emanet sistemine yatırır. Para güvende, her iki tarafça şeffaf şekilde izlenebilir.",
  },
  {
    id: 5,
    title: "Kira akışını yönet ve değerlendir",
    description:
      "Aylık ödemeleri takip et, depozitonu yatırımla büyüt, tüm süreçleri tek panelden yönet. Kira bitince depozito otomatik iade edilir.",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      id="nasil-calisir"
      className="w-full bg-white px-4 sm:px-8 py-12 sm:py-[100px]"
    >
      <div className="flex flex-col items-center gap-10 sm:gap-14 max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.25]">
            Nasıl Çalışır?
          </h2>
          <p className="[font-family:'Outfit',Helvetica] font-medium text-[#36466d] text-sm sm:text-lg text-center tracking-[0] leading-[27px]">
            5 Dakikada Kur, Kiram Adına Yönet
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 w-full">
          <div className="w-full lg:w-[42%] flex items-center justify-center lg:sticky lg:top-8">
            <img
              src={nasilCalisir}
              alt="Kiram uygulama ekranı"
              className="w-[220px] sm:w-[280px] lg:w-full max-w-[320px] h-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="flex flex-col gap-0 w-full lg:w-[58%]">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="flex items-start gap-4 sm:gap-5 py-5 sm:py-6 border-b border-[#e8edf4] last:border-b-0 text-left w-full group transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
                      isActive
                        ? "bg-[#0056c7]"
                        : "bg-[#d1d5dc] group-hover:bg-[#b0b8c8]"
                    }`}
                  >
                    <span
                      className={`[font-family:'Outfit',Helvetica] font-bold text-sm sm:text-base leading-none ${
                        isActive ? "text-white" : "text-[#0b1f45]"
                      }`}
                    >
                      {step.id}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`[font-family:'Outfit',Helvetica] font-semibold text-base sm:text-lg leading-[1.4] transition-colors duration-300 ${
                          isActive ? "text-[#0b1f45]" : "text-[#59606e]"
                        }`}
                      >
                        {step.title}
                      </span>
                      {step.badge && isActive && (
                        <span className="text-xs font-medium text-[#0056c7] bg-[#eaf3ff] px-2.5 py-0.5 rounded-full [font-family:'Outfit',Helvetica]">
                          {step.badge}
                        </span>
                      )}
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-base leading-[1.7] pt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
