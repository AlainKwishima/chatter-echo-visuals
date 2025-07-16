import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationSidebar } from './chat/NavigationSidebar';
import { ContactsSidebar } from './chat/ContactsSidebar';
import { ChatArea } from './chat/ChatArea';
import Groups from '../pages/Groups';
import Favourites from '../pages/Favourites';
import Calls from '../pages/Calls';
import Files from '../pages/Files';
import Settings from '../pages/Settings';
import VideoCall from '../pages/VideoCall';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export const ChatApplication = () => {
  const location = useLocation();
  const [activeChat, setActiveChat] = useState('Ntkio Team');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderMainContent = () => {
    switch (location.pathname) {
      case '/groups':
        return <Groups />;
      case '/favourites':
        return <Favourites />;
      case '/calls':
        return <Calls />;
      case '/files':
        return <Files />;
      case '/settings':
        return <Settings />;
      case '/video-call':
        return <VideoCall />;
      default:
        return (
          <div className="flex flex-1 min-h-0">
            <ChatArea activeChat={activeChat} />
            <div className="hidden xl:block">
              <ContactsSidebar activeChat={activeChat} onChatSelect={setActiveChat} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-sidebar-background/90 backdrop-blur-sm border-sidebar-border shadow-elegant"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation Sidebar - Always visible on desktop, toggle on mobile */}
      <div className={`
        fixed lg:relative z-40 lg:z-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        h-full
      `}>
        <NavigationSidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col lg:flex-row">
        {renderMainContent()}
      </div>
    </div>
  );
};