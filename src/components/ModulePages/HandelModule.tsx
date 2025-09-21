import React from 'react';

const HandelModule: React.FC = () => {
  const tradeItems = [
    { id: 1, item: 'Data Encryption Keys', price: '2,500 CR', status: 'AVAILABLE', quality: 'PREMIUM' },
    { id: 2, item: 'Network Access Tokens', price: '1,200 CR', status: 'LIMITED', quality: 'STANDARD' },
    { id: 3, item: 'System Backdoors', price: '5,000 CR', status: 'RESTRICTED', quality: 'ELITE' },
    { id: 4, item: 'Authentication Bypasses', price: '3,200 CR', status: 'AVAILABLE', quality: 'PREMIUM' },
    { id: 5, item: 'Log Sanitizers', price: '800 CR', status: 'AVAILABLE', quality: 'BASIC' },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [HANDEL MODULE] - Underground Market
        </h2>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Current Balance: 15,720 CR | Market Status: ACTIVE
        </div>
        
        <div className="space-y-3">
          {tradeItems.map((item) => (
            <div key={item.id} className="terminal-border p-3 hover:terminal-focused transition-all">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-foreground font-medium">
                    {item.item}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Quality: {item.quality}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-accent font-bold">
                    {item.price}
                  </div>
                  <div className={`text-xs ${
                    item.status === 'AVAILABLE' ? 'text-primary' :
                    item.status === 'LIMITED' ? 'text-accent' : 'text-destructive'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          WARNING: All transactions are encrypted and logged for security
        </div>
      </div>
    </div>
  );
};

export default HandelModule;