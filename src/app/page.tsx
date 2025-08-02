
'use client';

import Link from 'next/link';
import { Bot, Lightbulb, UserCheck, TimerIcon, PenSquare, BarChart, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { FAQ } from '@/components/landing/FAQ';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';
import { Testimonials } from '@/components/auth/Testimonials';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <style jsx global>{`
        body {
          background-color: #050505;
          background-image: radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0);
          background-size: 2rem 2rem;
        }
      `}</style>

      <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">QuizlyAI</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </nav>
        <div className="hidden lg:flex items-center gap-4 ml-6">
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
        <Features />
        <section id="testimonials" className="py-12 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Trusted by Students Everywhere</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        See what aspiring doctors and engineers are saying about QuizlyAI.
                    </p>
                </div>
                <div className="mt-12">
                    <Testimonials />
                </div>
            </div>
        </section>
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
