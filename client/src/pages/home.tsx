import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { LessonCard } from "@/components/LessonCard";
import { ProgressBar } from "@/components/ProgressBar";
import type { Lesson } from "@shared/schema";

export default function Home() {
  const { data: lessons, isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const { data: progress } = useQuery({
    queryKey: ["/api/progress"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const completedLessons = progress?.filter(p => p.completed).length ?? 0;
  const totalLessons = lessons?.length ?? 0;
  const progressPercent = (completedLessons / totalLessons) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Learn Telugu
      </h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <ProgressBar progress={progressPercent} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons?.map((lesson) => (
          <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
            <a>
              <LessonCard
                title={lesson.title}
                type={lesson.type}
                completed={progress?.some(p => p.lessonId === lesson.id && p.completed)}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
