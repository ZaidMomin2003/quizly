
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Star = ({ className }: { className?: string }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);


export function Hero() {
  return (
    <section id="hero" className="w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-green-400 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-[30%] right-[-15%] w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-background/30 to-background"></div>

       <div className="container mx-auto px-4 md:px-6 text-center relative z-20 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto flex flex-col items-center">

            <Link href="/changelog" className="group mb-6">
                 <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground transition-all hover:bg-white/10">
                    <span className='text-primary font-semibold'>v0.2 is here!</span>
                    <span className="hidden sm:inline">Read the changelog</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </Link>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                Master Your Exams with AI-Powered Practice
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Stop searching for practice tests. Generate infinite, customized MCQs for NEET/JEE, track your progress, and conquer your weakest subjects with QuizlyAI.
            </p>
            <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button asChild size="lg" className="group relative overflow-hidden">
                  <Link href="/signup">
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-white backdrop-blur-3xl">
                      <span className="z-10">Get Started For Free</span>
                    </div>
                  </Link>
                </Button>
                 <Button asChild variant="outline" size="lg">
                    <Link href="#pricing">View Pricing</Link>
                </Button>
            </div>
        </div>
      </div>

       {/* Floating decorative elements */}
       <Star className="absolute top-[15%] left-[5%] h-8 w-8 text-primary/50 animate-pulse" />
       <Star className="absolute top-[25%] right-[10%] h-6 w-6 text-green-400/50 animate-pulse animation-delay-1000" />
       <Star className="absolute bottom-[20%] left-[15%] h-10 w-10 text-purple-400/50 animate-pulse animation-delay-2000" />
       <Star className="absolute bottom-[10%] right-[20%] h-5 w-5 text-primary/50 animate-pulse animation-delay-3000" />

    </section>
  );
}
