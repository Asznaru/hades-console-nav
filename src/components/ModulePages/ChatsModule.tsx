import React from 'react';

const ChatsModule: React.FC = () => {
  const activeChats = [
    { id: 1, user: 'Shadow_Walker', lastMsg: 'Package delivered successfully', time: '14:32', status: 'online' },
    { id: 2, user: 'CyberPhoenix', lastMsg: 'New contract available', time: '14:15', status: 'away' },
    { id: 3, user: 'GhostProtocol', lastMsg: 'System breach detected in sector 7', time: '13:45', status: 'online' },
    { id: 4, user: 'DataMiner_X', lastMsg: 'Payment confirmed', time: '12:30', status: 'offline' },
    { id: 5, user: 'NeonViper', lastMsg: 'Meet at the usual coordinates', time: '11:22', status: 'online' },
  ];

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
        
        <div className="mt-6 terminal-border p-2">
          <div className="text-sm text-muted-foreground">
            {'>'} Type message... <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsModule;