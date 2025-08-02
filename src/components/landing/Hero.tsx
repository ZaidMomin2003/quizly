
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="hero" className="w-full pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
            An AI platform for power users.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Sit ut ame elit sed eiusmod tempor, orem ipsum dolor sit amet, consectur adpiscing elit sed do. Aliquam proin id purus tellus condimentum integer.
          </p>
          <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Button asChild size="lg">
              <Link href="/signup">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
            <Image
                src="https://placehold.co/1200x600.png"
                alt="Dashboard Preview"
                width={1200}
                height={600}
                className="rounded-xl shadow-2xl shadow-primary/10 border border-primary/20"
                data-ai-hint="dashboard analytics"
            />
        </div>

      </div>
    </section>
  );
}
