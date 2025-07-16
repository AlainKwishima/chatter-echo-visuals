import { useState } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  type?: 'text' | 'image';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Anna',
    content: 'We need to finalize the typography options for our website',
    timestamp: '11:45',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    sender: 'Daniel Garcia',
    content: 'Check out pls this initial sketch for our new project? 🤔',
    timestamp: '12:04',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    sender: 'Jordan Betard',
    content: 'Hi team 👋 Let\'s hop on call to discuss the new project.',
    timestamp: '12:11',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '4',
    sender: 'You',
    content: 'Good Concepts!',
    timestamp: '12:15',
    isOwn: true,
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
  { name: 'Daniel', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { name: 'Nikto', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
  { name: 'Anna', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face' },
  { name: 'Nelly', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
  { name: '+15', avatar: null }
];

export const ChatArea = ({ activeChat }: ChatAreaProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative">
                  {member.avatar ? (
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 bg-muted rounded-full border-2 border-background flex items-center justify-center text-xs font-medium">
                      {member.name}
                    </div>
                  )}
                  {index < 4 && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-status-online rounded-full border-2 border-background"></div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Ntkio Team</h2>
              <p className="text-sm text-muted-foreground">+6 Online</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            {!msg.isOwn && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-first' : ''}`}>
              {!msg.isOwn && (
                <p className="text-sm font-medium text-foreground mb-1">{msg.sender}</p>
              )}
              <div
                className={`px-4 py-2 rounded-2xl ${
                  msg.isOwn
                    ? 'bg-chat-bubble-user text-chat-bubble-user-foreground'
                    : 'bg-chat-bubble-other text-chat-bubble-other-foreground'
                } ${msg.sender === 'Monika' ? 'italic text-muted-foreground' : ''}`}
              >
                {msg.content}
              </div>
              {msg.timestamp && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  {msg.timestamp}
                  {msg.isOwn && <span className="text-primary">✓</span>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};