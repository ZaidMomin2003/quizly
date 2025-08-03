
'use client';

import Link from 'next/link';
import { Bot, FileText, Ban, RotateCw } from 'lucide-react';

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

export default function CancellationAndRefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">WisdomIsFun</span>
        </Link>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
                    Cancellation & Refund Policy
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Last updated: July 26, 2024
                </p>
            </div>

            <div className="prose prose-lg dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight max-w-none text-foreground/90">
                <p>
                    At WisdomIsFun, we aim for clarity and fairness in all our policies. This document outlines our policy on subscription cancellations and refunds.
                </p>

                <div className="mt-8 flex items-start gap-4 p-4 border rounded-lg bg-card">
                    <RotateCw className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="mt-0 text-2xl">Subscription Cancellation</h2>
                        <p>
                            You have the flexibility to cancel your subscription at any time. You can manage your subscription and initiate a cancellation from your account settings page.
                        </p>
                        <p>
                           Upon cancellation, you will continue to have full access to all premium features of WisdomIsFun until the end of your current, pre-paid subscription period. Your subscription will not be renewed, and you will not be charged again unless you choose to purchase a new plan.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-start gap-4 p-4 border rounded-lg bg-card">
                    <Ban className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                         <h2 className="mt-0 text-2xl">Refund Policy</h2>
                        <p>
                            Due to the digital nature of our service and the immediate access provided to our AI-powered content and features upon subscription, **we do not offer refunds**. All sales are final.
                        </p>
                        <p>
                            We encourage you to explore the features of WisdomIsFun to ensure it meets your needs before subscribing. If you have any issues or concerns with the service, please do not hesitate to reach out to our support team.
                        </p>
                    </div>
                </div>
                

                <h2 className="mt-8">Contact Us</h2>
                <p>
                    If you have any questions about our Cancellation and Refund Policy, please contact us at <a href="mailto:hii@support.wisdomis.fun" className="text-primary hover:underline">hii@support.wisdomis.fun</a>. We are here to help.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
