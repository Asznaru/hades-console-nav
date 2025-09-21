import React from 'react';

const SOSModule: React.FC = () => {
  const emergencyContacts = [
    { id: 1, name: 'Emergency Response Team', freq: '156.800 MHz', status: 'ACTIVE', priority: 'CRITICAL' },
    { id: 2, name: 'Security Backup Unit', freq: '162.425 MHz', status: 'STANDBY', priority: 'HIGH' },
    { id: 3, name: 'Medical Support', freq: '155.340 MHz', status: 'ACTIVE', priority: 'HIGH' },
    { id: 4, name: 'Technical Support', freq: '151.820 MHz', status: 'AVAILABLE', priority: 'MEDIUM' },
    { id: 5, name: 'Evacuation Coordinator', freq: '158.730 MHz', status: 'STANDBY', priority: 'CRITICAL' },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl mb-2 terminal-glow text-destructive animate-pulse">
            [SOS MODULE] - EMERGENCY PROTOCOLS
          </h2>
          <div className="text-accent terminal-glow">
            ⚠️ EMERGENCY COMMUNICATION SYSTEM ⚠️
          </div>
        </div>
        
        <div className="mb-6 text-center">
          <div className="inline-block terminal-border p-4 bg-destructive bg-opacity-20">
            <div className="text-xl text-destructive font-bold">
              EMERGENCY BEACON STATUS: READY
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              GPS Coordinates: 40.7128° N, 74.0060° W
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="terminal-border p-3 hover:terminal-focused transition-all">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-foreground font-medium">
                    {contact.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Frequency: {contact.freq}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 terminal-border ${
                    contact.priority === 'CRITICAL' ? 'text-destructive' :
                    contact.priority === 'HIGH' ? 'text-accent' : 'text-primary'
                  }`}>
                    {contact.priority}
                  </div>
                  <div className={`text-xs mt-1 ${
                    contact.status === 'ACTIVE' ? 'text-primary' :
                    contact.status === 'STANDBY' ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    {contact.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <div className="terminal-border p-3 bg-destructive bg-opacity-10">
            <div className="text-destructive font-bold">
              EMERGENCY TRANSMISSION READY
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Press ENTER to initiate emergency broadcast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSModule;