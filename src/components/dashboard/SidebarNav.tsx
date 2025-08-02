import { Bot, BarChart2, FileText, Home, Settings, UserCircle } from 'lucide-react';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function SidebarNav() {
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
          <SidebarMenuItem>
            <SidebarMenuButton isActive>
              <Home />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FileText />
              Quizzes
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <BarChart2 />
              Analytics
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserCircle />
              Profile
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
