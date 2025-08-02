

'use client';

import type { Quiz } from '@/ai/schemas/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle, Repeat } from 'lucide-react';
import { Header } from '../dashboard/Header';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Link from 'next/link';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';
import type { QuizResult } from './QuizTaker';

interface QuizResultsProps {
  quiz: Quiz;
  results: QuizResult[];
  score: number;
  onRetake: () => void;
}

const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--destructive))'];

export function QuizResults({ quiz, results, score, onRetake }: QuizResultsProps) {
  const correctCount = results.filter(r => r.isCorrect).length;
  const incorrectCount = results.length - correctCount;

  const chartData = [
    { name: 'Correct', value: correctCount, fill: 'var(--color-correct)' },
    { name: 'Incorrect', value: incorrectCount, fill: 'var(--color-incorrect)' },
  ];

  const chartConfig = {
    correct: {
      label: 'Correct',
      color: 'hsl(var(--chart-2))',
    },
    incorrect: {
      label: 'Incorrect',
      color: 'hsl(var(--destructive))',
    },
  };

  const getCorrectAnswerText = (questionIndex: number) => {
      const question = quiz.questions[questionIndex];
      return question.options.find(opt => opt.startsWith(question.answer)) || 'N/A';
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl">Quiz Results</CardTitle>
                    <CardDescription>
                        You completed the quiz on: {quiz.topics.join(', ')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className='flex flex-col items-center justify-center text-center'>
                        <div className="text-5xl sm:text-6xl font-bold text-primary">{score}%</div>
                        <div className="text-muted-foreground mt-2">
                            You answered {correctCount} out of {results.length} questions correctly.
                        </div>
                         <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                            <Button onClick={onRetake} className="w-full sm:w-auto">
                                <Repeat className="mr-2" />
                                Take Another Quiz
                            </Button>
                             <Button variant="outline" asChild className="w-full sm:w-auto">
                                <Link href="/dashboard">Back to Dashboard</Link>
                            </Button>
                        </div>
                    </div>
                    <ChartContainer config={chartConfig} className='h-[250px] w-full'>
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    labelLine={false}
                                >
                                {chartData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Detailed Review</CardTitle>
                    <CardDescription>Review each question and its explanation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {quiz.questions.map((question, index) => {
                            const result = results[index];
                            return (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className={cn("text-left hover:no-underline text-base", result.isCorrect ? 'text-green-500' : 'text-red-500')}>
                                        <div className='flex items-start sm:items-center gap-4'>
                                            {result.isCorrect ? <CheckCircle2 className="mt-1 sm:mt-0" /> : <XCircle className="mt-1 sm:mt-0" />}
                                            <span className="flex-1 font-semibold">{question.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-4">
                                        <div className="text-muted-foreground text-sm sm:text-base">
                                            <p><span className="font-semibold text-foreground">Your Answer:</span> {result.answer || 'Not answered'}</p>
                                            {!result.isCorrect && <p><span className="font-semibold text-foreground">Correct Answer:</span> {getCorrectAnswerText(index)}</p>}
                                        </div>
                                        <div className="p-4 bg-accent/50 rounded-lg">
                                            <h4 className="font-semibold mb-2">Explanation</h4>
                                            <p className="text-muted-foreground text-sm sm:text-base">{question.explanation}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
