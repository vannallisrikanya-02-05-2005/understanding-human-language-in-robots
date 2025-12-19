
import React, { useState } from 'react';
import { Terminal, Send, Cpu, Loader2 } from 'lucide-react';

interface CommandConsoleProps {
  onSendCommand: (command: string) => void;
  isLoading: boolean;
}

const CommandConsole: React.FC<CommandConsoleProps> = ({ onSendCommand, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendCommand(input.trim());
      setInput('');
    }
  };

  const suggestions = [
    "Robot, please fetch the heavy wrench from the lower drawer.",
    "Go to the kitchen and check if the stove is off.",
    "Carefully pick up the glass bottle and put it in the bin.",
    "Scan the perimeter and report any anomalies immediately."
  ];

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-2 mb-6 text-blue-400">
        <Terminal size={20} />
        <h2 className="font-display font-semibold text-lg tracking-tight uppercase">Neural Interface</h2>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a natural language command for the robot..."
          className="w-full h-32 bg-black border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-mono text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`absolute bottom-4 right-4 p-3 rounded-lg transition-all ${
            isLoading 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
          }`}
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Suggested Protocols</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              className="text-xs bg-white/5 border border-white/5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all text-gray-400"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandConsole;
