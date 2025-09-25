import React from 'react';

interface CamsModuleProps {
  onBack?: () => void;
}

const CamsModule: React.FC<CamsModuleProps> = ({ onBack }) => {
  const cameras = [
    { id: 1, name: 'CAM-001', location: 'Entrance Alpha', status: 'LIVE', signal: 'STRONG' },
    { id: 2, name: 'CAM-002', location: 'Perimeter Beta', status: 'LIVE', signal: 'WEAK' },
    { id: 3, name: 'CAM-003', location: 'Storage Gamma', status: 'OFFLINE', signal: 'NONE' },
    { id: 4, name: 'CAM-004', location: 'Exit Delta', status: 'LIVE', signal: 'STRONG' },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl terminal-glow text-accent">
            [SURVEILLANCE] - Camera Network
          </h2>
          <button
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            [ESC] Back to Chats
          </button>
        </div>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Network Status: ACTIVE | Encryption: AES-256 | Active Feeds: {cameras.filter(c => c.status === 'LIVE').length}/4
        </div>
        
        <div className="grid grid-cols-2 gap-4 h-4/5">
          {cameras.map((camera) => (
            <div key={camera.id} className="terminal-border p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-accent font-medium">{camera.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    camera.status === 'LIVE' ? 'bg-primary animate-pulse' : 'bg-rose-500'
                  }`}></span>
                  <span className={`text-xs ${
                    camera.status === 'LIVE' ? 'text-primary' : 'text-rose-500'
                  }`}>
                    {camera.status}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 bg-background/30 border border-muted-foreground/20 relative overflow-hidden">
                {camera.status === 'LIVE' ? (
                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Simulated video feed */}
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/10 to-muted/30"></div>
                    <div className="text-center z-10">
                      <div className="w-16 h-16 mx-auto mb-2 border-2 border-primary/50 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Live Feed Active
                      </div>
                    </div>
                    {/* Scan lines effect */}
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-px bg-primary/30 mb-2"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-rose-500 text-2xl mb-2">⚠</div>
                      <div className="text-xs text-rose-500">OFFLINE</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-2 space-y-1">
                <div className="text-xs text-muted-foreground">
                  Location: {camera.location}
                </div>
                <div className="text-xs flex justify-between">
                  <span className="text-muted-foreground">Signal:</span>
                  <span className={`${
                    camera.signal === 'STRONG' ? 'text-primary' :
                    camera.signal === 'WEAK' ? 'text-accent' : 'text-rose-500'
                  }`}>
                    {camera.signal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          [Click camera to zoom] [ESC to return] [R to refresh feeds]
        </div>
      </div>
    </div>
  );
};

export default CamsModule;