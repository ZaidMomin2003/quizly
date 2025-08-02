import { Header } from '@/components/dashboard/Header';
import { QuickQuiz } from '@/components/dashboard/QuickQuiz';
import { SubjectStatsCard } from '@/components/dashboard/SubjectStatsCard';
import { WeeklyProgressChart } from '@/components/dashboard/WeeklyProgressChart';
import { WeakConcepts } from '@/components/dashboard/WeakConcepts';

export default function HomePage() {
  // Mock data - in a real app, this would come from a database
  const stats = [
    {
      subject: 'Physics',
      solved: 125,
      iconName: 'atom' as const,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      subject: 'Chemistry',
      solved: 88,
      iconName: 'flask-conical' as const,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      subject: 'Biology',
      solved: 210,
      iconName: 'dna' as const,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">A quick overview of your progress.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <SubjectStatsCard
              key={stat.subject}
              subject={stat.subject}
              solved={stat.solved}
              iconName={stat.iconName}
              color={stat.color}
              bgColor={stat.bgColor}
            />
          ))}
        </div>
        <div className="mb-8">
            <QuickQuiz />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            <div className="lg:col-span-7">
                <WeeklyProgressChart />
            </div>
            <div className="lg:col-span-3">
                <WeakConcepts />
            </div>
        </div>
      </main>
    </div>
  );
}
