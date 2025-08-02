'use server';

/**
 * @fileOverview Recommends practice quizzes based on user performance, recent activity, and subject progress.
 *
 * - recommendPracticeQuiz - A function that recommends practice quizzes.
 * - RecommendPracticeQuizInput - The input type for the recommendPracticeQuiz function.
 * - RecommendPracticeQuizOutput - The return type for the recommendPracticeQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPracticeQuizInputSchema = z.object({
  performanceAnalytics: z.string().describe('User performance analytics data.'),
  recentActivity: z.string().describe('User recent quiz activity data.'),
  subjectProgress: z.string().describe('User subject progress data.'),
});
export type RecommendPracticeQuizInput = z.infer<
  typeof RecommendPracticeQuizInputSchema
>;

const RecommendPracticeQuizOutputSchema = z.object({
  recommendedQuizzes: z
    .string()
    .describe('A list of recommended quiz topics or IDs.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the quiz recommendations.'),
});
export type RecommendPracticeQuizOutput = z.infer<
  typeof RecommendPracticeQuizOutputSchema
>;

export async function recommendPracticeQuiz(
  input: RecommendPracticeQuizInput
): Promise<RecommendPracticeQuizOutput> {
  return recommendPracticeQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPracticeQuizPrompt',
  input: {schema: RecommendPracticeQuizInputSchema},
  output: {schema: RecommendPracticeQuizOutputSchema},
  prompt: `You are an AI assistant designed to recommend practice quizzes to students preparing for the NEET/JEE exams.

  Based on the student's performance analytics, recent activity, and subject progress, identify areas where the student needs the most improvement and suggest relevant practice quizzes.

  Performance Analytics: {{{performanceAnalytics}}}
  Recent Activity: {{{recentActivity}}}
  Subject Progress: {{{subjectProgress}}}

  Consider the following factors when making your recommendations:
  - Weak areas identified in performance analytics
  - Subjects with the least progress
  - Topics not covered in recent activity

  Output a list of recommended quiz topics or IDs and the reasoning behind the recommendation.
  `,
});

const recommendPracticeQuizFlow = ai.defineFlow(
  {
    name: 'recommendPracticeQuizFlow',
    inputSchema: RecommendPracticeQuizInputSchema,
    outputSchema: RecommendPracticeQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
