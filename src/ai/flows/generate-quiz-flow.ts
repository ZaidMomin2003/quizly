'use server';

/**
 * @fileOverview Generates a practice quiz based on user-defined topics, difficulty, and number of questions.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - Quiz - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateQuizInputSchema = z.object({
  topics: z.array(z.string()).describe('The topics for the quiz.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the quiz.'),
  numberOfQuestions: z.number().int().min(1).max(20).describe('The number of questions to generate.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

export const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
  answer: z.string().describe('The correct answer from the options array.'),
  explanation: z.string().describe('A detailed explanation of why the answer is correct.'),
});

export const QuizSchema = z.object({
  questions: z.array(QuizQuestionSchema),
  topics: z.array(z.string()),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});
export type Quiz = z.infer<typeof QuizSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<Quiz> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: QuizSchema },
  prompt: `You are an expert in creating educational content for NEET/JEE entrance exams.

  Generate a multiple-choice quiz with {{numberOfQuestions}} questions.

  The quiz should cover the following topics:
  {{#each topics}}
  - {{{this}}}
  {{/each}}

  The difficulty level should be {{difficulty}}.

  For each question:
  1. Provide a clear and concise question.
  2. Provide exactly 4 multiple-choice options.
  3. Indicate the correct answer.
  4. Provide a detailed explanation for the correct answer, explaining the underlying concepts.

  Return the quiz in the specified JSON format.
  `,
  config: {
    model: 'googleai/gemini-1.5-flash',
  }
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: QuizSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
