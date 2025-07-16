import { Phone, PhoneCall, PhoneIncoming, PhoneMissed, PhoneOutgoing, Video, Search, MoreVertical, Clock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const calls = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bc?w=150',
    type: 'incoming',
    missed: false,
    time: '2 minutes ago',
    duration: '5:23',
    isVideo: false
  },
  {
    id: 2,
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    type: 'outgoing',
    missed: false,
    time: '1 hour ago',
    duration: '12:45',
    isVideo: true
  },
  {
    id: 3,
    name: 'Mom',
    avatar: 'https://images.unsplash.com/photo-1543051932-6ef9fecfbc74?w=150',
    type: 'incoming',
    missed: true,
    time: '3 hours ago',
    duration: null,
    isVideo: false
  },
  {
    id: 4,
    name: 'Design Team',
    avatar: '🎨',
    type: 'outgoing',
    missed: false,
    time: 'Yesterday',
    duration: '45:12',
    isVideo: true,
    isGroup: true
  },
  {
    id: 5,
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    type: 'incoming',
    missed: true,
    time: 'Yesterday',
    duration: null,
    isVideo: false
  }
];

const CallIcon = ({ type, missed, isVideo }: { type: string; missed: boolean; isVideo: boolean }) => {
  if (missed) {
    return <PhoneMissed className="h-4 w-4 text-destructive" />;
  }
  
  if (isVideo) {
    return <Video className={`h-4 w-4 ${type === 'incoming' ? 'text-green-500' : 'text-blue-500'}`} />;
  }
  
  if (type === 'incoming') {
    return <PhoneIncoming className="h-4 w-4 text-green-500" />;
  }
  
  return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
};

const Calls = () => {
  return (
    <div className="h-full gradient-main flex flex-col">
      {/* Header */}
      <div className="border-b border-chat-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Calls</h1>
          </div>
          <Button size="sm" className="gradient-primary shadow-glow">
            <PhoneCall className="h-4 w-4 mr-2" />
            New Call
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calls..."
            className="pl-10 bg-chat-background border-chat-border focus:border-primary"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="border-b border-chat-border px-6">
          <TabsList className="grid w-full grid-cols-3 bg-chat-background">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="missed">Missed</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 overflow-y-auto m-0">
          <div className="p-4 space-y-2">
            {calls.map((call) => (
              <div
                key={call.id}
                className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    {call.isGroup ? (
                      <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-lg shadow-glow">
                        {call.avatar}
                      </div>
                    ) : (
                      <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-elegant">
                        <AvatarImage src={call.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {call.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>

                  {/* Call Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CallIcon type={call.type} missed={call.missed} isVideo={call.isVideo} />
                      <h3 className="font-semibold text-foreground truncate">
                        {call.name}
                      </h3>
                      {call.missed && (
                        <Badge variant="destructive" className="text-xs">
                          Missed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{call.time}</span>
                      {call.duration && (
                        <>
                          <span>•</span>
                          <span>{call.duration}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="missed" className="flex-1 overflow-y-auto m-0">
          <div className="p-4 space-y-2">
            {calls.filter(call => call.missed).map((call) => (
              <div
                key={call.id}
                className="p-4 rounded-xl bg-chat-background border border-destructive/20 hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-destructive/20 shadow-elegant">
                      <AvatarImage src={call.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {call.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <PhoneMissed className="h-4 w-4 text-destructive" />
                      <h3 className="font-semibold text-foreground truncate">
                        {call.name}
                      </h3>
                      <Badge variant="destructive" className="text-xs">
                        Missed
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{call.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 border-destructive/20">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="flex-1 overflow-y-auto m-0">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Phone className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No favorite calls</h3>
              <p className="text-muted-foreground">
                Mark frequent contacts as favorites for quick access
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calls;