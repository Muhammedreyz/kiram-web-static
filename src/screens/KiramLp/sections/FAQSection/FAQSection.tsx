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
    question: "Depozito kimin hesabinda duruyor?",
    answer:
      "Depozito, Kiram'in tarafsiz emanet sisteminde tutulur. Ne kiracinin ne de ev sahibinin kisisel hesabinda bulunmaz. Bu sayede her iki taraf icin de tam guvenlik saglanir ve surec sonunda sozlesmeye gore otomatik olarak islenir.",
  },
  {
    id: "item-2",
    question: "Ev sahibi parayi erken cekebilir mi?",
    answer:
      "Hayir, ev sahibi depozitoyu tek tarafli olarak cekemez. Depozito, sozlesme sartlarina bagli olarak tarafsiz sistem tarafindan yonetilir.",
  },
  {
    id: "item-3",
    question: "Kira bitince iade nasil olur?",
    answer:
      "Kira suresi sona erdiginde, depozito otomatik olarak degerlendirilmis haliyle kiraci hesabina iade edilir. Hasar tespiti durumunda iki tarafin da onayiyla kesinti yapilabilir.",
  },
  {
    id: "item-4",
    question: "Birden fazla sozlesme yonetebilir miyim?",
    answer:
      "Evet, Kiram uzerinden birden fazla mulk ve sozlesmeyi tek panelden yonetebilirsiniz. Her sozlesme icin ayri takip ve raporlama yapilir.",
  },
];

export const FAQSection = (): JSX.Element => {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      id="sss"
      aria-label="Sik sorulan sorular"
      className={`flex flex-col items-center gap-8 sm:gap-12 pt-12 sm:pt-20 pb-0 px-4 sm:px-8 lg:px-16 w-full bg-white transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-8 sm:gap-12">
      <h2 className="[font-family:'Outfit',Helvetica] font-bold text-[#0b1f45] text-3xl sm:text-4xl lg:text-5xl text-center tracking-[0] leading-[1.25]">
        Sik Sorulan Sorular
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
              <AccordionContent className="px-5 sm:px-8 pt-2 pb-4 sm:pb-6">
                <p className="[font-family:'Outfit',Helvetica] font-normal text-[#36466d] text-sm sm:text-lg tracking-[0] leading-[26px]">
                  {item.answer}
                </p>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
};
