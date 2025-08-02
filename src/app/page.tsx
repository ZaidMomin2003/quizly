
'use client';

import { Bot, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/auth/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { Pricing } from '@/components/landing/Pricing';
import { Contact } from '@/components/landing/Contact';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body dark-theme-bg">
       <style jsx global>{`
        .dark-theme-bg {
            background-color: #09090b;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 3rem 3rem;
        }
        .light-theme-bg {
            background-color: #ffffff;
            background-image: 
                linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
            background-size: 3rem 3rem;
        }
      `}</style>
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">QuizlyAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">Features</Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">Pricing</Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">Contact</Link>
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
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 font-headline">Loved by Students Everywhere</h2>
                <Testimonials />
            </div>
        </section>
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
