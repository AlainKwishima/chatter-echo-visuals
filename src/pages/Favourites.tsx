import { Star, Search, MoreVertical, MessageSquare, Phone, Video } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const favourites = [
  {
    id: 1,
    name: 'Sarah Wilson',
    lastMessage: 'Thanks for the help with the project!',
    time: '5m ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bc?w=150',
    online: true,
    unread: 0
  },
  {
    id: 2,
    name: 'Design Team',
    lastMessage: 'New mockups ready for review',
    time: '12m ago',
    avatar: '🎨',
    online: false,
    unread: 2,
    isGroup: true
  },
  {
    id: 3,
    name: 'Mom',
    lastMessage: 'Don\'t forget dinner tonight',
    time: '1h ago',
    avatar: 'https://images.unsplash.com/photo-1543051932-6ef9fecfbc74?w=150',
    online: true,
    unread: 1
  },
  {
    id: 4,
    name: 'John Smith',
    lastMessage: 'Meeting rescheduled to tomorrow',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    online: false,
    unread: 0
  },
  {
    id: 5,
    name: 'Gaming Squad',
    lastMessage: 'Who\'s ready for tonight\'s match?',
    time: '3h ago',
    avatar: '🎮',
    online: false,
    unread: 3,
    isGroup: true
  }
];

const Favourites = () => {
  return (
    <div className="h-screen gradient-main flex flex-col">
      {/* Header */}
      <div className="border-b border-chat-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-foreground">Favourites</h1>
          </div>
          <Badge variant="secondary" className="animate-fade-in">
            {favourites.length} starred
          </Badge>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search favourites..."
            className="pl-10 bg-chat-background border-chat-border focus:border-primary"
          />
        </div>
      </div>

      {/* Favourites List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {favourites.map((favourite) => (
            <div
              key={favourite.id}
              className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  {favourite.isGroup ? (
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-lg shadow-glow">
                      {favourite.avatar}
                    </div>
                  ) : (
                    <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-elegant">
                      <AvatarImage src={favourite.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {favourite.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  {/* Online indicator */}
                  {favourite.online && !favourite.isGroup && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-status-online rounded-full border-2 border-chat-background animate-bounce-gentle"></div>
                  )}
                  
                  {/* Favourite star */}
                  <Star className="absolute -top-1 -left-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {favourite.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {favourite.unread > 0 && (
                        <Badge variant="destructive" className="animate-bounce-gentle">
                          {favourite.unread}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {favourite.time}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">
                    {favourite.lastMessage}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  {!favourite.isGroup && (
                    <>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State (hidden when there are favourites) */}
      {favourites.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No favourites yet</h3>
            <p className="text-muted-foreground">
              Star your important chats to see them here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;