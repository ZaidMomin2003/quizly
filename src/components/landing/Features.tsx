
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Search, BarChart, Calendar, Mail, FileText } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const features = [
    {
        icon: <User className="h-6 w-6 text-primary" />,
        title: "User Information",
        description: "Lorem ipsum dolor sit amet elit sed consectetur adipiscing.",
    },
    {
        icon: <Search className="h-6 w-6 text-primary" />,
        title: "Deal tracking",
        description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
        icon: <BarChart className="h-6 w-6 text-primary" />,
        title: "Pipeline management",
        description: "Duis aute irure dolor in reprehenderit in voluptate.",
    },
     {
        icon: <FileText className="h-6 w-6 text-primary" />,
        title: "Reporting dashboard",
        description: "Ut enim ad minim veniam, quis nostrud exercitation amet.",
    },
     {
        icon: <Calendar className="h-6 w-6 text-primary" />,
        title: "Meeting scheduling",
        description: "Duis aute irure dolor in amet reprehenderit in voluptate.",
    },
     {
        icon: <Mail className="h-6 w-6 text-primary" />,
        title: "Email tracking",
        description: "Lorem ipsum dolor sit amet elit consectetur adipiscing.",
    },
]

export function Features() {
  return (
    <>
    <section id="features" className="w-full py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Powerful features to help you close sales faster.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                 <div key={index} className="flex items-start gap-4">
                    <div>{feature.icon}</div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                 </div>
            ))}
        </div>
         <div className="mt-12 text-center">
            <Button>Get Started</Button>
            <Button variant="link" className="text-foreground">Browse all features</Button>
        </div>
      </div>
    </section>

    <section className="w-full py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                     <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                        Manage all your prospects in one place.
                    </h2>
                    <p className="text-muted-foreground md:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </p>
                    <p className="text-muted-foreground md:text-lg">
                        Et ac adipiscing quis enim mi turpis etiam faucibus. Faucibus condimentum amet placerat duis.
                    </p>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Image
                        src="https://placehold.co/400x500.png"
                        alt="Prospect Card"
                        width={400}
                        height={500}
                        className="rounded-lg shadow-lg border border-white/10"
                        data-ai-hint="contact card"
                    />
                     <Image
                        src="https://placehold.co/400x500.png"
                        alt="Analytics graphs"
                        width={400}
                        height={500}
                        className="rounded-lg shadow-lg border border-white/10"
                        data-ai-hint="analytics graphs"
                    />
                </div>
            </div>
        </div>
    </section>
    </>
  );
}
