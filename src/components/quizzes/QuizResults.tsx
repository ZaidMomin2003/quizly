'use client';

import type { Quiz } from '@/ai/flows/generate-quiz-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle, Repeat } from 'lucide-react';
import { Header } from '../dashboard/Header';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Link from 'next/link';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

interface QuizResultsProps {
  quiz: Quiz;
  results: { questionIndex: number; answer: string; isCorrect: boolean }[];
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Quiz Results</CardTitle>
                    <CardDescription>
                        You completed the quiz on: {quiz.topics.join(', ')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 items-center">
                    <div className='flex flex-col items-center justify-center'>
                        <div className="text-6xl font-bold text-primary">{score}%</div>
                        <div className="text-muted-foreground mt-2">
                            You answered {correctCount} out of {results.length} questions correctly.
                        </div>
                         <div className="flex gap-4 mt-6">
                            <Button onClick={onRetake}>
                                <Repeat className="mr-2" />
                                Take Another Quiz
                            </Button>
                             <Button variant="outline" asChild>
                                <Link href="/">Back to Dashboard</Link>
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
                                    <AccordionTrigger className={cn("text-left hover:no-underline", result.isCorrect ? 'text-green-500' : 'text-red-500')}>
                                        <div className='flex items-center gap-4'>
                                            {result.isCorrect ? <CheckCircle2 /> : <XCircle />}
                                            <span className="flex-1 font-semibold">{question.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-4">
                                        <div className="text-muted-foreground">
                                            <p><span className="font-semibold text-foreground">Your Answer:</span> {result.answer || 'Not answered'}</p>
                                            {!result.isCorrect && <p><span className="font-semibold text-foreground">Correct Answer:</span> {question.answer}</p>}
                                        </div>
                                        <div className="p-4 bg-accent/50 rounded-lg">
                                            <h4 className="font-semibold mb-2">Explanation</h4>
                                            <p className="text-muted-foreground">{question.explanation}</p>
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
