import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

const SOSModule: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '> INITIALIZING BREACH PROTOCOL...',
    '> SYSTEM: HADES TERMINAL v2.7.3',
    '> STATUS: AWAITING COMMAND SEQUENCE',
  ]);
  const [hackProgress, setHackProgress] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01$#%&*@!<>[]{}()/\\|~^+-=?:;.,ABCDEFabcdef';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops with random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly after it crosses the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    const animationInterval = setInterval(draw, 50);
    
    return () => {
      clearInterval(animationInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const simulateHack = () => {
    setIsHacking(true);
    setHackProgress(0);
    addLog('> INITIATING BREACH SEQUENCE...');
    addLog('> SCANNING FOR VULNERABILITIES...');

    const steps = [
      { progress: 15, message: '> BYPASS: Firewall Layer 1... SUCCESS' },
      { progress: 30, message: '> EXPLOIT: Buffer overflow detected... EXPLOITING' },
      { progress: 45, message: '> DECRYPT: SSH keys... DECRYPTED' },
      { progress: 60, message: '> INJECT: Payload delivery... INJECTED' },
      { progress: 75, message: '> ESCALATE: Privilege escalation... ROOT ACCESS' },
      { progress: 90, message: '> OVERRIDE: System controls... OVERRIDDEN' },
      { progress: 100, message: '> BREACH COMPLETE: Full system access granted' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setHackProgress(steps[currentStep].progress);
        addLog(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsHacking(false);
        addLog('> STATUS: HADES TERMINAL COMPROMISED');
        addLog('> [WARNING] Full administrative access obtained');
      }
    }, 800);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLog(`> ${cmd}`);

    switch (trimmed) {
      case 'hack':
      case 'breach':
      case 'override':
        if (!isHacking) {
          simulateHack();
        } else {
          addLog('> ERROR: Breach already in progress');
        }
        break;
      case 'status':
        addLog(`> PROGRESS: ${hackProgress}%`);
        addLog(`> SYSTEM: ${hackProgress === 100 ? 'COMPROMISED' : 'SECURED'}`);
        break;
      case 'clear':
        setLogs([]);
        setHackProgress(0);
        break;
      case 'help':
        addLog('> AVAILABLE COMMANDS:');
        addLog('  hack/breach/override - Initiate system breach');
        addLog('  status - Check breach progress');
        addLog('  clear - Clear terminal');
        addLog('  help - Show this message');
        break;
      default:
        addLog('> ERROR: Unknown command. Type "help" for available commands');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />

      <div className="flex-1 flex flex-col p-6 relative z-10">
        <div className="max-w-4xl w-full mx-auto flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl terminal-glow text-accent animate-pulse">
              [S.O.S] - System Override Sequence
            </h2>
            <div className="text-xs font-mono text-primary">
              ACCESS LEVEL: {hackProgress === 100 ? 'ROOT' : 'RESTRICTED'}
            </div>
          </div>

          {/* Breach Progress */}
          <div className="mb-4 p-4 border border-primary/50 rounded bg-background/80 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-primary">BREACH PROGRESS</span>
              <span className="text-xs font-mono text-accent">{hackProgress}%</span>
            </div>
            <div className="w-full h-2 bg-background border border-border rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500"
                style={{ 
                  width: `${hackProgress}%`,
                  boxShadow: hackProgress > 0 ? '0 0 10px hsl(var(--primary))' : 'none'
                }}
              />
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 mb-4 p-4 border border-border rounded bg-background/80 backdrop-blur font-mono text-xs overflow-y-auto min-h-[300px] max-h-[400px] terminal-glow">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`mb-1 ${
                  log.includes('SUCCESS') || log.includes('COMPLETE')
                    ? 'text-accent'
                    : log.includes('ERROR') || log.includes('WARNING')
                    ? 'text-destructive'
                    : 'text-foreground'
                }`}
              >
                {log}
              </div>
            ))}
            {isHacking && (
              <div className="text-primary animate-pulse">
                {'> '}{'█'.repeat(Math.floor(Math.random() * 20))}
              </div>
            )}
          </div>

          {/* Command Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono text-sm">
                root@hades:~#
              </span>
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="enter command..."
                className="font-mono pl-32 bg-background/80 backdrop-blur border-primary/50"
                disabled={isHacking}
              />
            </div>
            <button
              type="submit"
              disabled={isHacking}
              className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm terminal-glow"
            >
              {isHacking ? 'EXECUTING...' : 'EXECUTE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SOSModule;
