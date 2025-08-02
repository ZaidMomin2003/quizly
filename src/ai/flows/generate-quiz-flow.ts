'use server';

/**
 * @fileOverview Generates a practice quiz based on user-defined topics, difficulty, and number of questions.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 */

import { ai } from '@/ai/genkit';
import { GenerateQuizInputSchema, QuizSchema, type GenerateQuizInput, type Quiz } from '@/ai/schemas/quiz';

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
