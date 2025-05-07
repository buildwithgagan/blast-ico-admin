
import React from "react";
import { useCmc } from "@/contexts/CmcContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage = () => {
  const { faq } = useCmc();
  
  // Sort FAQ items by their order
  const sortedFaqs = [...faq.items].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our token and ICO process.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {sortedFaqs.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No FAQs available at this time.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {sortedFaqs.map((faqItem) => (
              <AccordionItem key={faqItem.id} value={faqItem.id}>
                <AccordionTrigger className="text-left">
                  {faqItem.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose max-w-none">
                    <p>{faqItem.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
