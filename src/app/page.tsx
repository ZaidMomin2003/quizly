

'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
       <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">QuizlyAI</span>
        </Link>
        <div className="hidden lg:flex items-center gap-4 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
        </div>
         <nav className="ml-auto flex lg:hidden gap-4 sm:gap-6 items-center">
           <Button variant="ghost" asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
