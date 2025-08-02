
'use client';

import { Header } from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Crown, Zap } from 'lucide-react';

const pricingPlans = [
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

export default function PricingPage() {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Find a plan that's right for you.
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Flexible pricing for every student. Cancel anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <Card key={index} className={`flex flex-col ${plan.isPopular ? 'border-primary border-2 shadow-lg' : ''}`}>
                                {plan.isPopular && (
                                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">
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

                    <div className="mt-16 text-center text-muted-foreground">
                        <p>All plans come with 24/7 customer support and access to our community forums.</p>
                        <p>Prices are in INR and include all applicable taxes.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
