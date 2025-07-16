import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreHorizontal, Heart, Reply, Image, File, Mic, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatAreaProps {
  activeChat: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar?: string;
  type?: 'text' | 'image' | 'file';
  reactions?: Array<{ emoji: string; count: number; users: string[] }>;
  replyTo?: string;
  status?: 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Anna',
    content: 'We need to finalize the typography options for our website',
    timestamp: '11:45',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    reactions: [{ emoji: '👍', count: 2, users: ['Daniel', 'Jordan'] }],
    status: 'read'
  },
  {
    id: '2',
    sender: 'Daniel Garcia',
    content: 'Check out pls this initial sketch for our new project? 🤔',
    timestamp: '12:04',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    reactions: [{ emoji: '❤️', count: 1, users: ['Anna'] }, { emoji: '🔥', count: 2, users: ['Jordan', 'You'] }],
    status: 'read'
  },
  {
    id: '3',
    sender: 'Jordan Betard',
    content: 'Hi team 👋 Let\'s hop on call to discuss the new project.',
    timestamp: '12:11',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    replyTo: '2',
    status: 'read'
  },
  {
    id: '4',
    sender: 'You',
    content: 'Good Concepts! 🚀',
    timestamp: '12:15',
    isOwn: true,
    reactions: [{ emoji: '💯', count: 3, users: ['Anna', 'Daniel', 'Jordan'] }],
    status: 'read'
  },
  {
    id: '5',
    sender: 'Monika',
    content: 'Is typing...',
    timestamp: '',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  }
];

const teamMembers = [
  { name: 'Daniel', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', online: true },
  { name: 'Nikto', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', online: true },
  { name: 'Anna', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face', online: true },
  { name: 'Nelly', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', online: true },
  { name: '+15', avatar: null, online: false }
];

const quickReactions = ['👍', '❤️', '😊', '🔥', '💯', '🚀'];

export const ChatArea = ({ activeChat }: ChatAreaProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
      setReplyingTo(null);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    // Handle adding reaction
    console.log(`Adding ${emoji} to message ${messageId}`);
  };

  const getMessageStatus = (status?: string) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return <span className="text-primary">✓✓</span>;
      default:
        return '';
    }
  };

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col bg-background relative">
        {/* Chat Header */}
        <div className="border-b border-border p-4 flex items-center justify-between bg-card shadow-elegant">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="relative">
                    {member.avatar ? (
                      <Avatar className="h-10 w-10 border-2 border-background shadow-elegant hover:scale-110 transition-transform duration-300">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded-full border-2 border-background flex items-center justify-center text-xs font-medium shadow-elegant hover:scale-110 transition-transform duration-300">
                        {member.name}
                      </div>
                    )}
                    {index < 4 && member.online && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-status-online rounded-full border-2 border-background animate-bounce-gentle"></div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">Ntkio Team</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-2 w-2 bg-status-online rounded-full animate-bounce-gentle"></span>
                  +6 Online
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice Call</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                  <Video className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Video Call</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Options</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background to-muted/20">
          {mockMessages.map((msg, index) => (
            <div key={msg.id} className={`flex gap-4 animate-fade-in ${msg.isOwn ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: `${index * 0.1}s` }}>
              {!msg.isOwn && (
                <Avatar className="h-10 w-10 mt-1 shadow-elegant hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-first' : ''} group`}>
                {!msg.isOwn && (
                  <p className="text-sm font-semibold text-foreground mb-2">{msg.sender}</p>
                )}
                
                {msg.replyTo && (
                  <div className="mb-2 p-2 bg-muted/50 rounded-lg border-l-2 border-primary text-sm text-muted-foreground">
                    <Reply className="h-3 w-3 inline mr-1" />
                    Replying to message...
                  </div>
                )}
                
                <div
                  className={`px-6 py-3 rounded-2xl shadow-elegant transition-all duration-300 hover:shadow-glow ${
                    msg.isOwn
                      ? 'gradient-primary text-primary-foreground'
                      : 'bg-card text-card-foreground border border-border'
                  } ${msg.sender === 'Monika' ? 'italic text-muted-foreground animate-pulse' : ''}`}
                >
                  {msg.content}
                </div>
                
                {/* Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {msg.reactions.map((reaction, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:scale-110 transition-transform duration-300 shadow-elegant"
                        onClick={() => handleReaction(msg.id, reaction.emoji)}
                      >
                        {reaction.emoji} {reaction.count}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Quick Reactions (show on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1 mt-2">
                  {quickReactions.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:scale-125 transition-transform duration-300"
                      onClick={() => handleReaction(msg.id, emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:scale-125 transition-transform duration-300"
                    onClick={() => setReplyingTo(msg.id)}
                  >
                    <Reply className="h-3 w-3" />
                  </Button>
                </div>
                
                {msg.timestamp && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                    {msg.timestamp}
                    {msg.isOwn && <span className="text-primary">{getMessageStatus(msg.status)}</span>}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply Banner */}
        {replyingTo && (
          <div className="border-t border-border p-3 bg-muted/50 flex items-center justify-between animate-slide-up">
            <div className="flex items-center gap-2">
              <Reply className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Replying to message</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(null)}
              className="hover:scale-110 transition-transform duration-300"
            >
              ✕
            </Button>
          </div>
        )}

        {/* Message Input */}
        <div className="border-t border-border p-4 bg-card shadow-elegant">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach File</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                  <Image className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Image</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12 rounded-full border-2 focus:border-primary transition-all duration-300 shadow-elegant"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isRecording ? "destructive" : "ghost"} 
                  size="icon" 
                  className="hover:scale-110 transition-transform duration-300"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className={`h-5 w-5 ${isRecording ? 'animate-bounce-gentle' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRecording ? 'Stop Recording' : 'Voice Message'}</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  className="gradient-primary hover:scale-110 transition-transform duration-300 shadow-glow"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};