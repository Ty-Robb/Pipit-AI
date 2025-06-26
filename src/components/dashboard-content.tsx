import { Card } from "@/components/ui/card";

export function DashboardContent() {
  return (
    <div className="flex-1 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-48" />
        <Card className="h-48" />
        <Card className="h-48" />
      </div>
      <Card className="h-96" />
    </div>
  );
}
