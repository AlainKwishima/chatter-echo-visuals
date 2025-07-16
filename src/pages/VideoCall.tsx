import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Camera, Monitor, Users, MessageSquare, Settings, Maximize, Minimize } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const participants = [
    {
      id: 1,
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bc?w=150',
      isMuted: false,
      isVideoOff: false,
      isHost: true
    },
    {
      id: 2,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isMuted: true,
      isVideoOff: false,
      isHost: false
    },
    {
      id: 3,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      isMuted: false,
      isVideoOff: true,
      isHost: false
    }
  ];

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Video Grid */}
      <div className="flex-1 relative">
        {/* Main Speaker View */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
          <div className="h-full w-full flex items-center justify-center relative">
            {/* Main participant video placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl">
                <AvatarImage src={participants[0].avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {participants[0].name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Speaker name and status */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">{participants[0].name}</span>
                {participants[0].isHost && (
                  <Badge variant="secondary" className="text-xs">Host</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Participant Grid (Sidebar) */}
        <div className="absolute top-4 right-4 space-y-2 z-10">
          {participants.slice(1).map((participant) => (
            <div
              key={participant.id}
              className="w-48 h-36 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-white/10 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-200"
            >
              {participant.isVideoOff ? (
                <div className="h-full flex items-center justify-center">
                  <Avatar className="h-16 w-16 border-2 border-white/20">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Avatar className="h-16 w-16 border-2 border-white/20">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Participant status */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-medium truncate">
                    {participant.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {participant.isMuted && (
                      <MicOff className="h-3 w-3 text-red-500" />
                    )}
                    {participant.isVideoOff && (
                      <VideoOff className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call Info */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 z-10">
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">00:15:32</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">{participants.length}</span>
            </div>
          </div>
        </div>

        {/* Fullscreen Toggle */}
        <div className="absolute top-4 right-4 left-auto mr-56 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="bg-black/50 backdrop-blur-sm border-white/10 text-white hover:bg-black/70"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-black/80 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Microphone */}
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="icon"
            className={`h-12 w-12 rounded-full ${isMuted ? '' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          {/* Camera */}
          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="icon"
            className={`h-12 w-12 rounded-full ${isVideoOff ? '' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <Monitor className="h-5 w-5" />
          </Button>

          {/* Chat */}
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="icon"
            className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        {/* Secondary Controls */}
        <div className="flex items-center justify-between mt-4 text-white/70 text-sm">
          <div className="flex items-center gap-4">
            <span>{currentTime}</span>
            <span>Design Team Meeting</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>HD Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;