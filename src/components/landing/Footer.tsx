
'use client';

import Link from "next/link";
import { Bot } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full py-6 px-4 md:px-6 border-t border-white/10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <p className="text-sm font-semibold font-headline">QuizlyAI</p>
                </div>
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} QuizlyAI. All rights reserved.</p>
                <nav className="flex gap-4 sm:gap-6">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                </nav>
            </div>
        </footer>
    )
}
