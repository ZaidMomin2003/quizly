
'use client';

import Link from 'next/link';
import { Bot, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold font-headline">QuizlyAI</span>
        </Link>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="prose prose-lg dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight max-w-none text-foreground/90">
                <p>
                    This Privacy Policy describes how Quizly ("we", "us", or "our") collects, uses, and discloses your information when you use our website and services (collectively, the "Service").
                </p>

                <h2 className="mt-8">1. Information We Collect</h2>
                <p>
                    We collect information that you provide directly to us when you create an account and use the Service. The types of personal information we may collect include:
                </p>
                <ul>
                    <li><strong>Full Name</strong></li>
                    <li><strong>Email Address</strong></li>
                    <li><strong>Contact Number</strong></li>
                </ul>

                <h2 className="mt-8">2. How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Provide, operate, and maintain our Service.</li>
                    <li>Personalize your learning experience.</li>
                    <li>Process transactions and send you related information, including confirmations and invoices.</li>
                    <li>Communicate with you about products, services, offers, and events offered by Quizly.</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our Service.</li>
                </ul>

                <h2 className="mt-8">3. Sharing of Information</h2>
                <p>
                    We do not share or sell your personal information with third-party companies for their own marketing or promotional purposes. Your privacy is important to us.
                </p>

                <h2 className="mt-8">4. Data Security</h2>
                <p>
                    We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                </p>

                <h2 className="mt-8">5. Your Rights and Choices</h2>
                <p>
                    You have the right to access, update, or correct your personal information. You can also delete your account and associated data directly through a dedicated button within your account settings.
                </p>

                <h2 className="mt-8">6. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the "Last updated" date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
                </p>

                <h2 className="mt-8">7. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@quizly.ai" className="text-primary hover:underline">support@quizly.ai</a>.
                </p>
            </div>
        </div>
      </main>
    </div>
  );
}
