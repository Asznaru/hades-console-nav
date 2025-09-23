import React, { useState } from 'react';

interface ChatsModuleProps {
  onJoinRoom?: (roomNumber: string) => void;
}

const ChatsModule: React.FC<ChatsModuleProps> = ({ onJoinRoom }) => {
  const activeChats = [
    { id: 1, user: 'Shadow_Walker', lastMsg: 'Package delivered successfully', time: '14:32', status: 'blocked' },
    { id: 2, user: 'CyberPhoenix', lastMsg: 'New contract available', time: '14:15', status: 'blocked' },
    { id: 3, user: 'GhostProtocol', lastMsg: 'System breach detected in sector 7', time: '13:45', status: 'blocked' },
    { id: 4, user: 'DataMiner_X', lastMsg: 'Payment confirmed', time: '12:30', status: 'offline' },
    { id: 5, user: 'NeonViper', lastMsg: 'Meet at the usual coordinates', time: '11:22', status: 'blocked' },
    { id: 6, user: 'RedPhantom', lastMsg: 'Access denied by admin', time: '10:15', status: 'blocked' },
  ];

  const [currentMessage, setCurrentMessage] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [CHATS MODULE] - Secure Communications
        </h2>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Encryption: AES-256 | Status: SECURE | Active connections: {activeChats.filter(c => c.status === 'online').length}
        </div>
        
        <div className="space-y-2">
          {activeChats.map((chat) => (
            <div key={chat.id} className="terminal-border p-3 hover:terminal-focused transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      chat.status === 'online' ? 'bg-primary' :
                      chat.status === 'away' ? 'bg-accent' : 
                      chat.status === 'blocked' ? 'bg-rose-500' : 'bg-muted'
                    }`}></span>
                    <span className="text-foreground font-medium">
                      {chat.user}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {chat.lastMsg}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {chat.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="terminal-border p-3">
            <div className="text-sm text-muted-foreground mb-2">
              [CREATE/JOIN ROOM] - Enter room number:
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">{'>'}</span>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Enforce # as first character
                  if (value === '' || value.startsWith('#')) {
                    setRoomNumber(value);
                  } else if (!roomNumber.startsWith('#')) {
                    setRoomNumber('#' + value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && roomNumber.trim() && roomNumber.length > 1) {
                    const cleanRoomNumber = roomNumber.trim();
                    onJoinRoom?.(cleanRoomNumber);
                    setRoomNumber('');
                  }
                }}
                placeholder="#123-123"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              <span className="terminal-cursor">█</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              ENTER to join room | Format: #123-123 | Current: {roomNumber || 'empty'}
            </div>
          </div>
          
          <div className="terminal-border p-2">
            <div className="flex items-center gap-2">
              <span className="text-accent">{'>'}</span>
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Message sent:', currentMessage);
                    setCurrentMessage('');
                  }
                }}
                placeholder="Type message..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              <span className="terminal-cursor">█</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Current message: {currentMessage || 'empty'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsModule;