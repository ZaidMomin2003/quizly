
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="w-full py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-1 items-center justify-items-center">
          <div className="space-y-4 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              AI-Powered Learning
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Supercharge Your Exam Prep
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
              Generate unlimited multiple-choice questions, track your progress, and master key concepts for the NEET/JEE exams with our intelligent platform.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
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
          <div className="w-full max-w-4xl mx-auto">
            <div className="rounded-xl shadow-2xl border border-border/20 overflow-hidden">
                <Image
                    src="https://placehold.co/1200x800.png"
                    alt="Hero Image"
                    width={1200}
                    height={800}
                    className="mx-auto aspect-video object-cover object-center"
                    data-ai-hint="student studying laptop"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
