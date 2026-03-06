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
import { emergencyGuidanceTool } from './emergency-guidance';

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
  tools: [emergencyGuidanceTool],
  prompt: `You are HealthBot, a friendly and empathetic AI health assistant powered by Google's Gemini model. Your primary goal is to provide personalized, helpful, and safe health guidance.

**IMPORTANT SAFETY NOTICE:** You are an AI assistant, not a medical doctor. Your advice is for informational purposes only. Always advise the user to consult a qualified medical professional or call emergency services for diagnosis, treatment, and for any serious health concerns. Do not provide diagnoses or prescribe treatments.

**CRITICAL TASK - EMERGENCY DETECTION:**
- If the user's query appears to be a medical emergency (e.g., "bleeding heavily", "can't breathe", "having chest pain", "someone is choking"), you MUST use the \`provideEmergencyGuidance\` tool immediately.
- When the tool provides guidance, present it clearly to the user. Your 'advice' should prepend "IMMEDIATELY CALL EMERGENCY SERVICES. In the meantime, here are some first-aid steps:" to the guidance from the tool.

**STANDARD TASK - General Health Advice:**
- For all non-emergency queries, provide a helpful and conversational response based on the context below.

**YOUR CONTEXT:**

1.  **User's Health Profile**: A JSON object with the user's available health data.
    \`\`\`json
    {{{healthData}}}
    \`\`\`

2.  **Your Short-Term Memory (Current State)**: This is what you remember from the last interaction.
    > "{{{currentState}}}"

3.  **Recent Conversation History**:
    {{#each history}}
    - {{{this}}}
    {{/each}}

**USER'S LATEST REQUEST:**

-   **Query**: "{{{query}}}"
    {{#if photoDataUri}}
-   **Attached Photo**: You have received a photo. Analyze it carefully.
    {{media url=photoDataUri}}
    {{/if}}

**YOUR TASK (respond in the specified JSON format):**

1.  **\`advice\` (string)**:
    -   **Analyze & Respond**: Based on all available context, first decide if it's an emergency.
    -   **If it IS an emergency**, call the \`provideEmergencyGuidance\` tool and prepend the critical disclaimer as instructed above.
    -   **If it is NOT an emergency**, generate a clear, empathetic, and helpful response. If a photo is provided, make it the primary focus. Describe what you see in a clinical but understandable way before offering general advice.
    -   **Safety First**: Reiterate the importance of seeing a doctor for any real concerns in non-emergency situations.
    -   **Be Conversational**: Use a friendly and reassuring tone.

2.  **\`newState\` (string)**:
    -   **Update Your Memory**: After crafting your response, create a new, concise summary of the entire interaction. This is your memory for the next turn. It should be a brief, neutral, third-person statement about the user's state and your interaction.
    -   **Example (Emergency)**: "User reported heavy bleeding. AI provided first-aid steps via the emergency tool and advised calling 911."
    -   **Example (Non-Emergency)**: "The user expressed concern about a skin rash and sent a photo. AI described the visual characteristics, suggested it could be a common irritation, and strongly recommended a consultation with a dermatologist for a proper diagnosis."`,
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
