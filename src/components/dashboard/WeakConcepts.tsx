

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Lightbulb } from 'lucide-react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function WeakConcepts() {
  const { getTopWeakConcepts } = useAnalyticsStore();
  const [weakConcepts, setWeakConcepts] = useState<{topic: string, count: number}[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
    setWeakConcepts(getTopWeakConcepts(5));
  }, [getTopWeakConcepts]);

  const handlePractice = (topic: string) => {
    sessionStorage.setItem('quickQuizData', JSON.stringify({
        topics: topic,
        numberOfQuestions: 5,
        difficulty: 'medium',
    }));
    router.push('/dashboard/quizzes');
  }

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
        {isClient && weakConcepts.length > 0 ? (
            <ul className="space-y-4">
            {weakConcepts.map((concept, index) => (
                <li key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className='p-2 bg-accent rounded-md'>
                        <Book className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="font-semibold">{concept.topic}</p>
                        <p className="text-xs text-muted-foreground">Incorrect {concept.count} times</p>
                    </div>
                </div>
                <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handlePractice(concept.topic)}
                >
                    Practice
                </Badge>
                </li>
            ))}
            </ul>
        ) : (
            <div className="text-center py-8 text-muted-foreground">
                <p>No weak concepts identified yet. Keep taking quizzes!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
