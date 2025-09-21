import React from 'react';

const NewsModule: React.FC = () => {
  const newsItems = [
    { id: 1, timestamp: '2024-01-15 14:32:18', title: 'SYSTEM MAINTENANCE SCHEDULED', priority: 'HIGH' },
    { id: 2, timestamp: '2024-01-15 12:15:42', title: 'New security protocols activated', priority: 'MEDIUM' },
    { id: 3, timestamp: '2024-01-15 09:23:11', title: 'Database optimization complete', priority: 'LOW' },
    { id: 4, timestamp: '2024-01-14 18:45:33', title: 'Network traffic spike detected', priority: 'HIGH' },
    { id: 5, timestamp: '2024-01-14 16:12:07', title: 'Backup systems verified', priority: 'MEDIUM' },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [NEWS MODULE] - System Announcements
        </h2>
        
        <div className="space-y-3">
          {newsItems.map((item) => (
            <div key={item.id} className="terminal-border p-3 hover:terminal-focused transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.timestamp}
                  </div>
                  <div className="text-foreground">
                    {item.title}
                  </div>
                </div>
                <span className={`ml-4 px-2 py-1 text-xs terminal-border ${
                  item.priority === 'HIGH' ? 'text-destructive' : 
                  item.priority === 'MEDIUM' ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          Total entries: {newsItems.length} | Last update: 2024-01-15 14:32:18
        </div>
      </div>
    </div>
  );
};

export default NewsModule;