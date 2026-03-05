import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { useInView } from "../../../../hooks/useScrollAnimation";

const faqData = [
  {
    id: "item-1",
    question: "Kiram güvenli mi?",
    answer:
      "Evet. Kiram, kullanıcı verilerini ve işlemleri korumak için yüksek güvenlik standartları ile çalışır. Tüm veriler KVKK uyumlu şekilde saklanır ve işlemler güvenli altyapı üzerinde gerçekleştirilir.\n\nFinansal işlemler ise SPK düzenlemelerine uygun yatırım ürünleri ve lisanslı elektronik para kuruluşları üzerinden yürütülür. Bu sayede kira ödemeleri ve depozito süreçleri güvenli, şeffaf ve denetlenebilir bir şekilde yönetilir.\n\nTüm sözleşmeler, ödemeler ve işlemler sistemde kayıt altına alınır ve yetkisiz erişime karşı korunur.",
  },
  {
    id: "item-2",
    question: "Depozito nerede tutulur?",
    answer:
      "Depozito, mülk sahibine ait saklama hesabında tutulur ve kira süresi boyunca güvenli yatırım fonlarında değerlendirilebilir. Depozitonun iade ve kullanım şartları kira sözleşmesinde açık şekilde belirtilir.\n\nMülk sahibi, kiracının onayı olmadan depozitoyu kullanamaz. Kira sözleşmesi sona erdiğinde depozito, sözleşmede belirlenen şartlara göre kiracıya iade edilir veya tarafların mutabakatına göre mahsuplaşma yapılır.",
  },
  {
    id: "item-3",
    question: "Kiram üzerinden yapılan sözleşmeler yasal mı?",
    answer:
      "Kiram üzerinden oluşturulan kira sözleşmeleri dijital ortamda kayıt altına alınır ve tarafların onayı ile saklanır. Belgeler gerektiğinde erişilebilir ve yürürlükteki mevzuata uygun şekilde kullanılabilir.",
  },
  {
    id: "item-4",
    question: "Ev sahibi veya kiracı ödeme konusunda sorun çıkarırsa ne olur?",
    answer:
      "Kiram, kira ödemelerini ve sözleşme süreçlerini kayıt altına alarak taraflar arasında şeffaf bir yapı sağlar. Ödeme geçmişi, sözleşme detayları ve işlem kayıtları sistemde tutulur ve olası anlaşmazlıklarda referans olarak kullanılabilir.",
  },
  {
    id: "item-5",
    question: "Kiram'ı kullanmak zor mu?",
    answer:
      "Hayır. Kiram, kira süreçlerini herkes için kolaylaştırmak amacıyla tasarlanmıştır. Hesabınızı oluşturduktan sonra birkaç dakika içinde sözleşme oluşturabilir, depozito ve kira ödemelerinizi tek panelden yönetebilirsiniz.",
  },
];

export const FAQSection = (): JSX.Element => {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      id="sss"
      aria-label="Sık sorulan sorular"
      className={`flex flex-col items-center gap-8 sm:gap-12 pt-12 sm:pt-20 pb-0 px-4 sm:px-8 lg:px-16 w-full bg-white transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="w-full max-w-[960px] mx-auto flex flex-col items-center gap-8 sm:gap-12">
      <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.25]">
        Sık Sorulan Sorular
      </h2>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="flex flex-col gap-3 sm:gap-4 w-full"
      >
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-white rounded-2xl border border-solid border-[#d5d9e1] overflow-hidden data-[state=open]:bg-[#f3f4f7] transition-colors duration-300"
          >
            <AccordionTrigger className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="[font-family:'Outfit',Helvetica] font-semibold text-[#0b1f45] text-base sm:text-xl tracking-[0] leading-7 text-left">
                {item.question}
              </span>
            </AccordionTrigger>
            {item.answer && (
              <AccordionContent className="px-5 sm:px-8 pt-2 pb-4 sm:pb-6 flex flex-col gap-4">
                {item.answer.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-lg tracking-[0] leading-[26px]">
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
};
