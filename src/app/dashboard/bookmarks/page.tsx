

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Bookmark, Trash2, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useBookmarkStore, Bookmark as BookmarkType } from '@/stores/bookmark-store';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { bookmarks, removeBookmark, isLoaded } = useBookmarkStore();
  const { toast } = useToast();

  const handleRemove = (e: React.MouseEvent, bookmark: BookmarkType) => {
    e.stopPropagation(); // Prevent accordion from opening/closing
    removeBookmark(bookmark);
    toast({
      title: "Bookmark Removed",
      description: "The question has been removed from your bookmarks."
    });
  }

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(bookmark =>
      bookmark.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, bookmarks]);

  const groupedBookmarks = useMemo(() => {
    return filteredBookmarks.reduce((acc, bookmark) => {
      const date = new Date(bookmark.date).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(bookmark);
      return acc;
    }, {} as Record<string, BookmarkType[]>);
  }, [filteredBookmarks]);
  
  const getCorrectAnswerText = (bookmark: BookmarkType) => {
      return bookmark.options.find(opt => opt.startsWith(bookmark.answer)) || 'N/A';
  }

  if (!isLoaded) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-semibold">Loading Bookmarks...</h2>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Bookmark className='h-7 w-7' />
                Bookmarked Questions
            </h1>
            <p className="text-muted-foreground">Review your saved questions and their explanations here.</p>
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
                Object.entries(groupedBookmarks).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).map(([date, bookmarksInDate]) => (
                <div key={date}>
                    <div className="flex items-center gap-4 mb-4">
                        <Separator className='flex-1' />
                        <h2 className="text-lg font-semibold whitespace-nowrap">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </h2>
                        <Separator className='flex-1' />
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {bookmarksInDate.map(bookmark => (
                          <AccordionItem value={bookmark.id} key={bookmark.id} className="border-b-0">
                             <Card>
                                <div className="flex items-start justify-between p-4">
                                    <AccordionTrigger className="p-0 flex-1 hover:no-underline">
                                        <p className="font-medium mr-4 text-left">{bookmark.question}</p>
                                    </AccordionTrigger>
                                    <div className='flex items-center gap-2 ml-4'>
                                        <Badge variant="outline">{bookmark.subject}</Badge>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleRemove(e, bookmark)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                               <AccordionContent className="p-4 pt-0">
                                   <div className="space-y-4 pt-4 border-t">
                                        <div className="text-muted-foreground">
                                            <p><span className="font-semibold text-foreground">Options:</span></p>
                                            <ul className='list-disc pl-5 mt-2'>
                                                {bookmark.options.map(opt => <li key={opt}>{opt}</li>)}
                                            </ul>
                                            <p className='mt-2'><span className="font-semibold text-foreground">Correct Answer:</span> {getCorrectAnswerText(bookmark)}</p>
                                        </div>
                                        <div className="p-4 bg-accent/50 rounded-lg">
                                            <h4 className="font-semibold mb-2">Explanation</h4>
                                            <p className="text-muted-foreground">{bookmark.explanation}</p>
                                        </div>
                                    </div>
                               </AccordionContent>
                             </Card>
                          </AccordionItem>
                      ))}
                    </Accordion>
                </div>
                ))
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">You haven't bookmarked any questions yet.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
