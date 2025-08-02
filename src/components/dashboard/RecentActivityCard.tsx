import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { ArrowUpRight } from 'lucide-react';

const recentQuizzes = [
  {
    id: 1,
    name: 'Organic Chemistry Basics',
    subject: 'Chemistry',
    score: 88,
  },
  {
    id: 2,
    name: 'Kinematics',
    subject: 'Physics',
    score: 72,
  },
  {
    id: 3,
    name: 'Cell Biology',
    subject: 'Biology',
    score: 95,
  },
  {
    id: 4,
    name: 'Thermodynamics',
    subject: 'Physics',
    score: 65,
  },
];

export function RecentActivityCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
                An overview of your recent quizzes.
            </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <a href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
            </a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentQuizzes.map(quiz => (
              <TableRow key={quiz.id}>
                <TableCell>
                    <div className="font-medium">{quiz.name}</div>
                    <div className="text-sm text-muted-foreground">{quiz.subject}</div>
                </TableCell>
                <TableCell className="text-right font-semibold">{quiz.score}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
