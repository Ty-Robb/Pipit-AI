"use client";

import { useState } from 'react';
import { extractDocumentInsights } from '@/ai/flows/extract-document-insights';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Upload } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function DocumentInsightsPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] =useState('');
  const [insights, setInsights] = useState<{ summary: string; keyInsights: string } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        if(selectedFile.type !== 'application/pdf') {
            toast({
                variant: "destructive",
                title: "Invalid File Type",
                description: "Please upload a PDF file.",
            });
            return;
        }
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setInsights(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file to analyze.",
      });
      return;
    }

    setIsLoading(true);
    setInsights(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        try {
            const pdfDataUri = reader.result as string;
            const result = await extractDocumentInsights({ pdfDataUri });
            setInsights(result);
        } catch (error) {
            console.error("Document analysis failed", error);
            toast({
                variant: "destructive",
                title: "Analysis Failed",
                description: "Could not analyze the document. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    reader.onerror = (error) => {
        console.error("File reading error", error);
        toast({
            variant: "destructive",
            title: "File Error",
            description: "Could not read the selected file.",
        });
        setIsLoading(false);
    };
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Document Insights</CardTitle>
        <CardDescription>Upload a PDF document to extract a summary and key insights using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
            <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose PDF
                    <Input id="file-upload" type="file" accept="application/pdf" className="sr-only" onChange={handleFileChange} disabled={isLoading} />
                </label>
            </Button>
            {fileName && <span className="text-sm text-muted-foreground truncate">{fileName}</span>}
        </div>
        <Button onClick={handleSubmit} disabled={isLoading || !file} className="mt-4">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Extract Insights
        </Button>
        
        <div className="mt-6 space-y-6">
          {isLoading && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          )}
          {insights && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{insights.summary}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Key Insights</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{insights.keyInsights}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
