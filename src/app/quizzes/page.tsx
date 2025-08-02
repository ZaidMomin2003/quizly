
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Plus, Trash } from 'lucide-react';

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


const quizFormSchema = z.object({
  topics: z.array(z.object({ value: z.string().min(1, 'Topic is required.') })).min(1, 'At least one topic is required.'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  numberOfQuestions: z.coerce.number().int().min(1, 'Number of questions must be at least 1.').max(50, 'Cannot generate more than 50 questions.'),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

export default function QuizzesPage() {
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      topics: [{ value: '' }],
      difficulty: 'medium',
      numberOfQuestions: 10,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'topics',
    control: form.control,
  });

  function onSubmit(data: QuizFormValues) {
    console.log(data);
    // Here you would typically call an API to generate the quiz
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Card>
            <CardHeader>
                <CardTitle>Create a New Quiz</CardTitle>
                <CardDescription>
                    Use AI to generate a quiz on any topic.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div>
                    <FormLabel>Topics</FormLabel>
                    <FormDescription>
                      Add one or more topics for your quiz.
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
                          <FormDescription>
                            Choose the difficulty level for the quiz questions.
                          </FormDescription>
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
                          <FormDescription>
                            How many questions should the quiz have? (1-50)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>


                  <Button type="submit">Generate Quiz</Button>
                </form>
              </Form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
