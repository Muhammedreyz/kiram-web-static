import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EarlyAccessModal = ({
  isOpen,
  onClose,
}: EarlyAccessModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState<"" | "ev_sahibi" | "kiraci">("");
  const [rentAmount, setRentAmount] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentData, setConsentData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetForm = useCallback(() => {
    setFullName("");
    setPhone("");
    setEmail("");
    setCity("");
    setUserType("");
    setRentAmount("");
    setConsentPrivacy(false);
    setConsentData(false);
    setError("");
    setSuccess(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(resetForm, 300);
  }, [onClose, resetForm]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 8)
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !phone.trim() || !email.trim() || !city.trim() || !userType || !rentAmount.trim()) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }

    if (!consentPrivacy || !consentData) {
      setError("Lütfen onay kutularını işaretleyin.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }

    setLoading(true);

    const formData = {
      full_name: fullName.trim(),
      phone: phone.replace(/\s/g, ""),
      email: email.trim(),
      city: city.trim(),
      user_type: userType,
      rent_amount: rentAmount.replace(/\s/g, ""),
      consent_privacy: consentPrivacy,
      consent_data_processing: consentData,
    };

    try {
      const dbRes = await fetch(`${API_BASE}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!dbRes.ok) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }

      fetch(`${API_BASE}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          userType: formData.user_type,
          rentAmount: formData.rent_amount,
        }),
      }).catch(() => {});

      setSuccess(true);
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="absolute inset-0 bg-[#0b1f45]/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] animate-slideUp">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 pt-6 pb-4 bg-white rounded-t-2xl border-b border-[#e8ecf1]">
          <div>
            <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-xl sm:text-2xl leading-tight">
              Erken Erişim Başvurusu
            </h2>
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm mt-1">
              Bilgilerinizi bırakın, sizi haberdar edelim.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f3f7] transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5 text-[#36466d]" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#e6faf0] flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-xl">
              Başvurunuz Alındı
            </h3>
            <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm max-w-[320px]">
              Erken erişim başvurunuz başarıyla kaydedildi. En kısa sürede
              sizinle iletişime geçeceğiz.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 h-12 px-8 bg-[#0056c7] hover:bg-[#004aaa] text-white rounded-xl [font-family:'Outfit',Helvetica] font-semibold text-base transition-colors"
            >
              Tamam
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
            <div className="flex flex-col gap-1.5">
              <label className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-sm">
                Adınız ve Soyadınız <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="örn. Elif Yılmaz"
                className="h-12 px-4 rounded-xl bg-[#f0f3f7] border border-[#e2e6ec] [font-family:'Outfit',Helvetica] text-[#0b1f45] text-[15px] placeholder:text-[#9ba5b4] outline-none focus:border-[#0056c7] focus:ring-2 focus:ring-[#0056c7]/10 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-sm">
                  Telefon Numaranız <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="5__ ___ __ __"
                  className="h-12 px-4 rounded-xl bg-[#f0f3f7] border border-[#e2e6ec] [font-family:'Outfit',Helvetica] text-[#0b1f45] text-[15px] placeholder:text-[#9ba5b4] outline-none focus:border-[#0056c7] focus:ring-2 focus:ring-[#0056c7]/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-sm">
                  E-Posta Adresiniz <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="örn. eposta@adresi.com"
                  className="h-12 px-4 rounded-xl bg-[#f0f3f7] border border-[#e2e6ec] [font-family:'Outfit',Helvetica] text-[#0b1f45] text-[15px] placeholder:text-[#9ba5b4] outline-none focus:border-[#0056c7] focus:ring-2 focus:ring-[#0056c7]/10 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-sm">
                Şehir <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="örn. İstanbul"
                className="h-12 px-4 rounded-xl bg-[#f0f3f7] border border-[#e2e6ec] [font-family:'Outfit',Helvetica] text-[#0b1f45] text-[15px] placeholder:text-[#9ba5b4] outline-none focus:border-[#0056c7] focus:ring-2 focus:ring-[#0056c7]/10 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-sm">
                  Kullanıcı Tipi <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {([
                    { value: "ev_sahibi", label: "Ev Sahibi" },
                    { value: "kiraci", label: "Kiracı" },
                  ] as const).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setUserType(option.value)}
                      className={`flex-1 h-12 rounded-xl [font-family:'Outfit',Helvetica] font-semibold text-[15px] transition-all duration-200 ${
                        userType === option.value
                          ? "bg-[#0056c7] text-white shadow-md shadow-blue-200/50"
                          : "bg-[#f0f3f7] border border-[#e2e6ec] text-[#36466d] hover:bg-[#e8ecf1]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-sm">
                  Kira Tutarı (TL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={rentAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d]/g, "");
                    setRentAmount(val);
                  }}
                  placeholder="örn. 15000"
                  className="h-12 px-4 rounded-xl bg-[#f0f3f7] border border-[#e2e6ec] [font-family:'Outfit',Helvetica] text-[#0b1f45] text-[15px] placeholder:text-[#9ba5b4] outline-none focus:border-[#0056c7] focus:ring-2 focus:ring-[#0056c7]/10 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consentPrivacy}
                  onChange={(e) => setConsentPrivacy(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-[#c4cdd5] accent-[#0056c7] flex-shrink-0 cursor-pointer"
                />
                <span className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-[13px] leading-[1.6]">
                  <a
                    href="#"
                    className="text-[#0056c7] font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Açık Rıza Metni
                  </a>
                  'ni okudum ve kişisel verilerimin belirtilen amaçlarla
                  işlenmesine açık rıza veriyorum.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consentData}
                  onChange={(e) => setConsentData(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-[#c4cdd5] accent-[#0056c7] flex-shrink-0 cursor-pointer"
                />
                <span className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-[13px] leading-[1.6]">
                  <a
                    href="#"
                    className="text-[#0056c7] font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni
                  </a>
                  'ni okudum ve kabul ediyorum.
                </span>
              </label>
            </div>

            {error && (
              <p className="[font-family:'Outfit',Helvetica] font-medium text-red-500 text-sm">
                {error}
              </p>
            )}

            <div className="flex justify-end pt-2 pb-2">
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-8 bg-[#0b1f45] hover:bg-[#162d5a] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl [font-family:'Outfit',Helvetica] font-semibold text-base transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M4 12a8 8 0 018-8"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="opacity-75"
                      />
                    </svg>
                    Gönderiliyor...
                  </span>
                ) : (
                  "Gönder"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
