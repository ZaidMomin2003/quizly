
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Crown, Zap } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useState } from 'react';
import { cn } from '@/lib/utils';


const pricingPlans = {
    monthly: [
        {
            name: "1 Month",
            price: "₹399",
            description: "Perfect for a quick boost.",
            features: [
                "Unlimited Topics",
                "Unlimited Question Generation",
                "Unlimited Flashcards Generation",
                "Unlimited Test Series",
            ],
            buttonText: "Choose Plan",
            isPopular: false,
        },
    ],
    yearly: [
        {
            name: "1 Year",
            price: "₹3,999",
            originalPrice: "₹4,788",
            description: "Best value for long-term success.",
            features: [
                "Unlimited Topics",
                "Unlimited Question Generation",
                "Unlimited Flashcards Generation",
                "Unlimited Test Series",
            ],
            buttonText: "Choose Plan",
            isPopular: true,
        },
    ]
}


const allPlans = [
    {
        name: "1 Month",
        price: "₹399",
        originalPrice: null,
        description: "Perfect for a quick boost.",
        features: [
            "Unlimited Topics",
            "Unlimited Question Generation",
            "Unlimited Flashcards Generation",
            "Unlimited Test Series",
        ],
        buttonText: "Choose Plan",
        isPopular: false,
    },
    {
        name: "3 Months",
        price: "₹1,099",
        originalPrice: "₹1,197",
        description: "Ideal for focused preparation.",
        features: [
            "Unlimited Topics",
            "Unlimited Question Generation",
            "Unlimited Flashcards Generation",
            "Unlimited Test Series",
        ],
        buttonText: "Choose Plan",
        isPopular: false,
    },
    {
        name: "1 Year",
        price: "₹3,999",
        originalPrice: "₹4,788",
        description: "Best value for long-term success.",
        features: [
            "Unlimited Topics",
            "Unlimited Question Generation",
            "Unlimited Flashcards Generation",
            "Unlimited Test Series",
        ],
        buttonText: "Choose Plan",
        isPopular: true,
    },
    {
        name: "2 Years",
        price: "₹6,999",
        originalPrice: "₹9,576",
        description: "For the dedicated, long-haul learner.",
        features: [
            "Unlimited Topics",
            "Unlimited Question Generation",
            "Unlimited Flashcards Generation",
            "Unlimited Test Series",
        ],
        buttonText: "Choose Plan",
        isPopular: false,
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="w-full py-12 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-2">
                        Pricing
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Find a plan that's right for you
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-xl/relaxed">
                        Flexible pricing for every student. Cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {allPlans.map((plan, index) => (
                        <Card key={index} className={cn('flex flex-col', plan.isPopular ? 'border-primary border-2 shadow-lg relative' : '')}>
                            {plan.isPopular && (
                                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1">
                                    <Crown className="mr-2 h-4 w-4" />
                                    Best Value
                                </Badge>
                            )}
                            <CardHeader className="items-center text-center">
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.originalPrice && (
                                        <span className="text-muted-foreground line-through">{plan.originalPrice}</span>
                                    )}
                                </div>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'outline'}>
                                    <Zap className="mr-2" />
                                    {plan.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
