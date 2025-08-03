
'use client';

import { useEffect } from 'react';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { useAuth } from '@/hooks/use-auth';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useBookmarkStore } from '@/stores/bookmark-store';
import { usePomodoroStore } from '@/stores/pomodoro-store';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: isAuthLoading } = useAuth();
  const { loadAnalytics, isLoaded: isAnalyticsLoaded } = useAnalyticsStore();
  const { loadBookmarks, isLoaded: isBookmarksLoaded } = useBookmarkStore();
  const { loadPomodoro, isLoaded: isPomodoroLoaded } = usePomodoroStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);
  
  useEffect(() => {
    if (user) {
      loadAnalytics(user.uid);
      loadBookmarks(user.uid);
      loadPomodoro(user.uid);
    }
  }, [user, loadAnalytics, loadBookmarks, loadPomodoro]);

  const isLoading = isAuthLoading || !user || !isAnalyticsLoaded || !isBookmarksLoaded || !isPomodoroLoaded;

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className='ml-4 text-lg'>Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
        <Sidebar>
            <SidebarNav />
        </Sidebar>
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
