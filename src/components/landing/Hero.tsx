
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Star } from 'lucide-react';

const StarIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);


export function Hero() {
  return (
    <section id="hero" className="relative w-full py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <StarIcon className="absolute w-16 h-16 text-white/10 top-20 right-1/4" />
        <StarIcon className="absolute w-24 h-24 text-white/10 top-1/2 left-1/4" />
         <StarIcon className="absolute w-12 h-12 text-white/10 bottom-20 left-1/2" />


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-1 items-center justify-items-center">
          <div className="space-y-4 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold border border-white/10">
              AI-Powered Learning
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
              Boost Your Exam Score
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
              Generate unlimited multiple-choice questions, track your progress, and master key concepts for the NEET/JEE exams with our intelligent platform.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  <Sparkles className="mr-2" />
                  Start For Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className='bg-background/50 border-white/20'>
                <Link href="#features">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
