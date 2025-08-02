
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Star = ({ className }: { className?: string }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);


export function Hero() {
  return (
    <section id="hero" className="w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-400 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-[20%] right-[-15%] w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

       <div className="container mx-auto px-4 md:px-6 text-center relative z-10 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Master Your Exams with AI-Powered Practice
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Stop searching for practice tests. Generate infinite, customized MCQs for NEET/JEE, track your progress, and conquer your weakest subjects with QuizlyAI.
            </p>
            <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button asChild size="lg">
                <Link href="/signup">
                    Start Practicing for Free
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
