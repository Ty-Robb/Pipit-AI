"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StrategicOutputPlaceholder } from '@/components/strategic-output-placeholder';
import { FileText, User, Download } from 'lucide-react';

export function OutputPanel() {
    return (
        <Card className="h-full">
            <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="font-semibold">
                            <FileText className="mr-2" />
                            SWOT
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <User className="mr-2" />
                            Persona
                        </Button>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2" />
                        Export
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-4.5rem)]">
                <StrategicOutputPlaceholder />
            </CardContent>
        </Card>
    )
}
