"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { websiteAssessment } from '@/ai/flows/website-assessment';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

type FormData = z.infer<typeof formSchema>;

export function WebsiteAssessmentPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAssessment(null);
    try {
      const result = await websiteAssessment({ url: data.url });
      setAssessment(result.summary);
    } catch (error) {
      console.error("Website assessment failed", error);
      toast({
        variant: "destructive",
        title: "Assessment Failed",
        description: "Could not assess the website. Please check the URL and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Website Assessment</CardTitle>
        <CardDescription>Enter a URL to get an AI-powered assessment of its key features, target audience, and effectiveness.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Assess Website
            </Button>
          </form>
        </Form>
        
        <div className="mt-6">
          {isLoading && (
            <div className="space-y-4">
              <h3 className="font-semibold">Assessing...</h3>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {assessment && (
            <div className="space-y-2">
                <h3 className="font-semibold">Assessment Summary</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{assessment}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
