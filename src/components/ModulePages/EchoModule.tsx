import React from 'react';

const EchoModule: React.FC = () => {
  const echoCommands = [
    '> ping hades.network',
    'PING hades.network (192.168.1.1): 56 data bytes',
    '64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.123ms',
    '64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.098ms',
    '64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.115ms',
    '',
    '> traceroute darknet.onion',
    'traceroute to darknet.onion (10.0.0.1), 30 hops max, 60 byte packets',
    ' 1  gateway (192.168.1.1)  0.123 ms  0.098 ms  0.115 ms',
    ' 2  proxy.node (10.0.0.254)  12.456 ms  11.234 ms  13.789 ms',
    ' 3  darknet.onion (10.0.0.1)  45.123 ms  43.987 ms  46.234 ms',
    '',
    '> system status',
    'System uptime: 72:14:33',
    'CPU usage: 23.4%',
    'Memory usage: 67.8%',
    'Network status: SECURE',
    'Firewall: ACTIVE',
  ];

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [ECHO MODULE] - Network Diagnostics
        </h2>
        
        <div className="mb-4 text-sm text-muted-foreground">
          Network Interface: eth0 | Status: CONNECTED | Bandwidth: 1Gbps
        </div>
        
        <div className="bg-background p-4 terminal-border font-mono text-sm max-h-96 overflow-y-auto">
          {echoCommands.map((line, index) => (
            <div key={index} className={`${
              line.startsWith('>') ? 'text-accent' : 'text-primary'
            } ${line === '' ? 'h-4' : ''}`}>
              {line || '\u00A0'}
            </div>
          ))}
          <div className="text-accent">
            {'>'} <span className="terminal-cursor">█</span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          Available commands: ping, traceroute, nslookup, netstat, iptables
        </div>
      </div>
    </div>
  );
};

export default EchoModule;