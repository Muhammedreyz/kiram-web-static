import { useState, useCallback } from "react";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Slider } from "../../../../components/ui/slider";
import { useInView } from "../../../../hooks/useScrollAnimation";
import patternBg from "../../../../img/pattern.png";
import phonesImg from "../../../../img/Ultramarine.png";

const ANNUAL_RATE = 0.25;
const DEPOSIT_MIN = 10000;
const DEPOSIT_MAX = 200000;
const RENT_MIN = 5000;
const RENT_MAX = 100000;
const DURATION_MIN = 1;
const DURATION_MAX = 36;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}

function calcDeposit(amount: number, months: number) {
  const monthlyRate = ANNUAL_RATE / 12;
  const totalValue = amount * Math.pow(1 + monthlyRate, months);
  const earnings = totalValue - amount;
  return { principal: amount, earnings, total: totalValue };
}

function calcRent(monthlyRent: number, months: number) {
  const monthlyRate = ANNUAL_RATE / 12;
  let total = 0;
  for (let i = 0; i < months; i++) {
    total += monthlyRent * Math.pow(1 + monthlyRate, months - i);
  }
  const totalPaid = monthlyRent * months;
  const earnings = total - totalPaid;
  return { principal: totalPaid, earnings, total };
}

export const HeroSection = (): JSX.Element => {
  const [mode, setMode] = useState<"depozito" | "kira">("depozito");
  const [depositAmount, setDepositAmount] = useState(50000);
  const [rentAmount, setRentAmount] = useState(15000);
  const [duration, setDuration] = useState(12);
  const { ref: heroRef, isInView: heroVisible } = useInView(0.1);

  const result =
    mode === "depozito"
      ? calcDeposit(depositAmount, duration)
      : calcRent(rentAmount, duration);

  const currentAmount = mode === "depozito" ? depositAmount : rentAmount;
  const currentMin = mode === "depozito" ? DEPOSIT_MIN : RENT_MIN;
  const currentMax = mode === "depozito" ? DEPOSIT_MAX : RENT_MAX;

  const handleAmountSlider = useCallback(
    (val: number[]) => {
      const mapped = currentMin + (val[0] / 100) * (currentMax - currentMin);
      if (mode === "depozito") setDepositAmount(Math.round(mapped / 1000) * 1000);
      else setRentAmount(Math.round(mapped / 500) * 500);
    },
    [mode, currentMin, currentMax]
  );

  const handleDurationSlider = useCallback((val: number[]) => {
    const mapped = DURATION_MIN + (val[0] / 100) * (DURATION_MAX - DURATION_MIN);
    setDuration(Math.round(mapped));
  }, []);

  const amountSliderValue =
    ((currentAmount - currentMin) / (currentMax - currentMin)) * 100;
  const durationSliderValue =
    ((duration - DURATION_MIN) / (DURATION_MAX - DURATION_MIN)) * 100;

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #e8f2ff 0%, #f0f6ff 40%, #ffffff 100%)",
        }}
      >
        <img
          className="absolute top-0 right-0 w-[600px] lg:w-[900px] h-auto object-contain opacity-[0.07] pointer-events-none"
          alt=""
          src={patternBg}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start w-full min-h-[calc(100svh-72px)]">
            <div
              className={`w-full lg:w-[45%] xl:w-[42%] flex-shrink-0 flex flex-col justify-center text-center lg:text-left py-8 sm:py-12 lg:py-28 xl:py-32 transition-all duration-1000 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="[font-family:'Outfit',Helvetica] font-normal italic text-[#36466d] text-lg sm:text-xl mb-5">
                Kira iliskisini guvenle yonetin.
              </p>
              <h1 className="[font-family:'Outfit',Helvetica] font-bold text-[#0056c7] text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[56px] tracking-[-0.02em] leading-[1.1] mb-6">
                Kira, Depozito,
                <br />
                Sigorta ve Yatirim
                <br />
                Tek Uygulamada
              </h1>
              <p className="[font-family:'Outfit',Helvetica] font-normal text-[#515966] text-[15px] sm:text-base lg:text-[17px] leading-[1.65] mb-8 max-w-[480px] mx-auto lg:mx-0">
                Kiram, ev sahibi ve kiraci arasinda guvenli dijital sozlesme,
                akilli kira tahsilati, kredi skoru analizi ve yatirim
                entegrasyonu saglayan yeni nesil rent-tech platformudur.
              </p>
              <div>
                <Button className="h-[52px] sm:h-14 px-7 sm:px-8 bg-[#ff8d0a] hover:bg-[#e67e09] rounded-xl [font-family:'Outfit',Helvetica] font-semibold text-white text-base sm:text-lg tracking-[0.01em] transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-orange-200/50">
                  Sozlesmeni Simdi Olustur
                </Button>
              </div>
            </div>

            <div
              className={`w-full lg:w-[55%] xl:w-[58%] flex justify-center lg:justify-end items-center lg:items-end lg:self-end pt-8 lg:pt-0 transition-all duration-[1.4s] ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
              }`}
            >
              <img
                className="w-[75%] sm:w-[60%] lg:w-full max-w-[700px] xl:max-w-[760px] h-auto object-contain object-bottom drop-shadow-2xl"
                alt="Kiram mobil uygulama ekran goruntuleri - kira yonetimi, depozito takibi ve dijital sozlesme"
                src={phonesImg}
                width={760}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="hesaplayici"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e8f2ff 0%, #f0f6ff 50%, #ffffff 100%)",
        }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          alt=""
          src={patternBg}
          loading="lazy"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-20">
          <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center leading-[1.25]">
              Getirinizi Hesaplayin
            </h2>
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-base lg:text-lg text-center leading-[1.5] max-w-3xl">
              Klasik yontemde bekleyen paraniz, Kiram'da <span className="font-bold">faizsiz</span> yatirim fonlariyla degerlendirilebilir
            </p>
          </div>

          <Card className="w-full shadow-[0px_25px_50px_-12px_#00000029] rounded-2xl sm:rounded-3xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col gap-4 sm:gap-5 p-6 sm:p-8 lg:p-10 bg-white">
                  <div className="flex flex-col gap-3">
                    <Label className="[font-family:'Outfit',Helvetica] font-semibold text-[#121416] text-sm leading-5">
                      Ne hesaplamak istiyorsunuz?
                    </Label>
                    <div className="flex gap-3 sm:gap-4">
                      {(["depozito", "kira"] as const).map((type) => (
                        <Button
                          key={type}
                          variant={mode === type ? "default" : "outline"}
                          onClick={() => setMode(type)}
                          className={`flex-1 h-10 sm:h-12 rounded-[100px] transition-all duration-300 ${
                            mode === type
                              ? "bg-[#0056c7] hover:bg-[#0056c7]/90 text-white shadow-lg shadow-blue-200"
                              : "border-[#97a0b5] text-[#0d1d43] hover:bg-gray-50"
                          } [font-family:'Outfit',Helvetica] font-semibold text-[15px] sm:text-[17px]`}
                        >
                          {type === "depozito" ? "Depozito" : "Kira"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label className="[font-family:'Outfit',Helvetica] font-semibold text-[#121416] text-sm leading-5">
                        {mode === "depozito" ? "Depozito Tutari" : "Aylik Kira"}
                      </Label>
                      <div className="h-[56px] sm:h-[68px] px-4 flex items-center border-2 rounded-[14px] border-input bg-white">
                        <span className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-xl sm:text-2xl flex-1">
                          {formatCurrency(currentAmount)}
                        </span>
                        <span className="[font-family:'Inter',Helvetica] font-bold text-[#4a5568] text-xl sm:text-2xl">
                          TL
                        </span>
                      </div>
                      <Slider
                        value={[amountSliderValue]}
                        onValueChange={handleAmountSlider}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between">
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#4a5568] text-xs">
                          {formatCurrency(currentMin)} TL
                        </span>
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#4a5568] text-xs">
                          {formatCurrency(currentMax)} TL
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="[font-family:'Outfit',Helvetica] font-semibold text-[#121416] text-sm leading-5">
                        Sure (Ay)
                      </Label>
                      <div className="h-[56px] sm:h-[68px] px-4 flex items-center border-2 rounded-[14px] border-input bg-white">
                        <span className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-xl sm:text-2xl flex-1">
                          {duration}
                        </span>
                        <span className="[font-family:'Outfit',Helvetica] font-bold text-[#4a5568] text-lg sm:text-xl">
                          ay
                        </span>
                      </div>
                      <Slider
                        value={[durationSliderValue]}
                        onValueChange={handleDurationSlider}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between">
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#4a5568] text-xs">
                          {DURATION_MIN} ay
                        </span>
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#4a5568] text-xs">
                          {DURATION_MAX} ay
                        </span>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-[#fffced] border-[#fdba744c] rounded-[14px]">
                    <AlertDescription className="[font-family:'Inter',Helvetica] text-xs sm:text-sm leading-[22.8px]">
                      <span className="font-bold text-[#121416]">Not:</span>
                      <span className="text-[#4a5568]">
                        {" "}Getiri oranlari ornek amaclidir. Gercek getiriler piyasa
                        kosullarina ve secilen yatirim urunune gore degisir.
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 lg:p-10 bg-[#0056c7]">
                  <h3 className="[font-family:'Outfit',Helvetica] font-bold text-white text-lg sm:text-xl leading-7">
                    Potansiyel Getiriniz
                  </h3>

                  <div className="flex flex-col gap-3 sm:gap-4">
                    <Card className="bg-[#ffffff1a] border border-[#ffffff33] rounded-2xl">
                      <CardContent className="flex flex-col justify-center gap-1 px-5 py-3 sm:py-4 min-h-[80px] sm:min-h-[100px]">
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#ffffffcc] text-sm sm:text-base leading-5">
                          {mode === "depozito" ? "Toplam Depozito" : "Toplam Odenen Kira"}
                        </span>
                        <p className="[font-family:'Outfit',Helvetica] font-bold text-white text-2xl sm:text-4xl leading-10 transition-all duration-500">
                          {formatCurrency(result.principal)} TL
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#ffffff1a] border border-[#ffffff33] rounded-2xl">
                      <CardContent className="flex flex-col justify-center gap-1 px-5 py-3 sm:py-4 min-h-[90px] sm:min-h-[120px]">
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#ffffffcc] text-sm sm:text-base leading-5">
                          Kazanc (Tahmini)
                        </span>
                        <p className="[font-family:'Outfit',Helvetica] font-bold text-[#39e58f] text-2xl sm:text-4xl leading-10 transition-all duration-500">
                          +{formatCurrency(result.earnings)} TL
                        </p>
                        <p className="[font-family:'Outfit',Helvetica] font-normal text-[#ffffff99] text-xs sm:text-sm leading-5">
                          {duration} ay boyunca %{(ANNUAL_RATE * 100).toFixed(0)} yillik getiri ile
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-[linear-gradient(180deg,rgba(56,224,140,1)_0%,rgba(20,199,157,1)_100%)] border-0 rounded-2xl shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]">
                      <CardContent className="flex flex-col justify-center gap-1 p-5 sm:p-6 min-h-[100px] sm:min-h-[120px]">
                        <span className="[font-family:'Outfit',Helvetica] font-normal text-[#ffffffe6] text-sm sm:text-base leading-5">
                          Toplam Deger
                        </span>
                        <p className="[font-family:'Outfit',Helvetica] font-bold text-white text-3xl sm:text-5xl leading-[48px] transition-all duration-500">
                          {formatCurrency(result.total)} TL
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <p className="[font-family:'Outfit',Helvetica] font-normal text-[#d2e4fc] text-xs sm:text-sm leading-[22.8px]">
                    Depozitonuz kira suresi boyunca atil kalmak yerine, guvenli
                    yatirim araclariyla degerlendirilebilir. Kira bitiminde hem
                    depozitonuzu hem de kazancinizi alirsiniz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
