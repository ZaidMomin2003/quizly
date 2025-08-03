

'use client';

import { useState, useEffect } from 'react';
import type { Quiz, QuizQuestion } from '@/ai/schemas/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronsLeft, ChevronsRight, Bookmark } from 'lucide-react';
import { QuizResults } from './QuizResults';
import { cn } from '@/lib/utils';
import { Header } from '../dashboard/Header';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useBookmarkStore } from '@/stores/bookmark-store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface QuizTakerProps {
  quiz: Quiz;
  onRetake: () => void;
}

export type QuizResult = {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
};

// A helper to guess the subject from topics
const getSubjectFromTopics = (topics: string[]): 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics' | 'Mixed' => {
    const lowerCaseTopics = topics.join(' ').toLowerCase();
    if (lowerCaseTopics.includes('physic')) return 'Physics';
    if (lowerCaseTopics.includes('chem')) return 'Chemistry';
    if (lowerCaseTopics.includes('bio')) return 'Biology';
    if (lowerCaseTopics.includes('math')) return 'Mathematics';
    return 'Mixed';
};

export function QuizTaker({ quiz, onRetake }: QuizTakerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [finalResults, setFinalResults] = useState<QuizResult[]>([]);
  const { logQuiz } = useAnalyticsStore();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const { toast } = useToast();
  const router = useRouter();


  useEffect(() => {
    if (isFinished) {
        // Store results in session storage to persist across reloads on the results page
        sessionStorage.setItem('quizResultsToShow', JSON.stringify({
            quiz,
            results: finalResults,
        }));
        router.push('/dashboard/quizzes/results');
    }
  }, [isFinished, finalResults, quiz, router]);


  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const isCorrect = (questionIndex: number, answer: string) => {
    if (!answer) return false;
    const correctLetter = quiz.questions[questionIndex].answer;
    const selectedLetter = answer.split('.')[0];
    return selectedLetter === correctLetter;
  };

  const handleSubmit = () => {
    const results: QuizResult[] = quiz.questions.map((q, i) => ({
      questionIndex: i,
      answer: selectedAnswers[i] || 'Not Answered',
      isCorrect: isCorrect(i, selectedAnswers[i]),
    }));

    const questionDetails = quiz.questions.map((q, i) => ({
      topic: quiz.topics.find(t => q.question.toLowerCase().includes(t.toLowerCase())) || quiz.topics[0] || 'General',
      isCorrect: isCorrect(i, selectedAnswers[i]),
    }));

    logQuiz({
      quiz,
      results,
      analytics: {
        topics: quiz.topics,
        questions: questionDetails,
        subject: getSubjectFromTopics(quiz.topics),
      }
    });
    
    setFinalResults(results);
    setIsFinished(true);
  };
  
  const isBookmarked = (question: QuizQuestion) => {
    return bookmarks.some(b => b.question === question.question);
  }

  const handleBookmarkToggle = (question: QuizQuestion) => {
    const subject = getSubjectFromTopics(quiz.topics);
    if (isBookmarked(question)) {
      removeBookmark(question);
      toast({ title: "Bookmark Removed", description: "The question has been removed from your bookmarks." });
    } else {
      addBookmark({ ...question, subject: subject, date: new Date().toISOString(), id: question.question });
      toast({ title: "Bookmark Added", description: "The question has been saved to your bookmarks." });
    }
  }
  
  // QuizTaker UI is rendered here. When finished, isFinished becomes true,
  // and the useEffect will trigger the redirect to the results page.
  // We return null here while redirecting.
  if (isFinished) {
    return null; 
  }


  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-3xl space-y-6">
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h2 className="text-lg font-semibold text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </h2>
              <div className="text-lg font-semibold text-muted-foreground">
                {quiz.topics.join(', ')} - <span className='capitalize'>{quiz.difficulty}</span>
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-start gap-4'>
                <CardTitle className="text-2xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
                 <Button variant="ghost" size="icon" onClick={() => handleBookmarkToggle(currentQuestion)}>
                    <Bookmark className={cn(isBookmarked(currentQuestion) ? 'fill-primary text-primary' : 'text-muted-foreground')} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={handleAnswerSelect}
                value={selectedAnswers[currentQuestionIndex]}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <Label key={index}
                    className={cn(
                      "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                      "hover:bg-accent",
                      selectedAnswers[currentQuestionIndex] === option && "bg-primary/10 border-primary"
                    )}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <span className="text-base font-medium">{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              <ChevronsLeft className="mr-2" />
              Previous
            </Button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
              >
                Finish & See Results
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]}>
                Next
                <ChevronsRight className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
