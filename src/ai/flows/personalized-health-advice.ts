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
  tourData: z
    .string()
    .optional()
    .describe('The user tour data as a JSON string.'),
  preferences: z
    .string()
    .optional()
    .describe('The user preferences as a JSON string.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo from the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
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

  If a photo is provided, use it as the primary context for your response. For example, if the user provides a photo of a landmark and asks "what is this?", you should identify the landmark and provide information about it.

  Provide personalized and helpful guidance based on the user's tour data and preferences. If tourData or preferences are not available, provide general advice.

  Tour Data: {{{tourData}}}
  Preferences: {{{preferences}}}

  User Query: {{{query}}}
  {{#if photoDataUri}}
  Photo: {{media url=photoDataUri}}
  {{/if}}
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
