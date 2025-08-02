import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const subjects = [
  { name: 'Physics', progress: 75, color: 'bg-red-500' },
  { name: 'Chemistry', progress: 60, color: 'bg-blue-500' },
  { name: 'Biology', progress: 85, color: 'bg-green-500' },
];

export function SubjectProgressCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Subject Progress</CardTitle>
        <CardDescription>Your progress in each subject so far.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {subjects.map(subject => (
          <div key={subject.name} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-medium">{subject.name}</span>
              <span className="text-sm font-semibold text-foreground">
                {subject.progress}%
              </span>
            </div>
            <Progress
              value={subject.progress}
              aria-label={`${subject.name} progress`}
              indicatorClassName={subject.color}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
