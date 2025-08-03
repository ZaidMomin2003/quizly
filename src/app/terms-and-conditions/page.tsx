
'use client';

import Link from 'next/link';
import { Bot, FileText } from 'lucide-react';

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

export default function TermsAndConditionsPage() {
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
                    Terms and Conditions
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Last updated: July 26, 2024
                </p>
            </div>

            <div className="prose prose-lg dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight max-w-none text-foreground/90">
                <p>
                    Welcome to WisdomIsFun! These Terms and Conditions ("Terms") govern your use of the WisdomIsFun website, applications, and services (collectively, the "Service"), operated by WisdomIsFun. By accessing or using our Service, you agree to be bound by these Terms.
                </p>

                <h2 className="mt-8">1. Accounts</h2>
                <p>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. Each account is for a single user only. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
                </p>

                <h2 className="mt-8">2. Intellectual Property and Content Usage</h2>
                <p>
                    The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of WisdomIsFun. The content generated by the Service, including quizzes and explanations, is provided for your personal, non-commercial study purposes only. You are not permitted to redistribute, sell, or otherwise commercialize any content from our platform.
                </p>

                <h2 className="mt-8">3. Subscriptions</h2>
                <p>
                    WisdomIsFun offers various subscription plans for fixed terms (e.g., one month, one year). These plans are paid in advance and do not automatically renew. At the end of your subscription period, you will need to manually purchase a new plan to continue accessing the premium features of the Service.
                </p>

                <h2 className="mt-8">4. Termination</h2>
                <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Prohibited activities include, but are not limited to, sharing your account with others or attempting to commercialize the content provided by the Service.
                </p>
                
                <h2 className="mt-8">5. Disclaimer of Warranty</h2>
                <p>
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis. While WisdomIsFun is a powerful tool designed to aid in your exam preparation, we do not guarantee any specific outcomes or success in NEET/JEE or any other examination. Your success is dependent on your own effort, hard work, and study habits.
                </p>

                <h2 className="mt-8">6. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>

                <h2 className="mt-8">7. Changes to These Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page.
                </p>

                <h2 className="mt-8">8. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at <a href="mailto:hii@support.wisdomis.fun" className="text-primary hover:underline">hii@support.wisdomis.fun</a>.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
