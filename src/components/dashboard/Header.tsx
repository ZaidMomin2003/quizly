import { SidebarTrigger } from '../ui/sidebar';
import { ThemeToggle } from './ThemeToggle';
import { ActivityLog } from './ActivityLog';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <ActivityLog />
      </div>
    </header>
  );
}
