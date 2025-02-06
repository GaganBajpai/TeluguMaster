import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";
import { playAudio } from "@/lib/audio";

interface TeluguCharacterProps {
  character: string;
  description: string;
  audioUrl?: string;
}

export function TeluguCharacter({ character, description, audioUrl }: TeluguCharacterProps) {
  const handleClick = () => {
    if (audioUrl) {
      playAudio(audioUrl);
    }
  };

  return (
    <Card className="relative group">
      <CardContent className="p-6 text-center cursor-pointer" onClick={handleClick}>
        <div className="text-4xl mb-2 font-telugu">{character}</div>
        <p className="text-sm text-gray-600">{description}</p>
        {audioUrl && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Volume className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}