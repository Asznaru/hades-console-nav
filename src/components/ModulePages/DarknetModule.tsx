import React from 'react';

const DarknetModule: React.FC = () => {
  const hiddenServices = [
    { name: 'SecureVault.onion', status: 'CONNECTED', users: 47, type: 'Storage' },
    { name: 'CryptoMarket.onion', status: 'CONNECTING', users: 128, type: 'Commerce' },
    { name: 'AnonymousChat.onion', status: 'CONNECTED', users: 83, type: 'Communication' },
    { name: 'DataExchange.onion', status: 'OFFLINE', users: 0, type: 'Trading' },
    { name: 'GhostProtocol.onion', status: 'HIDDEN', users: '???', type: 'Classified' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONNECTED': return 'text-primary';
      case 'CONNECTING': return 'text-accent';
      case 'OFFLINE': return 'text-muted-foreground';
      case 'HIDDEN': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [DARKNET MODULE] - Tor Hidden Services
        </h2>
        
        <div className="mb-6 text-center terminal-border p-3 bg-accent bg-opacity-10">
          <div className="text-accent font-bold">
            ⚠️ WARNING: ENTERING DARKNET PROTOCOL ⚠️
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            All connections are encrypted and routed through Tor network
          </div>
        </div>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Tor Status: ACTIVE | Circuit: 3-hop | Exit Node: [ENCRYPTED] | Anonymity: HIGH
        </div>
        
        <div className="space-y-3">
          {hiddenServices.map((service, index) => (
            <div key={index} className="terminal-border p-3 hover:terminal-focused transition-all">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-foreground font-medium">
                    {service.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Type: {service.type}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${getStatusColor(service.status)}`}>
                    {service.status}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Users: {service.users}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-destructive text-center">
          DISCLAIMER: Access to darknet services is logged for security purposes
        </div>
      </div>
    </div>
  );
};

export default DarknetModule;