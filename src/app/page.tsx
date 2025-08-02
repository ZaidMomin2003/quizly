
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="sr-only">QuizlyAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">
              Login
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to QuizlyAI
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Your AI-powered study partner for NEET/JEE preparation.
            </p>
            <Button asChild size="lg">
                <Link href="/signup">Start Learning for Free</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
