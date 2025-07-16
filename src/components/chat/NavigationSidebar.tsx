import { MessageSquare, Users, Star, Calendar, Files, LayoutDashboard, Bot } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: MessageSquare, label: 'Messages', active: true, badge: 8 },
  { icon: Users, label: 'Groups', active: false },
  { icon: Star, label: 'Favourites', active: false },
  { icon: Calendar, label: 'Calendar', active: false },
  { icon: Files, label: 'Files', active: false },
];

export const NavigationSidebar = () => {
  return (
    <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4">
      {/* AI Chat Logo */}
      <div className="mb-8 p-2 bg-primary rounded-lg">
        <Bot className="h-6 w-6 text-primary-foreground" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 flex-1">
        {navigationItems.map((item, index) => (
          <div key={index} className="relative">
            <button
              className={`p-3 rounded-lg transition-colors relative ${
                item.active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          </div>
        ))}
      </nav>

      {/* User Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JB</AvatarFallback>
      </Avatar>
    </div>
  );
};