'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized tour advice using an AI chatbot.
 *
 * It includes functions for:
 * - personalizedTourAdvice: The main function to get personalized tour advice.
 * - PersonalizedTourAdviceInput: The input type for the personalizedTourAdvice function.
 * - PersonalizedTourAdviceOutput: The output type for the personalizedTourAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTourAdviceInputSchema = z.object({
  query: z.string().describe('The user query for tour advice.'),
  tourData: z.string().optional().describe('The user tour data as a JSON string.'),
  preferences: z.string().optional().describe('The user preferences as a JSON string.'),
});
export type PersonalizedTourAdviceInput = z.infer<
  typeof PersonalizedTourAdviceInputSchema
>;

const PersonalizedTourAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized tour advice from the chatbot.'),
});
export type PersonalizedTourAdviceOutput = z.infer<
  typeof PersonalizedTourAdviceOutputSchema
>;

export async function personalizedTourAdvice(
  input: PersonalizedTourAdviceInput
): Promise<PersonalizedTourAdviceOutput> {
  return personalizedTourAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTourAdvicePrompt',
  input: {schema: PersonalizedTourAdviceInputSchema},
  output: {schema: PersonalizedTourAdviceOutputSchema},
  prompt: `You are "TourBot", an expert AI tour guide. Your goal is to provide personalized and helpful guidance to tourists.

  Provide personalized and helpful guidance based on the user's tour data and preferences. If tourData or preferences are not available, provide general advice.

  Tour Data: {{{tourData}}}
  Preferences: {{{preferences}}}

  User Query: {{{query}}}
  `,
});

const personalizedTourAdviceFlow = ai.defineFlow(
  {
    name: 'personalizedTourAdviceFlow',
    inputSchema: PersonalizedTourAdviceInputSchema,
    outputSchema: PersonalizedTourAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
