
'use client';

import { Header } from '@/components/dashboard/Header';
import { UserStats } from '@/components/leaderboard/UserStats';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Star } from 'lucide-react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useEffect, useState } from 'react';

// Mock data
const topUsers = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1,
  name: `User ${Math.floor(Math.random() * 1000)}`,
  score: 10000 - i * 250 - Math.floor(Math.random() * 100),
  avatar: `https://i.pravatar.cc/40?u=user${i}`
}));


export default function LeaderboardPage() {
  const { stats } = useAnalyticsStore();
  const [isClient, setIsClient] = useState(false);
  const [rank, setRank] = useState(21); // Keep mock rank for now

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
           <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Trophy className='h-8 w-8 text-primary' />
                Leaderboard
            </h1>
            <p className="text-muted-foreground">See how you stack up against other students.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Rank</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-7xl font-bold text-primary">{isClient ? rank : '...'}</div>
                    <p className="text-muted-foreground">Keep pushing to climb higher!</p>
                </CardContent>
              </Card>

              <UserStats />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top 20 Performers</CardTitle>
                  <CardDescription>The current leaders in the competition.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-16'>Rank</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead className='text-right'>Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topUsers.map(user => (
                                <TableRow key={user.rank}>
                                    <TableCell className='font-bold text-lg'>
                                        <div className='flex items-center justify-center'>
                                            {user.rank <= 3 ? <Star className={`w-5 h-5 ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-400' : 'text-yellow-600' }`} /> : user.rank}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='h-9 w-9'>
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className='font-medium'>{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-right font-mono font-semibold'>{user.score.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
