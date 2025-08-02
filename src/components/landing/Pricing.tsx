
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg p-8 h-full flex flex-col",
    "transform-gpu transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl",
    className
  )}>
    {children}
  </div>
);

const pricingPlans = [
    {
        name: "1 Month",
        price: "₹399",
        description: "Perfect for a quick boost.",
        features: [
            "Unlimited Topics",
            "Unlimited Question Generation",
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
            "Unlimited Test Series",
            "AI Weakness Analysis",
        ],
        buttonText: "Choose Plan",
        isPopular: true,
    },
    {
        name: "2 Years",
        price: "₹6,999",
        originalPrice: "₹9,576",
        description: "For the dedicated learner.",
        features: [
            "Unlimited Topics",
            "Unlimited Question Generation",
            "Unlimited Test Series",
            "AI Weakness Analysis",
        ],
        buttonText: "Choose Plan",
        isPopular: false,
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="w-full py-12 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Flexible Pricing for Every Student</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Choose the plan that fits your preparation journey. Cancel anytime.
                    </p>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <GlassCard key={index} className={plan.isPopular ? 'border-primary/50' : ''}>
                             {plan.isPopular && (
                                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 flex items-center gap-2">
                                    <Crown className="h-4 w-4" />
                                    Best Value
                                </Badge>
                            )}
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold font-headline mb-2">{plan.name}</h3>
                                 <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.originalPrice && (
                                        <span className="text-muted-foreground line-through">{plan.originalPrice}</span>
                                    )}
                                </div>
                                <p className="text-muted-foreground">{plan.description}</p>
                            </div>
                           
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-green-400" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                             <Button size="lg" variant={plan.isPopular ? 'default' : 'outline'} className="w-full">
                                {plan.buttonText}
                            </Button>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
