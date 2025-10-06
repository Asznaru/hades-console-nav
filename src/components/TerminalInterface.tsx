import React, { useState, useEffect, useCallback } from 'react';
import TerminalHeader from './TerminalHeader';
import NavigationMenu, { MenuItem } from './NavigationMenu';
import TerminalLegend from './TerminalLegend';
import NewsModule from './ModulePages/NewsModule';
import HandelModule from './ModulePages/HandelModule';
import ChatsModule from './ModulePages/ChatsModule';
import EchoModule from './ModulePages/EchoModule';
import SyslogModule from './ModulePages/SyslogModule';
import ChatRoomModule from './ModulePages/ChatRoomModule';
import CamsModule from './ModulePages/CamsModule';
import DarknetModule from './ModulePages/DarknetModule';
import SOSModule from './ModulePages/SOSModule';

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
    { id: 'cams', label: 'Cams', description: 'Surveillance camera network' },
    { id: 'darknet', label: 'Darknet', description: 'Message decryption system' },
    { id: 'sos', label: 'S.O.S', description: 'System Override Sequence' },
    { id: 'echo', label: 'Echo', description: 'Network diagnostics and ping' },
    { id: 'syslog', label: 'Syslog', description: 'System logs and monitoring' },
  ];

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Only handle navigation keys when in main menu and not typing in inputs
    if (currentView !== 'main' || (event.target as HTMLElement)?.tagName === 'INPUT') {
      return;
    }
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : menuItems.length - 1
        );
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < menuItems.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'Enter':
        event.preventDefault();
        setCurrentView(menuItems[selectedIndex].id);
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
      case 'cams':
        return <CamsModule />;
      case 'darknet':
        return <DarknetModule />;
      case 'sos':
        return <SOSModule />;
      case 'echo':
        return <EchoModule />;
      case 'syslog':
        return <SyslogModule />;
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