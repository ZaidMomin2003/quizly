
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-background pt-32 pb-10 font-light text-foreground antialiased md:pt-20 md:pb-16"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)',
      }}
    >
      <div
        className="absolute top-0 right-0 h-1/2 w-1/2"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.15) 0%, hsl(var(--background) / 0) 60%)',
        }}
      />
      <div
        className="absolute top-0 left-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.15) 0%, hsl(var(--background) / 0) 60%)',
        }}
      />

      <div className="relative z-10 container mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="mb-6 inline-block rounded-full border border-primary/30 px-3 py-1 text-xs text-primary">
            THE FUTURE OF EXAM PREPARATION
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl font-headline">
            Study Smarter with{' '}
            <span className="text-primary">AI-Powered</span> Practice Quizzes
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/60 md:text-xl">
            QuizlyAI combines artificial intelligence with cutting-edge learning
            strategies to help you conquer NEET/JEE with precision and ease.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started For Free
              </Link>
            </Button>
            <Button variant="link" asChild>
                <Link
                href="#features"
                className="flex w-full items-center justify-center gap-2 text-foreground/70 transition-colors hover:text-foreground sm:w-auto"
                >
                <span>Learn how it works</span>
                <ChevronDown className="h-4 w-4" />
                </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <div className="relative flex h-40 w-full overflow-hidden md:h-64">
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt="Globe background"
              className="absolute top-0 left-1/2 -z-10 mx-auto -translate-x-1/2 px-4 opacity-30"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_hsl(var(--primary)/0.2)]">
            <img
              src="/dashboard.jpg"
              alt="QuizlyAI Dashboard"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg border border-white/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
