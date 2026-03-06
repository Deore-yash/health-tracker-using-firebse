'use server';

/**
 * @fileOverview Defines a Genkit tool for providing emergency first-aid guidance.
 *
 * It includes:
 * - emergencyGuidanceTool: A tool that can be used by an agent/flow to get
 *   step-by-step first aid instructions for a described emergency.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmergencyGuidanceInputSchema = z.object({
  emergencyDescription: z
    .string()
    .describe('A description of the medical emergency situation.'),
});

const EmergencyGuidanceOutputSchema = z.object({
  guidance: z
    .string()
    .describe('Clear, concise, step-by-step first-aid guidance for the user.'),
});

// A specialized prompt just for the tool's logic.
// It's designed to be direct and to the point.
const emergencyGuidanceToolPrompt = ai.definePrompt({
  name: 'emergencyGuidanceToolPrompt',
  input: { schema: EmergencyGuidanceInputSchema },
  output: { schema: EmergencyGuidanceOutputSchema },
  prompt: `You are an expert in providing clear, step-by-step emergency first aid advice.
A user is facing an emergency. Your ONLY job is to provide guidance for the described situation.
BE DIRECT AND TO THE POINT. Start with the most critical step. Number the steps.
DO NOT add disclaimers about not being a doctor. The main AI will handle that.

Emergency: {{{emergencyDescription}}}
`,
});

/**
 * A Genkit Tool for providing emergency guidance.
 *
 * This tool is designed to be called by a larger AI agent or flow. When the agent
 * detects that a user's query is about a medical emergency, it should invoke this
 * tool with a description of the situation. The tool then returns clear,
 * actionable first-aid steps.
 */
export const emergencyGuidanceTool = ai.defineTool(
  {
    name: 'provideEmergencyGuidance',
    description:
      "Use this tool when a user asks for immediate help or guidance regarding a medical emergency, such as heavy bleeding, choking, burns, seizures, or other urgent situations. This tool provides first-aid steps.",
    inputSchema: EmergencyGuidanceInputSchema,
    outputSchema: EmergencyGuidanceOutputSchema,
  },
  async (input) => {
    console.log(`Emergency guidance tool called with: ${input.emergencyDescription}`);
    const { output } = await emergencyGuidanceToolPrompt(input);
    return output!;
  }
);
