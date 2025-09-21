import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface LoginInterfaceProps {
  onLogin: (nick: string, address: string) => void;
}

const LoginInterface: React.FC<LoginInterfaceProps> = ({ onLogin }) => {
  const [nick, setNick] = useState('');
  const [address, setAddress] = useState('');
  const [selectedField, setSelectedField] = useState<'nick' | 'address'>('nick');

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
      case 'ArrowUp':
        event.preventDefault();
        setSelectedField('nick');
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedField('address');
        break;
      case 'Enter':
        event.preventDefault();
        if (nick.trim() && address.trim()) {
          onLogin(nick.trim(), address.trim());
        }
        break;
    }
  };

  const handleSubmit = () => {
    if (nick.trim() && address.trim()) {
      onLogin(nick.trim(), address.trim());
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
              <label className={`block text-sm mb-2 ${selectedField === 'nick' ? 'text-accent' : 'text-muted-foreground'}`}>
                {selectedField === 'nick' ? '> ' : '  '}[NICKNAME]
              </label>
              <Input
                type="text"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                className={`bg-background border-border text-foreground ${selectedField === 'nick' ? 'terminal-focused' : ''}`}
                placeholder="Enter your nickname..."
                onFocus={() => setSelectedField('nick')}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${selectedField === 'address' ? 'text-accent' : 'text-muted-foreground'}`}>
                {selectedField === 'address' ? '> ' : '  '}[ADDRESS]
              </label>
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`bg-background border-border text-foreground ${selectedField === 'address' ? 'terminal-focused' : ''}`}
                placeholder="Enter your address..."
                onFocus={() => setSelectedField('address')}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={!nick.trim() || !address.trim()}
              className={`w-full py-2 px-4 terminal-border transition-all ${
                nick.trim() && address.trim() 
                  ? 'terminal-focused cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {nick.trim() && address.trim() ? '> ' : '  '}[CONNECT TO SYSTEM]
            </button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>Use ↑↓ arrows to navigate fields</div>
            <div>ENTER to connect (requires both fields)</div>
            <div>Status: {nick.trim() && address.trim() ? 'READY' : 'WAITING FOR INPUT'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInterface;