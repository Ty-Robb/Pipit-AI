import {config} from 'dotenv';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

config();

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
