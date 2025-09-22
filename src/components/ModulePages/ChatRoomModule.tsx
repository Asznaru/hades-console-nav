import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  type: 'user' | 'system';
}

interface ChatRoomModuleProps {
  roomNumber: string;
  userNick: string;
  onLeave: () => void;
}

const ChatRoomModule: React.FC<ChatRoomModuleProps> = ({ roomNumber, userNick, onLeave }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: 'SYSTEM',
      message: `Welcome to room ${roomNumber}. Secure connection established.`,
      timestamp: new Date().toLocaleTimeString('pl-PL', { hour12: false }),
      type: 'system'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && currentMessage.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        user: userNick,
        message: currentMessage.trim(),
        timestamp: new Date().toLocaleTimeString('pl-PL', { hour12: false }),
        type: 'user'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
      
      // Simulate system responses occasionally
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const systemResponse: ChatMessage = {
            id: messages.length + 2,
            user: 'SYSTEM',
            message: `Message encrypted and transmitted successfully.`,
            timestamp: new Date().toLocaleTimeString('pl-PL', { hour12: false }),
            type: 'system'
          };
          setMessages(prev => [...prev, systemResponse]);
        }, 1000);
      }
    } else if (event.key === 'Escape') {
      onLeave();
    }
  };

  const connectedUsers = [userNick, 'CyberGhost', 'DataNinja', 'ShadowOp'];

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl mb-2 terminal-glow text-accent">
            [CHAT ROOM] - {roomNumber}
          </h2>
          <div className="text-sm text-muted-foreground mb-2">
            Encryption: AES-256 | Status: SECURE | Connected as: {userNick}
          </div>
          <div className="text-xs text-muted-foreground">
            Users online: {connectedUsers.join(', ')} ({connectedUsers.length})
          </div>
        </div>
        
        <div className="flex-1 terminal-border p-3 mb-4 overflow-y-auto max-h-96">
          <div className="space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`text-sm ${
                msg.type === 'system' ? 'text-accent' : 'text-foreground'
              }`}>
                <span className="text-muted-foreground">[{msg.timestamp}]</span>
                <span className={`ml-2 ${
                  msg.type === 'system' ? 'text-accent' : 
                  msg.user === userNick ? 'text-primary' : 'text-secondary'
                }`}>
                  &lt;{msg.user}&gt;
                </span>
                <span className="ml-2">{msg.message}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="terminal-border p-2">
          <div className="flex items-center gap-2">
            <span className="text-accent">&lt;{userNick}&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground terminal-glow"
            />
            <span className="terminal-cursor">█</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ENTER to send | ESC to leave room
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomModule;