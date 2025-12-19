
import React, { useState, useCallback, useEffect } from 'react';
import { Cpu, Bot, BookOpen, Layers, MessageSquare, Shield, Globe, Terminal } from 'lucide-react';
import CommandConsole from './components/CommandConsole';
import LinguisticVisualizer from './components/LinguisticVisualizer';
import RobotReasoning from './components/RobotReasoning';
import { GeminiService } from './services/geminiService';
import { AnalysisResult, HistoryItem } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [thinking, setThinking] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [service] = useState(() => new GeminiService());

  const handleSendCommand = useCallback(async (command: string) => {
    setLoading(true);
    try {
      const result = await service.analyzeCommand(command);
      setCurrentAnalysis(result.analysis);
      setThinking(result.thinking);
      
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        command,
        analysis: result.analysis,
        thinking: result.thinking
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  }, [service]);

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-500/30">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight">RoboTalk</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Linguistic Intel Lab</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#sandbox" className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">SANDBOX</a>
            <a href="#theory" className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">LEARNING</a>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase">System Online</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* Hero Section */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-tight">
            Bridging the gap between human language and robotic logic.
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Interact with advanced neural semantic parsing. Witness how natural language is grounded into discrete entities and operational action plans for autonomous systems.
          </p>
        </section>

        {/* Interactive Lab */}
        <section id="sandbox" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4 space-y-8">
            <CommandConsole onSendCommand={handleSendCommand} isLoading={loading} />
            <RobotReasoning data={currentAnalysis} thinking={thinking} />
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex-1 min-h-[500px]">
              <LinguisticVisualizer data={currentAnalysis} />
            </div>
            
            {/* History Feed */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <h3 className="font-display font-semibold text-gray-300 mb-6 flex items-center gap-2">
                <Terminal size={18} className="text-blue-500" />
                History Buffer
              </h3>
              <div className="space-y-3">
                {history.length === 0 && (
                  <div className="text-center py-10 text-gray-600 border border-dashed border-white/5 rounded-xl">
                    <p className="text-sm">No commands recorded in session memory.</p>
                  </div>
                )}
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
                    onClick={() => setCurrentAnalysis(item.analysis)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 text-xs font-mono">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <span className="text-sm text-gray-400 truncate max-w-md group-hover:text-gray-200 transition-colors">{item.command}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded border border-blue-500/20">{item.analysis.intent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="theory" className="pt-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">The Science of Robotic NLP</h2>
            <p className="text-gray-500">Key pillars of how robots understand human speech</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              icon={<Globe className="text-blue-400" />} 
              title="Grounding" 
              desc="The process of mapping abstract words like 'red bottle' to specific sensors data or object IDs in a 3D environment."
            />
            <Card 
              icon={<Shield className="text-purple-400" />} 
              title="Pragmatics" 
              desc="Understanding the implied meaning or social context. Distinguishing between 'Move fast' and 'Move urgently'."
            />
            <Card 
              icon={<MessageSquare className="text-emerald-400" />} 
              title="Semantics" 
              desc="The literal meaning of phrases and how individual components like verbs and nouns combine into logic."
            />
            <Card 
              icon={<Layers className="text-orange-400" />} 
              title="Ambiguity" 
              desc="Resolving uncertain commands by calculating probabilities of intent based on environmental constraints."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-40 py-10 border-t border-white/5 text-center text-gray-600 text-xs uppercase tracking-[0.2em] font-bold">
        RoboTalk Linguistic Lab &copy; {new Date().getFullYear()} — Powered by Gemini AI
      </footer>
    </div>
  );
};

const Card: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
    <div className="mb-4 transform group-hover:-translate-y-1 transition-transform">{icon}</div>
    <h3 className="font-display font-bold text-gray-200 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default App;
