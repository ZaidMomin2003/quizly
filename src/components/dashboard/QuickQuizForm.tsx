
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function QuickQuizForm() {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically handle form submission,
        // for now we just navigate to the quizzes page
        router.push('/quizzes');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Start a Quick Quiz</CardTitle>
                <CardDescription>Generate a practice quiz on any topic.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="topics">Topics (comma-separated)</Label>
                        <Input id="topics" placeholder="e.g., Thermodynamics, Organic Chemistry" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                             <Select name="subject">
                                <SelectTrigger id="subject">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="physics">Physics</SelectItem>
                                    <SelectItem value="chemistry">Chemistry</SelectItem>
                                    <SelectItem value="biology">Biology</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="questions">Number of Questions</Label>
                           <Input id="questions" type="number" placeholder="e.g., 10" />
                        </div>
                         <div className="flex items-end">
                            <Button type="submit" className="w-full">
                                Generate Quiz
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
