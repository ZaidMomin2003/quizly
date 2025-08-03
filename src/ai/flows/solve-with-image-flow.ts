
'use server';
/**
 * @fileOverview An AI agent that solves problems from images.
 *
 * - solveWithImage - A function that takes an image of a problem and returns a step-by-step solution.
 * - SolveWithImageInput - The input type for the solveWithImage function.
 * - SolveWithImageOutput - The return type for the solveWithImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SolveWithImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SolveWithImageInput = z.infer<typeof SolveWithImageInputSchema>;

const SolveWithImageOutputSchema = z.object({
  solution: z
    .string()
    .describe('A detailed, step-by-step solution to the problem in the image. Format the solution clearly using markdown.'),
});
export type SolveWithImageOutput = z.infer<typeof SolveWithImageOutputSchema>;

export async function solveWithImage(
  input: SolveWithImageInput
): Promise<SolveWithImageOutput> {
  return solveWithImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveWithImagePrompt',
  input: { schema: SolveWithImageInputSchema },
  output: { schema: SolveWithImageOutputSchema },
  prompt: `You are an expert problem solver for NEET/JEE level physics, chemistry, and math.

Analyze the image provided and solve the problem shown.

Provide a detailed, step-by-step solution. Explain your reasoning and the formulas used. Ensure the final answer is clearly stated. Format the output using markdown for readability.

Problem Image: {{media url=photoDataUri}}`,
});

const solveWithImageFlow = ai.defineFlow(
  {
    name: 'solveWithImageFlow',
    inputSchema: SolveWithImageInputSchema,
    outputSchema: SolveWithImageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error('The AI model did not return a solution. Please try again.');
    }
    return output;
  }
);
