import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface LessonCardProps {
  title: string;
  type: string;
  completed?: boolean;
}

export function LessonCard({ title, type, completed }: LessonCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          {completed && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      </CardContent>
    </Card>
  );
}
