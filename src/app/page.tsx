'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { Contact } from '@/components/landing/Contact';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
       <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">QuizlyAI</span>
        </Link>
        <div className="hidden lg:flex items-center gap-4 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
        </div>
         <nav className="ml-auto flex lg:hidden gap-4 sm:gap-6 items-center">
           <Button variant="ghost" asChild>
            <Link href="/dashboard">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}
