import { Search, Pin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
}

const pinnedChats: Contact[] = [
  {
    id: 'george-lobko',
    name: 'George Lobko',
    lastMessage: 'Thanks for the quick response.',
    timestamp: '09:41',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    online: true,
  },
  {
    id: 'amelia-karis',
    name: 'Amelia Karis',
    lastMessage: 'I\'m stuck in traffic 🚗 | but...',
    timestamp: '01:26',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    online: false,
    unread: 3,
  },
  {
    id: 'arnold-linkoln',
    name: 'Arnold Linkoln',
    lastMessage: 'Great job on the presenta...',
    timestamp: '18:17',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    online: false,
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
  return (
    <div className="w-80 bg-background border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Messages</h2>
        
        {/* Team Members */}
        <div className="flex items-center gap-2 mb-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative">
              {member.avatar ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                  {member.name}
                </div>
              )}
              {member.online && member.avatar && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-status-online rounded-full border-2 border-background"></div>
              )}
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or start of message"
            className="pl-9"
          />
        </div>
      </div>

      {/* Chat Lists */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Chats */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Pin className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Pinned Chats</h3>
          </div>
          
          <div className="space-y-1">
            {pinnedChats.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onChatSelect(contact.id)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  activeChat === contact.id ? 'bg-accent' : 'hover:bg-muted'
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-status-online rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-foreground truncate">{contact.name}</h4>
                    <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
                
                {contact.unread && (
                  <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                    {contact.unread}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All Chats */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">All Chats</h3>
          
          <div className="space-y-1">
            {allChats.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onChatSelect(contact.id)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  activeChat === contact.id ? 'bg-accent' : 'hover:bg-muted'
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-status-online rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-foreground truncate">{contact.name}</h4>
                    <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                  </div>
                  <p className={`text-sm truncate ${contact.isTyping ? 'text-primary italic' : 'text-muted-foreground'}`}>
                    {contact.lastMessage}
                  </p>
                </div>
                
                {contact.unread && (
                  <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                    {contact.unread}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};