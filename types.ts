
export interface AnalysisResult {
  intent: string;
  entities: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  tone: {
    sentiment: string;
    politeness: number; // 0 to 1
  };
  complexity: number; // 0 to 1
  actionPlan: string[];
  explanation: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  command: string;
  analysis: AnalysisResult;
  thinking: string;
}

export enum ConnectionStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  ERROR = 'ERROR'
}
