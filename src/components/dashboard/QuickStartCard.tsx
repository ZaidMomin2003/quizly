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
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>
          Choose a subject to practice.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button size="lg" className="w-full justify-start">
          <PlayCircle className="mr-4" />
          Start Mixed Quiz
        </Button>
        <Button size="lg" variant="secondary" className="w-full justify-start">
          <FlaskConical className="mr-4" />
          Chemistry
        </Button>
        <Button size="lg" variant="secondary" className="w-full justify-start">
          <Atom className="mr-4" />
          Physics
        </Button>
        <Button size="lg" variant="secondary" className="w-full justify-start">
          <BrainCircuit className="mr-4" />
          Biology
        </Button>
      </CardContent>
    </Card>
  );
}
