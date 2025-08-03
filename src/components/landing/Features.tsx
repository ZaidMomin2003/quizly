
'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lightbulb, ClipboardCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    step: 'Step 1',
    title: 'Generate Your Quiz',
    content:
      'Select your topics, difficulty, and number of questions. Our AI crafts a unique quiz tailored to your needs in seconds.',
    icon: <Lightbulb className="h-6 w-6" />,
    image: '/1.png',
  },
  {
    step: 'Step 2',
    title: 'Take & Analyze',
    content:
      'Complete the quiz and get instant results with detailed explanations for every question to understand the core concepts.',
    icon: <ClipboardCheck className="h-6 w-6" />,
    image: '/2.png',
  },
  {
    step: 'Step 3',
    title: 'Master & Repeat',
    content:
      'Our platform tracks your performance, identifying weak spots. Use these insights to focus your study and conquer your exams.',
    icon: <TrendingUp className="h-6 w-6" />,
    image: '/3.png',
  },
];

export function Features() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000); // Change feature every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features" className={'py-16 sm:py-24'}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="relative mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="font-body text-foreground/60 mt-3">
              WisdomIsFun helps you create, customize, and conquer your exams faster than ever before.
            </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-12">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex cursor-pointer items-start gap-4 md:gap-6"
                onClick={() => setCurrentFeature(index)}
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.5,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
                    index === currentFeature
                      ? 'border-primary bg-primary/10 text-primary scale-110 [box-shadow:0_0_15px_hsl(var(--primary)/0.3)]'
                      : 'border-muted-foreground/30 bg-muted text-muted-foreground',
                  )}
                >
                  {React.cloneElement(feature.icon, {
                    className: 'h-6 w-6 transition-colors',
                  })}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl font-headline">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base font-body">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'border-primary/20 relative order-1 h-[250px] overflow-hidden rounded-xl border [box-shadow:0_5px_30px_-15px_hsl(var(--primary)/0.2)] md:order-2 md:h-auto',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-contain object-center"
                        width={1000}
                        height={500}
                      />
                      <div className="from-background/80 via-background/70 absolute inset-0 bg-gradient-to-t to-transparent" />

                      <div className="bg-background/80 absolute bottom-4 left-4 rounded-lg p-2 backdrop-blur-sm">
                        <span className="text-primary text-xs font-medium">
                          {feature.step}
                        </span>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
