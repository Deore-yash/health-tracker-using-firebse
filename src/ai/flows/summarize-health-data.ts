'use server';
/**
 * @fileOverview Provides a weekly summary of user health data, including trends and insights.
 *
 * - summarizeHealthData - A function that generates a weekly health summary.
 * - SummarizeHealthDataInput - The input type for the summarizeHealthData function.
 * - SummarizeHealthDataOutput - The return type for the summarizeHealthData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHealthDataInputSchema = z.object({
  heartRateData: z.array(z.number()).describe('Array of heart rate measurements.'),
  stepCountData: z.array(z.number()).describe('Array of step count measurements.'),
  calorieData: z.array(z.number()).describe('Array of calorie measurements.'),
  sleepDurationData: z.array(z.number()).describe('Array of sleep duration measurements in minutes.'),
  weeklyInsightsPreferences: z
    .array(z.string())
    .optional()
    .describe(
      'Optional array of preferred insights. If empty or not provided, provide general insight across all the data.'
    ),
});
export type SummarizeHealthDataInput = z.infer<typeof SummarizeHealthDataInputSchema>;

const SummarizeHealthDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the user health data, including trends and insights.'),
});
export type SummarizeHealthDataOutput = z.infer<typeof SummarizeHealthDataOutputSchema>;

export async function summarizeHealthData(input: SummarizeHealthDataInput): Promise<SummarizeHealthDataOutput> {
  return summarizeHealthDataFlow(input);
}

const summarizeHealthDataPrompt = ai.definePrompt({
  name: 'summarizeHealthDataPrompt',
  input: {schema: SummarizeHealthDataInputSchema},
  output: {schema: SummarizeHealthDataOutputSchema},
  prompt: `You are an AI health assistant that summarizes a user's weekly health data.

  Analyze the following health data to provide a comprehensive weekly summary, highlighting key trends and insights. Focus on heart rate, step count, calories burned, and sleep duration.  Pay close attention to the user insights preferences, and focus on those preferences, if not provided, give a general overview. Be concise.

  Heart Rate Data: {{{heartRateData}}}
  Step Count Data: {{{stepCountData}}}
  Calorie Data: {{{calorieData}}}
  Sleep Duration Data: {{{sleepDurationData}}}
  Insights Preferences: {{{weeklyInsightsPreferences}}}

  Summary:`,
});

const summarizeHealthDataFlow = ai.defineFlow(
  {
    name: 'summarizeHealthDataFlow',
    inputSchema: SummarizeHealthDataInputSchema,
    outputSchema: SummarizeHealthDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeHealthDataPrompt(input);
    return output!;
  }
);
