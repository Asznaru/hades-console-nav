import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface LoginInterfaceProps {
  onLogin: (nick: string) => void;
}

const LoginInterface: React.FC<LoginInterfaceProps> = ({ onLogin }) => {
  const [nick, setNick] = useState('');

  const hadesAscii = `
██   ██  █████  ██████  ███████ ███████ 
██   ██ ██   ██ ██   ██ ██      ██      
███████ ███████ ██   ██ █████   ███████ 
██   ██ ██   ██ ██   ██ ██           ██ 
██   ██ ██   ██ ██████  ███████ ███████ 
                                        
 ████████ ███████ ██████  ███    ███ ██ ███    ██  █████  ██      
    ██    ██      ██   ██ ████  ████ ██ ████   ██ ██   ██ ██      
    ██    █████   ██████  ██ ████ ██ ██ ██ ██  ██ ███████ ██      
    ██    ██      ██   ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██      
    ██    ███████ ██   ██ ██      ██ ██ ██   ████ ██   ██ ███████ 
  `;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (nick.trim()) {
          onLogin(nick.trim());
        }
        break;
    }
  };

  const handleSubmit = () => {
    if (nick.trim()) {
      onLogin(nick.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="ascii-art terminal-glow text-accent">
            {hadesAscii}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            [SYSTEM ACCESS CONTROL] - Authentication Required
          </div>
        </div>

        <div className="space-y-6 terminal-border p-6" onKeyDown={handleKeyPress}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-accent">
                {'> '}[NICKNAME]
              </label>
              <Input
                type="text"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                className="bg-background border-border text-foreground terminal-focused"
                placeholder="Enter your nickname..."
                autoFocus
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={!nick.trim()}
              className={`w-full py-2 px-4 terminal-border transition-all ${
                nick.trim() 
                  ? 'terminal-focused cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {nick.trim() ? '> ' : '  '}[CONNECT TO SYSTEM]
            </button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>ENTER to connect</div>
            <div>Status: {nick.trim() ? 'READY' : 'WAITING FOR INPUT'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInterface;