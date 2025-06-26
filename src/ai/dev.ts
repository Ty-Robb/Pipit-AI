import { config } from 'dotenv';
config();

import '@/ai/flows/extract-document-insights.ts';
import '@/ai/flows/website-assessment.ts';
import '@/ai/flows/generate-marketing-content.ts';
import '@/ai/flows/ai-consultant.ts';