'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, Dna, FlaskConical, Timer, type LucideIcon, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

const icons = {
  atom: Atom,
  'flask-conical': FlaskConical,
  dna: Dna,
  timer: Timer,
};

type IconName = keyof typeof icons;

interface SubjectStatsCardProps {
  subject: string;
  solved: number;
  iconName: IconName;
  color: string;
  bgColor: string;
}

export function SubjectStatsCard({ subject, solved, iconName, color, bgColor }: SubjectStatsCardProps) {
  const Icon = icons[iconName];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{subject}</CardTitle>
        <div className={cn('p-2 rounded-lg', bgColor)}>
          {Icon && <Icon className={cn('h-5 w-5', color)} />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{solved}</div>
        <p className="text-xs text-muted-foreground">Completed</p>
      </CardContent>
    </Card>
  );
}
