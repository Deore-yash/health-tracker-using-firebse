import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-health-data.ts';
import '@/ai/flows/emergency-guidance.ts';
import '@/ai/flows/personalized-health-advice.ts';