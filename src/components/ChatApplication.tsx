import { useState } from 'react';
import { NavigationSidebar } from './chat/NavigationSidebar';
import { ChatArea } from './chat/ChatArea';
import { ContactsSidebar } from './chat/ContactsSidebar';

export const ChatApplication = () => {
  const [activeChat, setActiveChat] = useState('ntkio-team');

  return (
    <div className="flex h-screen bg-background">
      <NavigationSidebar />
      <ChatArea activeChat={activeChat} />
      <ContactsSidebar activeChat={activeChat} onChatSelect={setActiveChat} />
    </div>
  );
};