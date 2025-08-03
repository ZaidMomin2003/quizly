
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sparkles, Loader2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useOnboardingStore } from '@/stores/onboarding-store';

const quickQuizFormSchema = z.object({
  topics: z.string().min(1, 'Please enter at least one topic.'),
  subject: z.enum(['Physics', 'Chemistry', 'Biology', 'Mathematics']),
  numberOfQuestions: z.coerce.number().int().min(1, 'At least 1 question.').max(20, 'Max 20 questions.'),
});

type QuickQuizFormValues = z.infer<typeof quickQuizFormSchema>;

export function QuickQuiz() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { formData } = useOnboardingStore();
  const isJeeStudent = formData.exam?.toLowerCase().includes('jee');

  const form = useForm<QuickQuizFormValues>({
    resolver: zodResolver(quickQuizFormSchema),
    defaultValues: {
      topics: '',
      subject: 'Physics',
      numberOfQuestions: 5,
    },
  });

  const onSubmit = async (data: QuickQuizFormValues) => {
    setIsLoading(true);
    sessionStorage.setItem('quickQuizData', JSON.stringify(data));
    router.push('/dashboard/quizzes');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle>Quick Quiz</CardTitle>
        </div>
        <CardDescription>Generate a practice quiz on any topic in seconds.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Topics</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter topics separated by commas, e.g., Thermodynamics, Optics" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-end">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        {isJeeStudent ? (
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                        ) : (
                            <SelectItem value="Biology">Biology</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full col-span-2 sm:col-span-1" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
