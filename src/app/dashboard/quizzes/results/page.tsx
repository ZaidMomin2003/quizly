

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizResults as QuizResultsComponent } from '@/components/quizzes/QuizResults';
import type { Quiz } from '@/ai/schemas/quiz';
import type { QuizResult } from '@/components/quizzes/QuizTaker';
import { Header } from '@/components/dashboard/Header';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StoredResults {
  quiz: Quiz;
  results: QuizResult[];
}

export default function QuizResultsPage() {
  const [resultsData, setResultsData] = useState<StoredResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const dataString = sessionStorage.getItem('quizResultsToShow');
    if (dataString) {
      try {
        const data = JSON.parse(dataString);
        setResultsData(data);
        // Do not remove the item, so it persists on refresh
      } catch (error) {
        console.error("Failed to parse results data from session storage", error);
        router.push('/dashboard'); // Redirect if data is invalid
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      // Optional: redirect if no data is found, or show a message
    }
  }, [router]);

  const handleRetake = () => {
    if (resultsData) {
        sessionStorage.setItem('quickQuizData', JSON.stringify({
            topics: resultsData.quiz.topics.join(', '),
            numberOfQuestions: resultsData.quiz.questions.length,
            difficulty: resultsData.quiz.difficulty,
        }));
        router.push('/dashboard/quizzes');
    }
  };

  const calculateScore = () => {
    if (!resultsData) return 0;
    const correctCount = resultsData.results.filter(r => r.isCorrect).length;
    return Math.round((correctCount / resultsData.results.length) * 100);
  };

  if (isLoading) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-semibold">Loading Results...</h2>
            </main>
        </div>
    );
  }

  if (!resultsData) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-xl font-semibold">No Quiz Results Found</h2>
                <p className="text-muted-foreground">It looks like there are no quiz results to display.</p>
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </main>
        </div>
    );
  }

  return (
    <QuizResultsComponent
      quiz={resultsData.quiz}
      results={resultsData.results}
      score={calculateScore()}
      onRetake={handleRetake}
    />
  );
}
