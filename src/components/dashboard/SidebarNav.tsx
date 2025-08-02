"use client";

import { Bot, BarChart2, FileText, Home, Settings, UserCircle, Trophy, ListChecks, Timer } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/quizzes', label: 'Quizzes', icon: FileText },
  { href: '#', label: 'Test Series', icon: ListChecks },
  { href: '#', label: 'Pomodoro', icon: Timer },
  { href: '#', label: 'Leaderboard', icon: Trophy },
  { href: '#', label: 'Analytics', icon: BarChart2 },
];

const bottomMenuItems = [
    { href: '#', label: 'Profile', icon: UserCircle },
    { href: '#', label: 'Settings', icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname();

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
                    <SidebarMenuButton isActive={pathname === item.href}>
                        <item.icon />
                        {item.label}
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t mt-auto">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
                <Link href={item.href} className="w-full">
                    <SidebarMenuButton isActive={pathname === item.href}>
                        <item.icon />
                        {item.label}
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
