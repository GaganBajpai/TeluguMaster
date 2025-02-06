import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Lesson } from "@shared/schema";

export default function Practice() {
  const { id } = useParams();
  const { toast } = useToast();
  const [answer, setAnswer] = useState("");

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
  });

  const mutation = useMutation({
    mutationFn: async (score: number) => {
      await apiRequest("POST", `/api/progress/${id}`, {
        completed: true,
        score,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Progress saved!",
        description: "Keep up the good work!",
      });
    },
  });

  if (isLoading || !lesson) {
    return <div>Loading...</div>;
  }

  const content = JSON.parse(lesson.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateScore(answer, content);
    mutation.mutate(score);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Practice: {lesson.title}</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {lesson.type === "alphabet" ? "Write the pronunciation" : "Translate to Telugu"}
            </label>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

function calculateScore(answer: string, content: any): number {
  // Simple scoring logic - can be enhanced based on requirements
  return answer.length > 0 ? 100 : 0;
}
