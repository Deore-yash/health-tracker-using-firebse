'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing emergency guidance.
 *
 * It includes:
 * - emergencyGuidance: A function that takes a user's description of an emergency and returns guidance.
 * - EmergencyGuidanceInput: The input type for the emergencyGuidance function.
 * - EmergencyGuidanceOutput: The return type for the emergencyGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencyGuidanceInputSchema = z.object({
  emergencyDescription: z
    .string()
    .describe('A description of the emergency situation the user is facing.'),
  userHealthState: z
    .string()
    .optional()
    .describe('A description of the user current health conditions'),
});
export type EmergencyGuidanceInput = z.infer<typeof EmergencyGuidanceInputSchema>;

const EmergencyGuidanceOutputSchema = z.object({
  guidance: z
    .string()
    .describe('Guidance and instructions for the user based on the emergency.'),
});
export type EmergencyGuidanceOutput = z.infer<typeof EmergencyGuidanceOutputSchema>;

export async function emergencyGuidance(input: EmergencyGuidanceInput): Promise<EmergencyGuidanceOutput> {
  return emergencyGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emergencyGuidancePrompt',
  input: {schema: EmergencyGuidanceInputSchema},
  output: {schema: EmergencyGuidanceOutputSchema},
  prompt: `You are an AI assistant providing emergency guidance to the user.

The user is experiencing the following emergency: {{{emergencyDescription}}}

User health state: {{userHealthState}}

Provide clear, concise, and actionable steps the user can take to address the emergency. Consider their health state to ensure any recommendations are appropriate and safe.`,
});

const emergencyGuidanceFlow = ai.defineFlow(
  {
    name: 'emergencyGuidanceFlow',
    inputSchema: EmergencyGuidanceInputSchema,
    outputSchema: EmergencyGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
