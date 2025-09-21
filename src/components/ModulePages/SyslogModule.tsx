import React from 'react';

const SyslogModule: React.FC = () => {
  const logEntries = [
    { time: '14:32:18', level: 'INFO', process: 'auth', message: 'User authentication successful: shadow_walker' },
    { time: '14:31:45', level: 'WARN', process: 'firewall', message: 'Suspicious connection attempt from 203.45.67.89' },
    { time: '14:30:12', level: 'ERROR', process: 'database', message: 'Connection timeout to backup server db02' },
    { time: '14:29:33', level: 'INFO', process: 'network', message: 'Packet encryption enabled for session 0x4A3B' },
    { time: '14:28:57', level: 'DEBUG', process: 'kernel', message: 'Memory allocation: 2048KB allocated to process hades_core' },
    { time: '14:27:21', level: 'WARN', process: 'security', message: 'Failed login attempt detected from unknown host' },
    { time: '14:26:44', level: 'INFO', process: 'system', message: 'Backup process completed successfully' },
    { time: '14:25:19', level: 'ERROR', process: 'network', message: 'DNS resolution failed for external.darknet.onion' },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-destructive';
      case 'WARN': return 'text-accent';
      case 'INFO': return 'text-primary';
      case 'DEBUG': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [SYSLOG MODULE] - System Logs
        </h2>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Log Level: ALL | Filter: NONE | Auto-refresh: ON | Total entries: 1,247
        </div>
        
        <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-sm">
          {logEntries.map((entry, index) => (
            <div key={index} className="terminal-border p-2 hover:bg-accent hover:bg-opacity-10">
              <div className="flex gap-4">
                <span className="text-muted-foreground w-20">{entry.time}</span>
                <span className={`w-12 ${getLevelColor(entry.level)}`}>{entry.level}</span>
                <span className="text-accent w-16">{entry.process}</span>
                <span className="text-foreground flex-1">{entry.message}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Last update: 14:32:18</span>
          <span>Showing latest 50 entries</span>
        </div>
      </div>
    </div>
  );
};

export default SyslogModule;