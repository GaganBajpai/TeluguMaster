import { Card, CardContent } from "@/components/ui/card";

interface TeluguCharacterProps {
  character: string;
  description: string;
}

export function TeluguCharacter({ character, description }: TeluguCharacterProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-2 font-telugu">{character}</div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
