import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const subjects = [
  { name: 'Physics', progress: 75 },
  { name: 'Chemistry', progress: 60 },
  { name: 'Biology', progress: 85 },
];

export function SubjectProgressCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Subject Progress</CardTitle>
        <CardDescription>Your progress in each subject so far.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map(subject => (
          <div key={subject.name} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-medium">{subject.name}</span>
              <span className="text-sm text-muted-foreground">
                {subject.progress}%
              </span>
            </div>
            <Progress
              value={subject.progress}
              aria-label={`${subject.name} progress`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
