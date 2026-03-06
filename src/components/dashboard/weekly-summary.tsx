'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { summarizeHealthData } from '@/ai/flows/summarize-health-data';
import { Skeleton } from '../ui/skeleton';
import type { DailyActivityData } from '@/lib/types';

const insights = [
  { id: 'heartRate', label: 'Heart Rate Trends' },
  { id: 'steps', label: 'Step Count Analysis' },
  { id: 'calories', label: 'Calorie Burning Patterns' },
  { id: 'sleep', label: 'Sleep Duration Insights' },
];

const formSchema = z.object({
  preferences: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export function WeeklySummary({ weeklyActivityData }: { weeklyActivityData: DailyActivityData[] }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setSummary(null);
    try {
      // In a real app, this data would come from Firestore
      const heartRateData = weeklyActivityData.map(d => Math.floor(Math.random() * (90 - 60 + 1)) + 60); // Mock
      const calorieData = weeklyActivityData.map(d => Math.floor(Math.random() * (500 - 200 + 1)) + 200); // Mock
      const sleepData = weeklyActivityData.map(d => Math.floor(Math.random() * (540 - 360 + 1)) + 360); // Mock
      const stepData = weeklyActivityData.map(d => d.steps);

      const response = await summarizeHealthData({
        heartRateData,
        stepCountData: stepData,
        calorieData,
        sleepDurationData: sleepData,
        weeklyInsightsPreferences: data.preferences,
      });
      setSummary(response.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Sorry, I was unable to generate a summary at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI-Powered Weekly Summary
        </CardTitle>
        <CardDescription>
          Select the insights you're interested in and let our AI summarize
          your week.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {insights.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="preferences"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            {isLoading && (
              <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
              </div>
            )}
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground rounded-md border bg-muted/50 p-4"
              >
                <p className="whitespace-pre-wrap">{summary}</p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || weeklyActivityData.length === 0}>
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
