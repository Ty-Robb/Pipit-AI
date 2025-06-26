"use client";

import { useState, useEffect } from 'react';
import { generateMarketingContent } from '@/ai/flows/generate-marketing-content';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, PenSquare, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ContentGenerationPanelProps {
    strategicInsights: string | null;
}

type GeneratedContent = {
    blogPostTitles: string[];
    socialMediaSnippets: string[];
    imageConcepts: string[];
};

export function ContentGenerationPanel({ strategicInsights }: ContentGenerationPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const handleGenerateContent = async () => {
    if (!strategicInsights) {
        toast({
            variant: "destructive",
            title: "Missing Insights",
            description: "No strategic insights available to generate content.",
        });
        return;
    }
    setIsLoading(true);
    setContent(null);
    try {
      const result = await generateMarketingContent({ strategicInsights });
      setContent(result);
    } catch (error) {
      console.error("Content generation failed", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate marketing content. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if(strategicInsights) {
      handleGenerateContent();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategicInsights]);


  if (!strategicInsights) {
    return (
        <Card className="h-full flex flex-col items-center justify-center text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Generate Marketing Content</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Complete a workflow to generate strategic insights first.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Marketing Content Generation</CardTitle>
        <CardDescription>AI-generated content ideas based on your strategic insights.</CardDescription>
        <Button onClick={handleGenerateContent} disabled={isLoading} className="mt-2 w-fit">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {content ? 'Regenerate' : 'Generate'} Content
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        )}
        {content && (
            <>
                <ContentSection icon={PenSquare} title="Blog Post Titles">
                    {content.blogPostTitles.map((title, i) => <li key={i}>{title}</li>)}
                </ContentSection>
                <ContentSection icon={MessageSquare} title="Social Media Snippets">
                    {content.socialMediaSnippets.map((snippet, i) => <li key={i} className="mb-2">{snippet}</li>)}
                </ContentSection>
                <ContentSection icon={ImageIcon} title="Image Concepts">
                    {content.imageConcepts.map((concept, i) => <li key={i}>{concept}</li>)}
                </ContentSection>
            </>
        )}
      </CardContent>
    </Card>
  );
}

function ContentSection({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) {
    return (
        <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                {title}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {children}
            </ul>
        </div>
    )
}
