import { Header } from '@/components/dashboard/Header';
import { QuickStartCard } from '@/components/dashboard/QuickStartCard';
import { SubjectProgressCard } from '@/components/dashboard/SubjectProgressCard';
import { PerformanceAnalyticsCard } from '@/components/dashboard/PerformanceAnalyticsCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { AiRecommendationCard } from '@/components/dashboard/AiRecommendationCard';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <AiRecommendationCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PerformanceAnalyticsCard />
                <SubjectProgressCard />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <QuickStartCard />
            <RecentActivityCard />
          </div>
        </div>
      </main>
    </div>
  );
}
