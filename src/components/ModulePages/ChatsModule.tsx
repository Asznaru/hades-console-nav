import React, { useState } from 'react';

interface ChatsModuleProps {
  onJoinRoom?: (roomNumber: string) => void;
}

const ChatsModule: React.FC<ChatsModuleProps> = ({ onJoinRoom }) => {
  const activeChats = [
    { id: 1, user: 'Shadow_Walker', lastMsg: 'Package delivered successfully', time: '14:32', status: 'online' },
    { id: 2, user: 'CyberPhoenix', lastMsg: 'New contract available', time: '14:15', status: 'away' },
    { id: 3, user: 'GhostProtocol', lastMsg: 'System breach detected in sector 7', time: '13:45', status: 'online' },
    { id: 4, user: 'DataMiner_X', lastMsg: 'Payment confirmed', time: '12:30', status: 'offline' },
    { id: 5, user: 'NeonViper', lastMsg: 'Meet at the usual coordinates', time: '11:22', status: 'online' },
  ];

  const [roomNumber, setRoomNumber] = useState('');
  const [selectedInput, setSelectedInput] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedMessageInput, setSelectedMessageInput] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && roomNumber.trim()) {
      event.preventDefault();
      const cleanRoomNumber = roomNumber.trim();
      if (cleanRoomNumber.startsWith('#')) {
        onJoinRoom?.(cleanRoomNumber);
      } else {
        onJoinRoom?.(`#${cleanRoomNumber}`);
      }
      setRoomNumber(''); // Clear input after joining
    }
  };

  const handleRoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow numbers, hyphens, and hash symbol
    if (/^[#0-9-]*$/.test(value)) {
      setRoomNumber(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomNumber(e.target.value);
  };

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
                      chat.status === 'away' ? 'bg-accent' : 'bg-muted'
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
                onChange={handleRoomInputChange}
                onKeyDown={handleKeyPress}
                onFocus={() => setSelectedInput(true)}
                onBlur={() => setSelectedInput(false)}
                placeholder="#123-123"
                autoFocus
                className={`flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground ${
                  selectedInput ? 'terminal-glow' : ''
                } focus:terminal-glow`}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
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
                onFocus={() => setSelectedMessageInput(true)}
                onBlur={() => setSelectedMessageInput(false)}
                placeholder="Type message..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground focus:terminal-glow"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              />
              {selectedMessageInput && <span className="terminal-cursor">█</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsModule;