
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data, in a real app this would come from an API/DB
const mockBookmarks = [
  {
    id: 1,
    question: 'What is the powerhouse of the cell?',
    subject: 'Biology',
    date: '2024-07-30',
  },
  {
    id: 2,
    question: 'What is the law of conservation of energy?',
    subject: 'Physics',
    date: '2024-07-30',
  },
  {
    id: 3,
    question: 'What is the chemical formula for water?',
    subject: 'Chemistry',
    date: '2024-07-29',
  },
  {
    id: 4,
    question: 'Explain the process of photosynthesis.',
    subject: 'Biology',
    date: '2024-07-29',
  },
  {
    id: 5,
    question: 'Define Newton\'s first law of motion.',
    subject: 'Physics',
    date: '2024-07-28',
  },
];

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookmarks = useMemo(() => {
    return mockBookmarks.filter(bookmark =>
      bookmark.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const groupedBookmarks = useMemo(() => {
    return filteredBookmarks.reduce((acc, bookmark) => {
      const { date } = bookmark;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(bookmark);
      return acc;
    }, {} as Record<string, typeof filteredBookmarks>);
  }, [filteredBookmarks]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Bookmark className='h-8 w-8' />
                Bookmarked Questions
            </h1>
            <p className="text-muted-foreground">Review your saved questions here.</p>
          </div>
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by question or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-8">
            {Object.keys(groupedBookmarks).length > 0 ? (
                Object.entries(groupedBookmarks).map(([date, bookmarks]) => (
                <div key={date}>
                    <div className="flex items-center gap-4 mb-4">
                        <Separator className='flex-1' />
                        <h2 className="text-lg font-semibold whitespace-nowrap">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </h2>
                        <Separator className='flex-1' />
                    </div>
                    <div className="space-y-4">
                    {bookmarks.map(bookmark => (
                        <Card key={bookmark.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <p className="font-medium mr-4">{bookmark.question}</p>
                                <Badge variant="outline">{bookmark.subject}</Badge>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                </div>
                ))
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No bookmarked questions found.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
