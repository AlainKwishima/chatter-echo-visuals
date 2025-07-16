import { Search, Pin, MoreVertical, Archive, Bell, BellOff } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ContactsSidebarProps {
  activeChat: string;
  onChatSelect: (chatId: string) => void;
}

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  online: boolean;
  unread?: number;
  isTyping?: boolean;
  muted?: boolean;
  pinned?: boolean;
}

const pinnedChats: Contact[] = [
  {
    id: 'george-lobko',
    name: 'George Lobko',
    lastMessage: 'Thanks for the quick response.',
    timestamp: '09:41',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    online: true,
    pinned: true,
  },
  {
    id: 'amelia-karis',
    name: 'Amelia Karis',
    lastMessage: 'I\'m stuck in traffic 🚗 | but...',
    timestamp: '01:26',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    online: false,
    unread: 3,
    pinned: true,
  },
  {
    id: 'arnold-linkoln',
    name: 'Arnold Linkoln',
    lastMessage: 'Great job on the presenta...',
    timestamp: '18:17',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    online: false,
    pinned: true,
  },
];

const allChats: Contact[] = [
  {
    id: 'hasima-medvedeva',
    name: 'Hasima Medvedeva',
    lastMessage: 'Hasima is typing...',
    timestamp: '12:15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    online: true,
    unread: 1,
    isTyping: true,
  },
  {
    id: 'ntkio-team',
    name: 'Ntkio Team',
    lastMessage: 'Daniel is typing...',
    timestamp: '12:13',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    online: true,
    isTyping: true,
  },
  {
    id: 'anatoly-ferrusco',
    name: 'Anatoly Ferrusco',
    lastMessage: 'Sorry for the delay, 😊 I\'ll b...',
    timestamp: '11:53',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    online: false,
    muted: true,
  },
  {
    id: 'anna-gordienko',
    name: 'Anna Gordienko',
    lastMessage: 'Anna is typing...',
    timestamp: '10:41',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    online: false,
    isTyping: true,
  },
  {
    id: 'maksim-yerush',
    name: 'Maksim Yerush',
    lastMessage: 'Hi there, I need to go)',
    timestamp: '9:14',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    online: false,
  },
];

const teamMembers = [
  { name: 'Daniel', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', online: true },
  { name: 'Ntkio', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', online: true },
  { name: 'Anna', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face', online: true },
  { name: 'Nelly', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', online: true },
  { name: '+15', avatar: null, online: false },
];

export const ContactsSidebar = ({ activeChat, onChatSelect }: ContactsSidebarProps) => {
  const ChatItem = ({ contact, index }: { contact: Contact; index: number }) => (
    <div
      key={contact.id}
      onClick={() => onChatSelect(contact.id)}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-elegant group animate-fade-in ${
        activeChat === contact.id 
          ? 'bg-accent shadow-elegant scale-105' 
          : 'hover:bg-muted/50 hover:scale-102'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 shadow-elegant hover:scale-110 transition-transform duration-300">
          <AvatarImage src={contact.avatar} />
          <AvatarFallback className="bg-primary text-primary-foreground font-bold">{contact.name[0]}</AvatarFallback>
        </Avatar>
        {contact.online && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-status-online rounded-full border-2 border-background animate-bounce-gentle"></div>
        )}
        {contact.muted && (
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-muted rounded-full border-2 border-background flex items-center justify-center">
            <BellOff className="h-2 w-2 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-sm text-foreground truncate flex items-center gap-1">
            {contact.name}
            {contact.pinned && <Pin className="h-3 w-3 text-primary" />}
          </h4>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border shadow-elegant">
                <DropdownMenuItem className="hover:bg-accent">
                  <Pin className="h-4 w-4 mr-2" />
                  {contact.pinned ? 'Unpin' : 'Pin'} Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">
                  {contact.muted ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
                  {contact.muted ? 'Unmute' : 'Mute'} Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className={`text-sm truncate ${
          contact.isTyping 
            ? 'text-primary italic animate-pulse' 
            : 'text-muted-foreground'
        }`}>
          {contact.lastMessage}
        </p>
      </div>
      
      {contact.unread && (
        <Badge 
          variant="secondary" 
          className="bg-destructive text-destructive-foreground animate-bounce-gentle shadow-elegant"
        >
          {contact.unread}
        </Badge>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <div className="w-96 bg-card border-l border-border flex flex-col shadow-elegant">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-card to-muted/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Messages</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Team Members */}
          <div className="flex items-center gap-3 mb-6">
            {teamMembers.map((member, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div 
                    className="relative animate-fade-in hover:scale-110 transition-transform duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {member.avatar ? (
                      <Avatar className="h-10 w-10 shadow-elegant">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-xs font-medium shadow-elegant">
                        {member.name}
                      </div>
                    )}
                    {member.online && member.avatar && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-status-online rounded-full border-2 border-background animate-bounce-gentle"></div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{member.name} {member.online ? '(Online)' : '(Offline)'}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search or start of message"
              className="pl-10 rounded-full border-2 focus:border-primary transition-all duration-300 shadow-elegant"
            />
          </div>
        </div>

        {/* Chat Lists */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-card to-muted/10">
          {/* Pinned Chats */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Pin className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Pinned Chats</h3>
              <Badge variant="outline" className="text-xs">
                {pinnedChats.length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {pinnedChats.map((contact, index) => (
                <ChatItem key={contact.id} contact={contact} index={index} />
              ))}
            </div>
          </div>

          {/* All Chats */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">All Chats</h3>
              <Badge variant="outline" className="text-xs">
                {allChats.length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {allChats.map((contact, index) => (
                <ChatItem key={contact.id} contact={contact} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};