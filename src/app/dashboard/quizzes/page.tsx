

'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Plus, Trash, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/dashboard/Header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createQuiz } from '@/app/actions';
import type { Quiz, GenerateQuizInput } from '@/ai/schemas/quiz';
import { QuizTaker } from '@/components/quizzes/QuizTaker';
import { useToast } from '@/hooks/use-toast';
import { useAnalyticsStore } from '@/stores/analytics-store';

const quizFormSchema = z.object({
  topics: z.array(z.object({ value: z.string().min(1, 'Topic is required.') })).min(1, 'At least one topic is required.'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  numberOfQuestions: z.coerce.number().int().min(1, 'Number of questions must be at least 1.').max(20, 'Cannot generate more than 20 questions.'),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

// A helper to guess the subject from topics
const getSubjectFromTopics = (topics: string[], subject?: string): 'Physics' | 'Chemistry' | 'Biology' | 'Mixed' => {
    if (subject) {
        if (subject.toLowerCase().includes('physic')) return 'Physics';
        if (subject.toLowerCase().includes('chem')) return 'Chemistry';
        if (subject.toLowerCase().includes('bio')) return 'Biology';
    }
    const lowerCaseTopics = topics.join(' ').toLowerCase();
    if (lowerCaseTopics.includes('physic')) return 'Physics'; // Allow for "physics" or "physic"
    if (lowerCaseTopics.includes('chem')) return 'Chemistry';
    if (lowerCaseTopics.includes('bio')) return 'Biology';
    return 'Mixed';
};

export default function QuizzesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);
  const { toast } = useToast();
  const { logQuizGeneration } = useAnalyticsStore();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      topics: [{ value: 'Kinematics' }],
      difficulty: 'medium',
      numberOfQuestions: 5,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'topics',
    control: form.control,
  });

  // Effect to check for quick quiz data from dashboard
  useEffect(() => {
    const quickQuizDataString = sessionStorage.getItem('quickQuizData');
    if (quickQuizDataString) {
      try {
        const quickQuizData = JSON.parse(quickQuizDataString);
        sessionStorage.removeItem('quickQuizData'); // Clean up

        const topics = quickQuizData.topics.split(',').map((t: string) => t.trim()).filter(Boolean);
        
        if (topics.length > 0) {
            const quizInput: GenerateQuizInput = {
                topics: topics,
                difficulty: 'medium', // default difficulty
                numberOfQuestions: quickQuizData.numberOfQuestions,
            };
            // Automatically submit form with data from dashboard
            triggerQuizGeneration(quizInput, quickQuizData.subject);
        }
      } catch (e) {
        console.error("Failed to parse quick quiz data", e);
      }
    }
  }, []);

  async function triggerQuizGeneration(input: GenerateQuizInput, subject?: string) {
    setIsLoading(true);
    setError(null);
    setGeneratedQuiz(null);

    try {
      const quiz = await createQuiz(input);
      setGeneratedQuiz(quiz);

      // Log the generation event to update dashboard stats immediately
      logQuizGeneration({
        subject: getSubjectFromTopics(input.topics, subject),
        questionsGenerated: input.numberOfQuestions,
        topics: input.topics,
      });

      toast({
        title: "Quiz Generated!",
        description: "Your quiz is ready. Good luck!",
      });
    } catch (e: any) {
      const errorMessage = e.message || 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: "Error Generating Quiz",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }


  async function onSubmit(data: QuizFormValues) {
    const input: GenerateQuizInput = {
      ...data,
      topics: data.topics.map(t => t.value),
    };
    triggerQuizGeneration(input);
  }

  const handleRetake = () => {
    setGeneratedQuiz(null);
    setError(null);
    form.reset();
  }

  if (generatedQuiz) {
    return <QuizTaker quiz={generatedQuiz} onRetake={handleRetake} />;
  }

  if (isLoading && !generatedQuiz) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-semibold">Generating Your Quiz...</h2>
                <p className="text-muted-foreground">Please wait while our AI crafts the questions.</p>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Create a New Quiz</CardTitle>
                <CardDescription>
                    Use AI to generate a quiz on any topic for NEET/JEE preparation.
                </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error Generating Quiz</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div>
                    <FormLabel>Topics</FormLabel>
                    <FormDescription>
                      Add one or more topics for your quiz. The more specific, the better.
                    </FormDescription>
                    <div className="space-y-2 mt-2">
                        {fields.map((field, index) => (
                          <FormField
                            control={form.control}
                            key={field.id}
                            name={`topics.${index}.value`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2">
                                  <FormControl>
                                    <Input {...field} placeholder="e.g., Quantum Physics" />
                                  </FormControl>
                                  {fields.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() => remove(index)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ value: '' })}
                      disabled={fields.length >= 3}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Topic
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numberOfQuestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Questions</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Generating...' : 'Generate Quiz'}
                  </Button>
                </form>
              </Form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
