
import React from 'react';
import { Cpu, Box, Tag, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface RobotReasoningProps {
  data: AnalysisResult | null;
  thinking: string;
}

const RobotReasoning: React.FC<RobotReasoningProps> = ({ data, thinking }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-gray-300 flex items-center gap-2 mb-6">
          <Cpu size={18} className="text-emerald-500" />
          Neural Semantics
        </h3>
        
        <div className="space-y-4">
          <div className="bg-black border border-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-500 uppercase font-bold mb-2">Internal Explanation</p>
            <p className="text-sm leading-relaxed text-gray-300 italic">"{data.explanation}"</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black border border-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase font-bold mb-2 flex items-center gap-1">
                <Tag size={12} /> Detected Intent
              </p>
              <p className="text-lg font-display text-blue-400 font-semibold">{data.intent}</p>
            </div>
            <div className="bg-black border border-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase font-bold mb-2 flex items-center gap-1">
                <AlertCircle size={12} /> Sentiment
              </p>
              <p className="text-lg font-display text-purple-400 font-semibold">{data.tone.sentiment}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
        <h3 className="font-display font-semibold text-gray-300 flex items-center gap-2 mb-4">
          <Box size={18} className="text-orange-500" />
          Entity Grounding
        </h3>
        <div className="space-y-3">
          {data.entities.map((ent, i) => (
            <div key={i} className="bg-black/40 border border-white/5 rounded-lg p-3 hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-semibold text-white">{ent.name}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 uppercase tracking-tighter">{ent.type}</span>
              </div>
              <p className="text-xs text-gray-500">{ent.description}</p>
            </div>
          ))}
          {data.entities.length === 0 && (
            <p className="text-xs text-gray-600 text-center py-4 italic">No discrete physical entities identified.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RobotReasoning;
