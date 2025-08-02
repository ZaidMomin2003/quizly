'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const TIERS = [
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


const PricingCard = ({ tier }: { tier: (typeof TIERS)[number] }) => {
  const { name, price, originalPrice, description, features, buttonText, isPopular } = tier;

  return (
    <motion.div
        className={cn(
            'relative flex flex-col gap-6 rounded-2xl border p-6 shadow-sm',
            'bg-card text-card-foreground',
            isPopular && 'border-2 border-primary shadow-lg',
        )}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
      {isPopular && (
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">
              <Crown className="mr-2 h-4 w-4" />
              Best Value
          </Badge>
      )}

      <div className="text-center">
        <h2 className="text-2xl font-semibold font-headline">{name}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>


      <div className="relative text-center">
         <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold">{price}</span>
            {originalPrice && (
                <span className="text-muted-foreground line-through">{originalPrice}</span>
            )}
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className='flex items-center gap-3 text-muted-foreground'
            >
              <CheckCircle2 size={16} className="text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        className='w-full'
        size="lg"
        variant={isPopular ? 'default' : 'outline'}
      >
        <Zap className="mr-2" />
        {buttonText}
      </Button>
    </motion.div>
  );
};

export function Pricing() {
  return (
    <section className="flex flex-col items-center gap-10 py-16 sm:py-24">
       <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
            Find a plan that's right for you.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Flexible pricing for every student. Cancel anytime.
          </p>
        </div>

      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, i) => (
          <PricingCard
            key={i}
            tier={tier}
          />
        ))}
      </div>
    </section>
  );
}
