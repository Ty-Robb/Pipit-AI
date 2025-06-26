"use client";

import { Download, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategicOutputPlaceholder } from "@/components/strategic-output-placeholder";

export function StrategicOutputPanel() {
  return (
    <Card className="h-full bg-muted/30 border-border/50">
      <CardContent className="p-6 h-full">
        <Tabs defaultValue="swot" className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-background border">
              <TabsTrigger value="swot" className="gap-2 data-[state=active]:bg-muted/50">
                <FileText className="h-4 w-4" />
                SWOT
              </TabsTrigger>
              <TabsTrigger value="persona" className="gap-2 data-[state=active]:bg-muted/50">
                <User className="h-4 w-4" />
                Persona
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <TabsContent value="swot" className="flex-grow rounded-lg bg-background border flex items-center justify-center">
            <StrategicOutputPlaceholder />
          </TabsContent>
          <TabsContent value="persona" className="flex-grow rounded-lg bg-background border flex items-center justify-center">
             <StrategicOutputPlaceholder />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
