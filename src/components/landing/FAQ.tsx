
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "Is QuizlyAI suitable for both NEET and JEE?",
        answer: "Yes! Our AI is trained on the syllabus and question patterns for both the NEET and JEE entrance exams. You can generate quizzes specific to your target exam."
    },
    {
        question: "How does the AI identify my weak concepts?",
        answer: "Every time you take a quiz, our AI analyzes your performance, paying close attention to the topics of the questions you answer incorrectly. Over time, it builds a profile of your strengths and weaknesses to provide targeted recommendations."
    },
    {
        question: "Can I use the Pomodoro timer for subjects outside of this platform?",
        answer: "Absolutely! The Pomodoro timer is a versatile productivity tool. You can use it to manage your study time for any subject or task, whether it's on QuizlyAI or not."
    },
    {
        question: "Is there a limit to how many quizzes I can generate?",
        answer: "With any of our premium plans, you can generate an unlimited number of quizzes on an unlimited number of topics. The free plan has certain limitations on quiz generation."
    }
];

export function FAQ() {
    return (
        <section id="faq" className="w-full py-12 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="mt-12 max-w-2xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index} className="bg-white/5 border-white/10 rounded-lg px-6 mb-4">
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
