'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'quizzes' | 'features';
}

const faqItems: FaqItem[] = [
  {
    id: '1',
    question: 'What is WisdomIsFun?',
    answer:
      'WisdomIsFun is an AI-powered platform designed to help students prepare for NEET/JEE exams. It uses artificial intelligence to generate personalized practice quizzes, track performance, and provide insights to help you study smarter.',
    category: 'general',
  },
  {
    id: '2',
    question: 'How does the AI quiz generation work?',
    answer:
      'You can specify topics, a difficulty level (easy, medium, hard), and the number of questions. Our AI then crafts a unique multiple-choice quiz tailored to your requirements, complete with detailed explanations for each answer.',
    category: 'quizzes',
  },
    {
    id: '3',
    question: 'What is the Pomodoro timer for?',
    answer:
      'The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Our integrated timer helps you stay focused during study sessions and avoid burnout.',
    category: 'features',
  },
  {
    id: '4',
    question: 'Can I track my progress?',
    answer:
      'Yes! The dashboard provides detailed analytics of your performance, including your average scores, weakest subjects, and progress over time. This helps you identify areas that need more attention.',
    category: 'features',
  },
    {
    id: '5',
    question: 'What subjects are covered?',
    answer:
      'WisdomIsFun is designed for NEET and JEE aspirants, covering the core subjects: Physics, Chemistry, and Biology. You can generate quizzes on a wide range of topics within these subjects.',
    category: 'quizzes',
  },
  {
    id: '6',
    question: 'Can I save questions to review later?',
    answer:
      'Absolutely. You can bookmark any question during a quiz. All bookmarked questions are saved in a dedicated section, allowing you to easily review them and their explanations anytime.',
    category: 'features',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'quizzes', label: 'Quizzes' },
  { id: 'features', label: 'Features' },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-foreground/60 mt-3 max-w-2xl">
            Find answers to common questions about WisdomIsFun and how to use our
            platform to ace your exams.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="mx-auto max-w-4xl space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'border-border h-fit overflow-hidden rounded-xl border',
                   'bg-card/50'
                )}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className="text-foreground text-lg font-medium">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {expandedId === faq.id ? (
                      <Minus className="text-primary h-5 w-5" />
                    ) : (
                      <Plus className="text-primary h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-border border-t px-6 pt-2 pb-6">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <Button asChild>
            <Link href="/signup">Get Started and Find Out</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
