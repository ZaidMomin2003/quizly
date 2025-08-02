
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
    {
        question: "Is QuizlyAI suitable for both NEET and JEE aspirants?",
        answer: "Yes! Our platform is designed to cater to the syllabus and exam patterns of both the NEET and JEE entrance exams. The AI can generate questions specific to the subjects and topics relevant to each exam."
    },
    {
        question: "How does the AI generate questions?",
        answer: "Our AI is trained on a vast dataset of educational materials, textbooks, and past exam papers. It understands the context and nuances of topics to create unique, relevant, and challenging questions that test your conceptual understanding."
    },
    {
        question: "Can I use QuizlyAI on my mobile device?",
        answer: "Absolutely. The platform is fully responsive and works beautifully on all devices, including desktops, tablets, and smartphones. You can study on the go, anytime, anywhere."
    },
    {
        question: "What is the Pomodoro Timer?",
        answer: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Our integrated timer helps you stay focused and avoid burnout during your study sessions."
    },
    {
        question: "How do I track my progress?",
        answer: "The dashboard provides detailed analytics on your performance. You can see your accuracy by subject, track your weakest concepts, and view your activity over time to understand your study habits and areas for improvement."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time. You will continue to have access to the premium features until the end of your current billing period."
    }
]

export function FAQ() {
    return (
        <section id="faq" className="w-full py-12 lg:py-24 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm mb-2 font-semibold">
                        FAQ
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-xl/relaxed">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold text-left font-headline">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
