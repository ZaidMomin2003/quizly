import { Bot } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { ActivityLog } from './ActivityLog';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="flex items-center gap-2 md:hidden">
          <Bot className="h-6 w-6 text-primary" />
          <span className="font-semibold">QuizlyAI</span>
        </div>
      <div className="flex items-center gap-2 ml-auto">
        <ActivityLog />
        <SidebarTrigger className="md:hidden" />
      </div>
    </header>
  );
}
