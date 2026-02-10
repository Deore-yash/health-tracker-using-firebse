'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized tour advice using an AI chatbot.
 *
 * It includes functions for:
 * - personalizedHealthAdvice: The main function to get personalized tour advice.
 * - PersonalizedHealthAdviceInput: The input type for the personalizedHealthAdvice function.
 * - PersonalizedHealthAdviceOutput: The output type for the personalizedHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthAdviceInputSchema = z.object({
  query: z.string().describe('The user query for tour advice.'),
  healthData: z.string().optional().describe('The user tour data as a JSON string.'),
  preferences: z.string().optional().describe('The user preferences as a JSON string.'),
});
export type PersonalizedHealthAdviceInput = z.infer<
  typeof PersonalizedHealthAdviceInputSchema
>;

const PersonalizedHealthAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized tour advice from the chatbot.'),
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
  prompt: `You are a helpful AI tour assistant providing advice on local attractions, restaurant recommendations, and itinerary planning.

  Provide personalized and helpful guidance based on the user's tour data and preferences. If tourData or preferences are not available, provide general advice.

  Tour Data: {{{healthData}}}
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
