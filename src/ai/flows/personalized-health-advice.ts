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
  healthData: z
    .string()
    .optional()
    .describe('The user health data as a JSON string. (e.g., age, pre-existing conditions)'),
  currentState: z
    .string()
    .optional()
    .describe("A summary of the user's current health situation and recent conversation topics."),
  history: z.array(z.string()).optional().describe('The recent conversation history.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo from the user (e.g., a skin rash), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PersonalizedHealthAdviceInput = z.infer<
  typeof PersonalizedHealthAdviceInputSchema
>;

const PersonalizedHealthAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized health advice from the chatbot.'),
  newState: z.string().describe("An updated, concise summary of the user's health state and the conversation, to be used as the AI's memory for the next interaction."),
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
  prompt: `You are "HealthBot", an expert AI health assistant. Your goal is to provide personalized, helpful, and safe health guidance. IMPORTANT: You are not a doctor. Always advise the user to consult a medical professional for diagnosis and treatment of serious issues.

  CONTEXT:
  - User's Health Profile: {{{healthData}}}
  - AI's Memory (Current State): "{{{currentState}}}"
  - Recent Conversation:
  {{#each history}}
  - {{{this}}}
  {{/each}}

  USER'S LATEST QUERY: "{{{query}}}"
  {{#if photoDataUri}}
  - The user has also provided a photo: {{media url=photoDataUri}}
  {{/if}}

  YOUR TASK:
  1.  **Generate Advice**: Based on all the context above, provide a clear, empathetic, and helpful response to the user's query.
  2.  **Update State**: After generating the advice, create a new, concise summary of the user's situation and the key points of this interaction. This summary will be your memory for the next conversation. It should be a brief, neutral statement. For example: "User asked about a rash. AI suggested it might be eczema and advised seeing a doctor. User seems concerned about dry skin."

  Respond with the 'advice' and the 'newState' in the specified output format.`,
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
