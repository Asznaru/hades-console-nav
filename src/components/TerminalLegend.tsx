import React from 'react';

const TerminalLegend: React.FC = () => {
  const controls = [
    { key: '↑↓', action: 'Navigate Menu' },
    { key: 'ENTER', action: 'Select/Confirm' },
    { key: 'BACKSPACE', action: 'Go Back' },
    { key: 'ESC', action: 'Return to Main' },
  ];

  return (
    <footer className="status-bar p-3">
      <div className="flex flex-wrap gap-6 justify-center text-sm">
        {controls.map((control, index) => (
          <div key={index} className="legend-item">
            <span className="text-accent font-bold">[{control.key}]</span>
            <span className="ml-2">{control.action}</span>
          </div>
        ))}
        <div className="legend-item ml-auto">
          <span className="text-accent">HADES v2.1.0</span>
          <span className="terminal-cursor ml-1">█</span>
        </div>
      </div>
    </footer>
  );
};

export default TerminalLegend;