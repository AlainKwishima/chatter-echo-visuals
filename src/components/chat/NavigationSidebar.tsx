import { MessageSquare, Users, Star, Phone, Files, Bot, Settings } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';

const navigationItems = [
  { icon: MessageSquare, label: 'Messages', path: '/', badge: 8 },
  { icon: Users, label: 'Groups', path: '/groups' },
  { icon: Star, label: 'Favourites', path: '/favourites' },
  { icon: Phone, label: 'Calls', path: '/calls' },
  { icon: Files, label: 'Files', path: '/files' },
];

interface NavigationSidebarProps {
  onToggle?: () => void;
}

export const NavigationSidebar = ({ onToggle }: NavigationSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close mobile menu after navigation
    if (onToggle) {
      onToggle();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <TooltipProvider>
      <div className="w-20 gradient-sidebar border-r border-sidebar-border flex flex-col items-center py-6 shadow-elegant">
        {/* AI Chat Logo */}
        <div 
          className="mb-8 p-3 gradient-primary rounded-xl shadow-glow animate-bounce-gentle cursor-pointer"
          onClick={() => navigate('/')}
        >
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
                    onClick={() => handleNavigation(item.path)}
                    className={`h-12 w-12 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
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
              onClick={() => handleNavigation('/settings')}
              className={`h-12 w-12 rounded-xl transition-all duration-300 hover:scale-105 mb-4 ${
                isActive('/settings')
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-glow'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
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