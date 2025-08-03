

"use client";

import { Bot, Home, Settings, UserCircle, Trophy, ListChecks, Timer, Bookmark, FileQuestion, Crown, LogOut, Loader2, Camera, User, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { PomodoroTimer } from '../pomodoro/PomodoroTimer';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { useBookmarkStore } from '@/stores/bookmark-store';
import { usePomodoroStore } from '@/stores/pomodoro-store';
import { Skeleton } from '../ui/skeleton';
import { useOnboardingStore } from '@/stores/onboarding-store';


const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/pomodoro', label: 'Pomodoro', icon: Timer },
  { href: '/dashboard/quizzes', label: 'Quizzes', icon: FileQuestion },
  { href: '/dashboard/capture', label: 'Capture', icon: Camera },
  { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { clearAnalytics } = useAnalyticsStore();
  const { clearBookmarks } = useBookmarkStore();
  const { clearPomodoro } = usePomodoroStore();
  const { clearOnboarding } = useOnboardingStore();

  const handleLogout = async () => {
    await signOut();
    clearAnalytics();
    clearBookmarks();
    clearPomodoro();
    clearOnboarding();
    router.push('/login');
  };

  const getAvatarFallback = (name: string | null | undefined) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return parts[0][0] + parts[1][0];
    }
    return name[0];
  }

  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">QuizlyAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
                <Link href={item.href} className="w-full">
                    <SidebarMenuButton isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t mt-auto">
        <PomodoroTimer />
        <div className={cn("mb-2 group-data-[collapsible=icon]:hidden")}>
             <Button asChild className="w-full justify-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600">
                <Link href="/dashboard/pricing">
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Upgrade Now</span>
                </Link>
            </Button>
        </div>
        <div className="flex items-center justify-between p-2 group-data-[collapsible=icon]:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="justify-start gap-3 px-2 w-full" disabled={loading}>
                        {loading ? (
                             <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="flex flex-col items-start gap-1">
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                    src={user?.photoURL || ''}
                                    alt={user?.displayName || 'User'}
                                    data-ai-hint="profile avatar"
                                    />
                                    <AvatarFallback>{getAvatarFallback(user?.displayName)}</AvatarFallback>
                                </Avatar>
                                <span className='font-semibold'>{user?.displayName || 'User'}</span>
                            </>
                        )}
                         
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='w-56 mb-2'>
                    <DropdownMenuLabel className='font-normal'>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-sm font-medium leading-none'>{user?.displayName || 'User'}</p>
                            <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem asChild>
                       <Link href="/dashboard/profile">
                         <UserCircle className='mr-2' />
                         Profile
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                       <Link href="/dashboard/support">
                         <LifeBuoy className='mr-2' />
                         Support
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className='mr-2' />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                        <LogOut className='mr-2' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
        </div>

      </SidebarFooter>
    </>
  );
}
