import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { TeluguCharacter } from "@/components/TeluguCharacter";
import { playAudio } from "@/lib/audio";
import type { Lesson } from "@shared/schema";

export default function LessonPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
  });

  if (isLoading || !lesson) {
    return <div>Loading...</div>;
  }

  const content = JSON.parse(lesson.content);

  const handlePlayAudio = () => {
    if (lesson.audioUrl) {
      playAudio(lesson.audioUrl);
    }
  };

  const handlePractice = () => {
    setLocation(`/practice/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {lesson.type === "alphabet" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {content.characters.map((char: string, idx: number) => (
              <TeluguCharacter
                key={idx}
                character={char}
                description={content.descriptions[idx]}
              />
            ))}
          </div>
        )}

        {lesson.type === "grammar" && (
          <div className="space-y-4">
            {content.rules.map((rule: string, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded">
                <p className="text-lg">{rule}</p>
              </div>
            ))}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Examples:</h3>
              {content.examples.map((example: string, idx: number) => (
                <p key={idx} className="text-gray-700 mb-2">{example}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {lesson.audioUrl && (
          <Button onClick={handlePlayAudio}>
            Play Audio
          </Button>
        )}
        <Button onClick={handlePractice} variant="secondary">
          Practice
        </Button>
      </div>
    </div>
  );
}
