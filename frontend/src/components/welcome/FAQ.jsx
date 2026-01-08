import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "How do I get started with Manage?",
    answer: "Getting started is easy! Just click the 'Get Started' button in the hero section and follow the simple setup guide. You'll be up and running in minutes."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial with access to all premium features. No credit card is required to sign up."
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Absolutely. Manage is built with an API-first approach, making it easy to connect with your favorite development and project management tools."
  },
  {
    question: "What makes Manage different from other tools?",
    answer: "Manage focuses on a 'developer-first' experience, combining high performance with a clean, aesthetic design that reduces cognitive load and boosts productivity."
  },
];

const FAQ = () => {

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Common Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about getting started and making the most of our platform.
          </p>
        </div>
        
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
