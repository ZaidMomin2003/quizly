
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Lightbulb } from 'lucide-react';

const weakConcepts = [
  { topic: 'Thermodynamics', subject: 'Physics' },
  { topic: 'Organic Chemistry', subject: 'Chemistry' },
  { topic: 'Rotational Motion', subject: 'Physics' },
  { topic: 'Genetics', subject: 'Biology' },
  { topic: 'Electrostatics', subject: 'Physics' },
];

export function WeakConcepts() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle>Weak Concepts</CardTitle>
        </div>
        <CardDescription>Topics to focus on for mastery.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {weakConcepts.map((concept, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className='p-2 bg-accent rounded-md'>
                    <Book className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-semibold">{concept.topic}</p>
                    <p className="text-xs text-muted-foreground">{concept.subject}</p>
                </div>
              </div>
              <Badge variant="outline">Practice</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
