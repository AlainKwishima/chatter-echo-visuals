import { useState } from 'react';
import { NavigationSidebar } from './chat/NavigationSidebar';
import { ChatArea } from './chat/ChatArea';
import { ContactsSidebar } from './chat/ContactsSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const ChatApplication = () => {
  const [activeChat, setActiveChat] = useState('ntkio-team');
  const [showContactsList, setShowContactsList] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobile) {
      setShowContactsList(false);
    }
  };

  const handleBackToContacts = () => {
    setShowContactsList(true);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Navigation Sidebar */}
      <div className={`
        fixed md:relative z-50 h-full transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <NavigationSidebar onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex min-w-0 max-w-full overflow-hidden">
        {/* Mobile header with hamburger menu */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex-shrink-0 flex items-center justify-between p-4 border-b border-sidebar-border bg-card shadow-elegant">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Chat App</h1>
          <div className="w-10" />
        </div>

        {/* Chat Content - responsive layout */}
        <div className="flex flex-1 pt-16 md:pt-0 min-h-0 overflow-hidden">
          {/* Contacts Sidebar - show/hide based on screen size and selection */}
          <div className={`
            ${isMobile 
              ? showContactsList 
                ? 'w-full' 
                : 'hidden'
              : 'w-96 flex-shrink-0'
            } transition-all duration-300 overflow-hidden
          `}>
            <ContactsSidebar 
              activeChat={activeChat} 
              onChatSelect={handleChatSelect}
            />
          </div>

          {/* Chat Area - show/hide based on screen size and selection */}
          <div className={`
            ${isMobile 
              ? showContactsList 
                ? 'hidden' 
                : 'w-full'
              : 'flex-1 min-w-0'
            } transition-all duration-300 relative overflow-hidden
          `}>
            {/* Back button for mobile */}
            {isMobile && !showContactsList && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToContacts}
                className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm hover:bg-card shadow-elegant"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <ChatArea activeChat={activeChat} />
          </div>
        </div>
      </div>
    </div>
  );
};