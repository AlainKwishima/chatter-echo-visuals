import { MessageSquare, Users, Star, Calendar, Files, LayoutDashboard, Bot, Settings } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <TooltipProvider>
      <div className="w-20 gradient-sidebar border-r border-sidebar-border flex flex-col items-center py-6 shadow-elegant">
        {/* AI Chat Logo */}
        <div className="mb-8 p-3 gradient-primary rounded-xl shadow-glow animate-bounce-gentle">
          <Bot className="h-7 w-7 text-primary-foreground" />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-3 flex-1">
          {navigationItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-12 w-12 rounded-xl transition-all duration-300 ${
                      item.active
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-glow transform scale-110'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-105'
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce-gentle">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-popover border-border">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-300 hover:scale-105 mb-4"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-popover border-border">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>

        {/* User Avatar */}
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-sidebar-accent cursor-pointer hover:scale-110 transition-transform duration-300 shadow-elegant">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">JB</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-status-online rounded-full border-2 border-sidebar-background animate-bounce-gentle"></div>
        </div>
      </div>
    </TooltipProvider>
  );
};