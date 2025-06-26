'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting key insights and summarizing the main points of a PDF document.
 *
 * - extractDocumentInsights - A function that handles the document insight extraction process.
 * - ExtractDocumentInsightsInput - The input type for the extractDocumentInsights function.
 * - ExtractDocumentInsightsOutput - The return type for the extractDocumentInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDocumentInsightsInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractDocumentInsightsInput = z.infer<typeof ExtractDocumentInsightsInputSchema>;

const ExtractDocumentInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the document.'),
  keyInsights: z.string().describe('Key insights extracted from the document.'),
});
export type ExtractDocumentInsightsOutput = z.infer<typeof ExtractDocumentInsightsOutputSchema>;

export async function extractDocumentInsights(
  input: ExtractDocumentInsightsInput
): Promise<ExtractDocumentInsightsOutput> {
  return extractDocumentInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDocumentInsightsPrompt',
  input: {schema: ExtractDocumentInsightsInputSchema},
  output: {schema: ExtractDocumentInsightsOutputSchema},
  prompt: `You are an expert document summarizer. Please summarize the document and extract key insights.

  Document: {{media url=pdfDataUri}}`,
});

const extractDocumentInsightsFlow = ai.defineFlow(
  {
    name: 'extractDocumentInsightsFlow',
    inputSchema: ExtractDocumentInsightsInputSchema,
    outputSchema: ExtractDocumentInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
