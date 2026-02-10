'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized health advice using an AI chatbot.
 *
 * It includes functions for:
 * - personalizedHealthAdvice: The main function to get personalized health advice.
 * - PersonalizedHealthAdviceInput: The input type for the personalizedHealthAdvice function.
 * - PersonalizedHealthAdviceOutput: The output type for the personalizedHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthAdviceInputSchema = z.object({
  query: z.string().describe('The user query for health advice.'),
  healthData: z.string().optional().describe('The user health data as a JSON string.'),
  preferences: z.string().optional().describe('The user preferences as a JSON string.'),
});
export type PersonalizedHealthAdviceInput = z.infer<
  typeof PersonalizedHealthAdviceInputSchema
>;

const PersonalizedHealthAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized health advice from the chatbot.'),
});
export type PersonalizedHealthAdviceOutput = z.infer<
  typeof PersonalizedHealthAdviceOutputSchema
>;

export async function personalizedHealthAdvice(
  input: PersonalizedHealthAdviceInput
): Promise<PersonalizedHealthAdviceOutput> {
  return personalizedHealthAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHealthAdvicePrompt',
  input: {schema: PersonalizedHealthAdviceInputSchema},
  output: {schema: PersonalizedHealthAdviceOutputSchema},
  prompt: `You are a helpful AI chatbot providing basic, non-diagnostic health advice, medication reminders, and stress management tips.

  Provide personalized and helpful guidance based on the user's tracked health data and preferences. If healthData or preferences are not available, provide general advice.

  Health Data: {{{healthData}}}
  Preferences: {{{preferences}}}

  User Query: {{{query}}}
  `,
});

const personalizedHealthAdviceFlow = ai.defineFlow(
  {
    name: 'personalizedHealthAdviceFlow',
    inputSchema: PersonalizedHealthAdviceInputSchema,
    outputSchema: PersonalizedHealthAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
