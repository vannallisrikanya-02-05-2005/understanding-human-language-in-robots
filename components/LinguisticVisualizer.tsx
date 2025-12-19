
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { AnalysisResult } from '../types';
import { Layers, Zap, Info } from 'lucide-react';

interface VisualizerProps {
  data: AnalysisResult | null;
}

const LinguisticVisualizer: React.FC<VisualizerProps> = ({ data }) => {
  if (!data) return (
    <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-black/20 text-gray-600">
      <div className="text-center">
        <Layers className="mx-auto mb-2 opacity-20" size={48} />
        <p className="text-sm">Awaiting neural analysis...</p>
      </div>
    </div>
  );

  const radarData = [
    { subject: 'Complexity', A: data.complexity * 100, fullMark: 100 },
    { subject: 'Politeness', A: data.tone.politeness * 100, fullMark: 100 },
    { subject: 'Certainty', A: 85, fullMark: 100 }, // Mocked for UI
    { subject: 'Grounding', A: 90, fullMark: 100 }, // Mocked for UI
    { subject: 'Ambiguity', A: (1 - data.complexity) * 100, fullMark: 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-gray-300 flex items-center gap-2">
            <Zap size={18} className="text-yellow-500" />
            Linguistic Vectors
          </h3>
          <Info size={14} className="text-gray-600" />
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Robot"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 overflow-y-auto max-h-[400px]">
        <h3 className="font-display font-semibold text-gray-300 mb-4 sticky top-0 bg-[#0a0a0a] py-1">Operational Logic Plan</h3>
        <div className="space-y-4">
          {data.actionPlan.map((step, idx) => (
            <div key={idx} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">
                  {idx + 1}
                </div>
                {idx !== data.actionPlan.length - 1 && (
                  <div className="w-px flex-1 bg-white/5 my-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinguisticVisualizer;
