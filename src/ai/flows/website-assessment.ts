// 'use server';

/**
 * @fileOverview Provides a summary of a website's key features, target audience, and overall effectiveness.
 *
 * - websiteAssessment - A function that handles the website assessment process.
 * - WebsiteAssessmentInput - The input type for the websiteAssessment function.
 * - WebsiteAssessmentOutput - The return type for the websiteAssessment function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WebsiteAssessmentInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to assess.'),
});
export type WebsiteAssessmentInput = z.infer<typeof WebsiteAssessmentInputSchema>;

const WebsiteAssessmentOutputSchema = z.object({
  summary: z.string().describe('A summary of the website assessment, including key features, target audience, and overall effectiveness.'),
});
export type WebsiteAssessmentOutput = z.infer<typeof WebsiteAssessmentOutputSchema>;

export async function websiteAssessment(input: WebsiteAssessmentInput): Promise<WebsiteAssessmentOutput> {
  return websiteAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'websiteAssessmentPrompt',
  input: {schema: WebsiteAssessmentInputSchema},
  output: {schema: WebsiteAssessmentOutputSchema},
  prompt: `You are an AI consultant named Ethan, skilled at assessing websites and providing strategic insights.

You will analyze the provided website and provide a summary of its key features, target audience, and overall effectiveness based on best practices. 

Website URL: {{{url}}}

Summary: `,
});

const websiteAssessmentFlow = ai.defineFlow(
  {
    name: 'websiteAssessmentFlow',
    inputSchema: WebsiteAssessmentInputSchema,
    outputSchema: WebsiteAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
