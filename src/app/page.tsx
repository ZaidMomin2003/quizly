import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { Header } from '@/components/dashboard/Header';
import { QuickStartCard } from '@/components/dashboard/QuickStartCard';
import { SubjectProgressCard } from '@/components/dashboard/SubjectProgressCard';
import { PerformanceAnalyticsCard } from '@/components/dashboard/PerformanceAnalyticsCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { AiRecommendationCard } from '@/components/dashboard/AiRecommendationCard';

export default function HomePage() {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen bg-background">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <QuickStartCard />
                  <SubjectProgressCard />
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <PerformanceAnalyticsCard />
                  <RecentActivityCard />
                </div>
                <AiRecommendationCard />
              </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
