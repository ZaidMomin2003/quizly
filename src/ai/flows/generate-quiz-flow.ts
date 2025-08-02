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
  model: 'googleai/gemini-1.5-flash',
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
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
        },
    ]
  }
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: QuizSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) {
        throw new Error('The AI model did not return a quiz. Please try again.');
      }
      return output;
    } catch(e: any) {
        console.error("Error in generateQuizFlow:", e.message);
        console.error("Input to flow:", JSON.stringify(input, null, 2));
        throw new Error(`Failed to generate quiz: ${e.message}`);
    }
  }
);
