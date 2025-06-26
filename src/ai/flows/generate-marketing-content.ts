'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating marketing content ideas based on strategic insights.
 *
 * - generateMarketingContent - A function that generates marketing content ideas.
 * - GenerateMarketingContentInput - The input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  strategicInsights: z
    .string()
    .describe('Strategic insights derived from the completed workflow.'),
});

export type GenerateMarketingContentInput = z.infer<
  typeof GenerateMarketingContentInputSchema
>;

const GenerateMarketingContentOutputSchema = z.object({
  blogPostTitles: z.array(z.string()).describe('A list of blog post title ideas.'),
  socialMediaSnippets: z
    .array(z.string())
    .describe('A list of social media snippet ideas.'),
  imageConcepts: z.array(z.string()).describe('A list of image concept ideas.'),
  progress: z.string().describe('Progress summary of the content generation.'),
});

export type GenerateMarketingContentOutput = z.infer<
  typeof GenerateMarketingContentOutputSchema
>;

export async function generateMarketingContent(
  input: GenerateMarketingContentInput
): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const generateMarketingContentPrompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are a marketing expert. Given the following strategic insights, generate creative and engaging marketing content ideas.

Strategic Insights: {{{strategicInsights}}}

Generate:

*   5 blog post title ideas
*   5 social media snippet ideas
*   5 image concept ideas

Format your response as a JSON object matching the schema. Be concise and creative.

Include a one-sentence summary in the 'progress' field.`,}
);

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await generateMarketingContentPrompt(input);
    return output!;
  }
);
