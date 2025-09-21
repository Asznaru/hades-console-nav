import React from 'react';

const TerminalHeader: React.FC = () => {
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

  return (
    <header className="text-center py-4 border-b border-border">
      <div className="ascii-art terminal-glow">
        {hadesAscii}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        System Status: ONLINE | Access Level: AUTHORIZED | Connection: SECURE
      </div>
    </header>
  );
};

export default TerminalHeader;