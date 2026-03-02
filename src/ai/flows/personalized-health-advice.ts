'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized health advice using an AI chatbot.
 *
 * It includes functions for:
 * - personalizedTourAdvice: The main function to get personalized health advice.
 * - PersonalizedTourAdviceInput: The input type for the personalizedTourAdvice function.
 * - PersonalizedTourAdviceOutput: The output type for the personalizedTourAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTourAdviceInputSchema = z.object({
  query: z.string().describe('The user query for health advice.'),
  healthData: z
    .string()
    .optional()
    .describe('The user health data as a JSON string. (e.g., age, pre-existing conditions)'),
  preferences: z
    .string()
    .optional()
    .describe('The user preferences as a JSON string (e.g., communication style).'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo from the user (e.g., a skin rash), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PersonalizedTourAdviceInput = z.infer<
  typeof PersonalizedTourAdviceInputSchema
>;

const PersonalizedTourAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized health advice from the chatbot.'),
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
  prompt: `You are "HealthBot", an expert AI health assistant. Your goal is to provide personalized and helpful health guidance. IMPORTANT: You are not a doctor. Always advise the user to consult a medical professional for serious issues.

  If a photo is provided, use it as the primary context for your response. For example, if the user provides a photo of a skin condition and asks "what is this?", you should describe what you see and suggest possible conditions, but strongly advise seeing a doctor.

  Provide personalized and helpful guidance based on the user's health data and preferences.

  Health Data: {{{healthData}}}
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
