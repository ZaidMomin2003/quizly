
'use client';

import Link from 'next/link';
import { Bot, FileText, Target, Lightbulb, Heart } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12 px-4 md:px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                     <Link href="/" className="flex items-center space-x-2">
                        <Bot className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold font-headline">WisdomIsFun</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">AI-Powered NEET/JEE Practice Quizzes.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/terms-and-conditions" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
                        <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-primary">Service Delivery</Link></li>
                        <li><Link href="/cancellation-and-refund-policy" className="text-muted-foreground hover:text-primary">Cancellation & Refund</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about-us" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                        <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                        <li><Link href="/#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                        <li><Link href="/#faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Contact</h4>
                     <a href="mailto:hii@support.wisdomis.fun" className="text-sm text-muted-foreground hover:text-primary">hii@support.wisdomis.fun</a>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} WisdomIsFun. All rights reserved.
            </div>
        </footer>
    );
}

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">WisdomIsFun</span>
        </Link>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
                    Our Story: The Quest for Smarter Learning
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    WisdomIsFun was born from a simple yet powerful idea: competitive exam preparation shouldn't be a one-size-fits-all experience. It should be personal, adaptive, and empowering.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="p-6 border rounded-lg bg-card">
                    <Target className="mx-auto h-12 w-12 text-primary" />
                    <h2 className="mt-4 text-2xl font-bold font-headline">Our Vision</h2>
                    <p className="mt-2 text-muted-foreground">
                        To make high-quality, personalized education accessible to every student, everywhere, breaking down barriers to success.
                    </p>
                </div>
                <div className="p-6 border rounded-lg bg-card">
                    <Lightbulb className="mx-auto h-12 w-12 text-primary" />
                    <h2 className="mt-4 text-2xl font-bold font-headline">Our Mission</h2>
                    <p className="mt-2 text-muted-foreground">
                        To empower NEET and JEE aspirants by providing intelligent, adaptive, and engaging learning tools that build confidence and drive success.
                    </p>
                </div>
            </div>

            <div className="prose prose-lg dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight max-w-none text-foreground/90">
                <div className="mt-8 flex items-start gap-4 p-6 border rounded-lg bg-card">
                     <Heart className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="mt-0 text-3xl">Why We Built WisdomIsFun</h2>
                        <p>
                            Having navigated the intense pressure of NEET and JEE preparations ourselves, we know the challenges students face: endless syllabi, generic question banks, and the struggle to identify and overcome personal weak spots. We dreamed of a smarter way to study.
                        </p>
                        <p>
                           We envisioned a platform that acts like a personal tutor—one that understands your unique learning pace, pinpoints your areas for improvement, and provides limitless, targeted practice. By harnessing the power of AI, we built WisdomIsFun to turn that vision into a reality. It's more than just a quiz app; it's a dedicated study partner designed to help you learn more effectively and achieve your academic dreams with confidence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
