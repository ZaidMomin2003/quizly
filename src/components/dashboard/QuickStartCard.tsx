import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, BrainCircuit, FlaskConical, Atom } from 'lucide-react';

export function QuickStartCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Start a New Practice Session</CardTitle>
        <CardDescription>
          Choose a subject or start a mixed quiz.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <Button size="lg" className="w-full">
          <PlayCircle />
          Start Mixed Quiz
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <FlaskConical />
          Chemistry
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <Atom />
          Physics
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <BrainCircuit />
          Biology
        </Button>
      </CardContent>
    </Card>
  );
}
