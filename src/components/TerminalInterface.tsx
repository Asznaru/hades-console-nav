import React, { useState, useEffect, useCallback } from 'react';
import TerminalHeader from './TerminalHeader';
import NavigationMenu, { MenuItem } from './NavigationMenu';
import TerminalLegend from './TerminalLegend';
import NewsModule from './ModulePages/NewsModule';
import HandelModule from './ModulePages/HandelModule';
import ChatsModule from './ModulePages/ChatsModule';
import EchoModule from './ModulePages/EchoModule';
import SyslogModule from './ModulePages/SyslogModule';
import SOSModule from './ModulePages/SOSModule';
import DarknetModule from './ModulePages/DarknetModule';
import ChatRoomModule from './ModulePages/ChatRoomModule';

interface TerminalInterfaceProps {
  userInfo: {
    nick: string;
  };
}

const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ userInfo }) => {
  const [currentView, setCurrentView] = useState<string>('main');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentChatRoom, setCurrentChatRoom] = useState<string>('');

  const menuItems: MenuItem[] = [
    { id: 'news', label: 'News', description: 'System announcements and updates' },
    { id: 'handel', label: 'Handel', description: 'Underground market access' },
    { id: 'chats', label: 'Chats', description: 'Secure communications' },
    { id: 'echo', label: 'Echo', description: 'Network diagnostics and ping' },
    { id: 'syslog', label: 'Syslog', description: 'System logs and monitoring' },
    { id: 'sos', label: 'SOS', description: 'Emergency protocols' },
    { id: 'darknet', label: 'Darknet', description: 'Tor hidden services' },
  ];

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    
    switch (event.key) {
      case 'ArrowUp':
        if (currentView === 'main') {
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : menuItems.length - 1
          );
        }
        break;
        
      case 'ArrowDown':
        if (currentView === 'main') {
          setSelectedIndex(prev => 
            prev < menuItems.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'Enter':
        if (currentView === 'main') {
          setCurrentView(menuItems[selectedIndex].id);
        }
        break;
        
      case 'Backspace':
      case 'Escape':
        if (currentView !== 'main') {
          setCurrentView('main');
        }
        break;
    }
  }, [currentView, selectedIndex, menuItems]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleMenuSelect = (item: MenuItem) => {
    setCurrentView(item.id);
  };

  const handleJoinChatRoom = (roomNumber: string) => {
    setCurrentChatRoom(roomNumber);
    setCurrentView('chatroom');
  };

  const handleLeaveChatRoom = () => {
    setCurrentChatRoom('');
    setCurrentView('chats');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return <NewsModule />;
      case 'handel':
        return <HandelModule />;
      case 'chats':
        return <ChatsModule onJoinRoom={handleJoinChatRoom} />;
      case 'chatroom':
        return <ChatRoomModule 
          roomNumber={currentChatRoom} 
          userNick={userInfo.nick}
          onLeave={handleLeaveChatRoom}
        />;
      case 'echo':
        return <EchoModule />;
      case 'syslog':
        return <SyslogModule />;
      case 'sos':
        return <SOSModule />;
      case 'darknet':
        return <DarknetModule />;
      default:
        return (
          <NavigationMenu
            items={menuItems}
            selectedIndex={selectedIndex}
            onSelect={handleMenuSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TerminalHeader />
      {renderCurrentView()}
      <TerminalLegend />
    </div>
  );
};

export default TerminalInterface;