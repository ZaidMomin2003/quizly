
'use client';

import { Bot } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Testimonials } from './Testimonials';

interface AuthLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <div className="flex min-h-screen items-center justify-center p-6 sm:p-12 lg:min-h-0">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <Link href="/" className="mb-4 inline-block">
                             <Bot className="h-10 w-10 text-primary mx-auto" />
                        </Link>
                        <CardTitle className="text-3xl">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
            <div className="hidden bg-muted lg:block">
                <Testimonials />
            </div>
        </div>
    );
}
