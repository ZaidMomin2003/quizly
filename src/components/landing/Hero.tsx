
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              AI-Powered Learning
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Supercharge Your Exam Prep
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Generate unlimited multiple-choice questions, track your progress, and master key concepts for the NEET/JEE exams with our intelligent platform.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/signup">
                  <Sparkles className="mr-2" />
                  Start Learning for Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/1200x800.png"
            alt="Hero Image"
            width={1200}
            height={800}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            data-ai-hint="student studying"
          />
        </div>
      </div>
    </section>
  );
}
