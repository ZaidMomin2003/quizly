
'use client';

import { useState } from 'react';
import type { Quiz } from '@/ai/schemas/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronsLeft, ChevronsRight, Check, X, Repeat } from 'lucide-react';
import { QuizResults } from './QuizResults';
import { cn } from '@/lib/utils';
import { Header } from '../dashboard/Header';
import { useAnalyticsStore } from '@/stores/analytics-store';

interface QuizTakerProps {
  quiz: Quiz;
  onRetake: () => void;
}

type Answer = {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
};

export function QuizTaker({ quiz, onRetake }: QuizTakerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const { logQuiz } = useAnalyticsStore();

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

  const handleSubmit = () => {
    const results = quiz.questions.map((q, i) => ({
        topic: quiz.topics[0] || 'General', // simplistic mapping
        isCorrect: selectedAnswers[i] === q.answer,
    }));

    // Correctly determine the subject.
    // A more robust implementation might check all topics.
    const firstTopic = quiz.topics[0]?.toLowerCase() || '';
    let subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mixed' = 'Mixed';
    if (firstTopic.includes('physics')) subject = 'Physics';
    else if (firstTopic.includes('chemistry')) subject = 'Chemistry';
    else if (firstTopic.includes('biology')) subject = 'Biology';

    logQuiz({
        topics: quiz.topics,
        questions: results,
        subject: subject,
    });
    setIsFinished(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  if (isFinished) {
    const results: Answer[] = quiz.questions.map((q, i) => ({
      questionIndex: i,
      answer: selectedAnswers[i],
      isCorrect: selectedAnswers[i] === q.answer,
    }));
    return <QuizResults quiz={quiz} results={results} onRetake={onRetake} score={calculateScore()} />;
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
                        <CardTitle className="text-2xl leading-relaxed">
                            {currentQuestion.question}
                        </CardTitle>
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
                            disabled={!selectedAnswers[currentQuestionIndex]}
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
