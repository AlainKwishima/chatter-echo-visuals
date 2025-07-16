import { Users, Plus, Search, MoreVertical, Shield, Crown, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const groups = [
  {
    id: 1,
    name: 'Design Team',
    members: 12,
    lastMessage: 'Sarah shared a new mockup',
    time: '2m ago',
    unread: 3,
    avatar: '🎨',
    isAdmin: true
  },
  {
    id: 2,
    name: 'Project Alpha',
    members: 8,
    lastMessage: 'Meeting at 3 PM today',
    time: '15m ago',
    unread: 0,
    avatar: '🚀',
    isAdmin: false
  },
  {
    id: 3,
    name: 'Family Group',
    members: 5,
    lastMessage: 'Mom: Dinner tonight?',
    time: '1h ago',
    unread: 1,
    avatar: '👨‍👩‍👧‍👦',
    isAdmin: false
  },
  {
    id: 4,
    name: 'Gaming Squad',
    members: 15,
    lastMessage: 'Anyone up for a match?',
    time: '3h ago',
    unread: 5,
    avatar: '🎮',
    isAdmin: false
  }
];

const Groups = () => {
  return (
    <div className="h-full gradient-main flex flex-col">
      {/* Header */}
      <div className="border-b border-chat-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Groups</h1>
          <Button size="sm" className="gradient-primary shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            New Group
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-10 bg-chat-background border-chat-border focus:border-primary"
          />
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {/* Group Avatar */}
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-lg shadow-glow">
                    {group.avatar}
                  </div>
                  {group.isAdmin && (
                    <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                  )}
                </div>

                {/* Group Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {group.unread > 0 && (
                        <Badge variant="destructive" className="animate-bounce-gentle">
                          {group.unread}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {group.time}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {group.lastMessage}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {group.members}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-chat-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Broadcast
          </Button>
          <Button variant="outline" className="flex-1">
            <Shield className="h-4 w-4 mr-2" />
            Moderation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Groups;