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
