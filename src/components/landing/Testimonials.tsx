
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-primary/10 p-1 py-0.5 font-bold text-primary',
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
        'border-border bg-card/50 border shadow-sm',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground text-sm font-normal select-none">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-primary text-primary" />
          <Star className="size-4 fill-primary text-primary" />
          <Star className="size-4 fill-primary text-primary" />
          <Star className="size-4 fill-primary text-primary" />
          <Star className="size-4 fill-primary text-primary" />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-5 select-none">
        <img
          width={40}
          height={40}
          src={img || ''}
          alt={name}
          className="size-10 rounded-full ring-1 ring-primary/20 ring-offset-2"
        />

        <div>
          <p className="text-foreground font-medium">{name}</p>
          <p className="text-muted-foreground text-xs font-normal">{role}</p>
        </div>
      </div>
    </div>
  );
}
const testimonials = [
  {
    name: 'Anjali Sharma',
    role: 'NEET Aspirant',
    img: 'https://i.pravatar.cc/150?img=1',
    description: (
      <p>
        QuizlyAI has completely transformed my NEET preparation.
        <Highlight>
          The AI-generated quizzes target my weak spots perfectly.
        </Highlight>{' '}
        My scores have improved dramatically!
      </p>
    ),
  },
  {
    name: 'Rohan Gupta',
    role: 'JEE Aspirant',
    img: 'https://i.pravatar.cc/150?img=2',
    description: (
      <p>
        As a JEE aspirant, time is everything. This platform's quick quiz feature
        <Highlight>
          allows me to practice effectively, even in short bursts.
        </Highlight>{' '}
        It's a game-changer.
      </p>
    ),
  },
  {
    name: 'Priya Singh',
    role: 'Medical Student',
    img: 'https://i.pravatar.cc/150?img=3',
    description: (
      <p>
        The Pomodoro timer integrated into the dashboard is pure genius.
        <Highlight>
            It helps me stay focused and manage my study sessions
        </Highlight>{' '}
        without burning out.
      </p>
    ),
  },
  {
    name: 'Sameer Verma',
    role: 'NEET Aspirant',
    img: 'https://i.pravatar.cc/150?img=4',
    description: (
      <p>
        The detailed analytics are incredibly insightful.
        <Highlight>
          I can see exactly where I'm going wrong and focus my efforts.
        </Highlight>{' '}
        It feels like having a personal tutor.
      </p>
    ),
  },
  {
    name: 'Aditya Kumar',
    role: 'JEE Advanced Aspirant',
    img: 'https://i.pravatar.cc/150?img=5',
    description: (
      <p>
        The quality of questions is on par with the actual exams.
        <Highlight>
            The explanations are clear and help build a strong conceptual foundation.
        </Highlight>{' '}
        Highly recommended for serious aspirants.
      </p>
    ),
  },
  {
    name: 'Neha Reddy',
    role: 'AIIMS Aspirant',
    img: 'https://i.pravatar.cc/150?img=6',
    description: (
      <p>
        I love the bookmarking feature!
        <Highlight>
          I can save tricky questions and review them before my mock tests.
        </Highlight>{' '}
        It's been a huge help in my revision strategy.
      </p>
    ),
  },
];

const firstRow = testimonials.slice(0, 2);
const secondRow = testimonials.slice(2, 4);
const thirdRow = testimonials.slice(4, 6);

export function Testimonials() {
  return (
    <section className="relative container mx-auto py-10">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-foreground mb-4 text-center text-4xl leading-[1.2] font-bold tracking-tighter md:text-5xl font-headline">
          What Our Students Are Saying
        </h2>
        <h3 className="text-muted-foreground mx-auto mb-8 max-w-lg text-center text-lg font-medium tracking-tight text-balance">
          Don&apos;t just take our word for it. Here&apos;s what{' '}
          <span className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
            real aspirants
          </span>{' '}
          are saying about{' '}
          <span className="font-semibold text-primary">QuizlyAI</span>
        </h3>
      </motion.div>

      <div className="relative mt-6 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg md:flex-row">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:20s]">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s] md:[--duration:30s]">
          {thirdRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
      </div>
    </section>
  );
}
