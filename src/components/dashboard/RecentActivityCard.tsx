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

const recentQuizzes = [
  {
    id: 1,
    name: 'Organic Chemistry Basics',
    subject: 'Chemistry',
    score: 88,
    date: '2024-07-20',
  },
  {
    id: 2,
    name: 'Kinematics',
    subject: 'Physics',
    score: 72,
    date: '2024-07-19',
  },
  {
    id: 3,
    name: 'Cell Biology',
    subject: 'Biology',
    score: 95,
    date: '2024-07-19',
  },
  {
    id: 4,
    name: 'Thermodynamics',
    subject: 'Physics',
    score: 65,
    date: '2024-07-18',
  },
];

export function RecentActivityCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Recent Quiz Activity</CardTitle>
            <CardDescription>
            An overview of your most recent quizzes.
            </CardDescription>
        </div>
        <Button variant="outline">View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead className="hidden sm:table-cell">Subject</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentQuizzes.map(quiz => (
              <TableRow key={quiz.id}>
                <TableCell className="font-medium">{quiz.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{quiz.subject}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{quiz.date}</TableCell>
                <TableCell className="text-right">{quiz.score}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
