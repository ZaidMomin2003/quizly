
'use client';

import { Bot, Briefcase, Building, Sparkles, University, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';

const partners = [
    { name: 'application', icon: Sparkles },
    { name: 'business', icon: Briefcase },
    { name: 'company', icon: Building },
    { name: 'enterprise', icon: Users },
    { name: 'institute', icon: University },
    { name: 'organization', icon: Users },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <style jsx global>{`
        body {
          background-color: #0A0A0C;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }
      `}</style>
      <header className="px-4 lg:px-6 h-16 flex items-center w-full border-b border-border/40">
        <Link href="#" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">QuizlyAI</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="/dashboard/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        </nav>
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
      </header>
      <main className="flex-1">
        <Hero />
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <p className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-8">
                    Trusted by 10,000+ companies around the world
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                    {partners.map(partner => (
                        <div key={partner.name} className="flex items-center gap-2">
                           <partner.icon className="h-5 w-5 text-muted-foreground" />
                           <span className="text-muted-foreground font-semibold capitalize">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <Features />
      </main>
      <Footer />
    </div>
  );
}
