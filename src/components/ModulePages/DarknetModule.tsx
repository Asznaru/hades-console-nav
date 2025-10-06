import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

const DarknetModule: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = [
    { cmd: 'decrypt <text>', desc: 'Decrypt encrypted message' },
    { cmd: 'encrypt <text>', desc: 'Encrypt plain text message' },
    { cmd: 'clear', desc: 'Clear output window' },
    { cmd: 'help', desc: 'Show available commands' },
  ];

  const caesarCipher = (text: string, shift: number): string => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    setCommandHistory(prev => [...prev, `> ${trimmed}`]);

    if (trimmed === 'clear') {
      setOutput('');
      setCommandHistory([]);
      return;
    }

    if (trimmed === 'help') {
      const helpText = commands.map(c => `${c.cmd.padEnd(25)} - ${c.desc}`).join('\n');
      setOutput(prev => prev + `\n[HELP]\n${helpText}\n`);
      return;
    }

    if (trimmed.startsWith('decrypt ')) {
      const text = trimmed.substring(8);
      const decrypted = caesarCipher(text, -13);
      setOutput(prev => prev + `\n[DECRYPTED]\n${decrypted}\n`);
      return;
    }

    if (trimmed.startsWith('encrypt ')) {
      const text = trimmed.substring(8);
      const encrypted = caesarCipher(text, 13);
      setOutput(prev => prev + `\n[ENCRYPTED]\n${encrypted}\n`);
      return;
    }

    setOutput(prev => prev + `\n[ERROR] Unknown command: ${trimmed}\nType 'help' for available commands.\n`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [DARKNET] - Message Decryption System
        </h2>

        {/* Command Legend */}
        <div className="mb-4 p-4 border border-border rounded bg-background/50">
          <h3 className="text-sm font-semibold mb-2 text-primary">Available Commands:</h3>
          <div className="space-y-1 text-xs font-mono">
            {commands.map((cmd, idx) => (
              <div key={idx} className="flex">
                <span className="text-accent min-w-[200px]">{cmd.cmd}</span>
                <span className="text-muted-foreground">- {cmd.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Output Window */}
        <div className="flex-1 mb-4 p-4 border border-border rounded bg-background/50 font-mono text-sm overflow-y-auto min-h-[300px] max-h-[400px]">
          {output || (
            <span className="text-muted-foreground">
              System ready. Type 'help' for available commands.
            </span>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
            className="font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
};

export default DarknetModule;
