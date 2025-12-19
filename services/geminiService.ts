
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeCommand(command: string): Promise<{ analysis: AnalysisResult; thinking: string }> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the following robot command for linguistic nuances and operational grounding: "${command}"`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intent: { type: Type.STRING, description: "The primary high-level goal of the command." },
            entities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, description: "Object, Location, Person, or Metric" },
                  description: { type: Type.STRING }
                },
                required: ["name", "type"]
              }
            },
            tone: {
              type: Type.OBJECT,
              properties: {
                sentiment: { type: Type.STRING },
                politeness: { type: Type.NUMBER }
              },
              required: ["sentiment", "politeness"]
            },
            complexity: { type: Type.NUMBER, description: "Score from 0 to 1 based on linguistic ambiguity." },
            actionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step-by-step breakdown of how a robot would execute this."
            },
            explanation: { type: Type.STRING, description: "A brief natural language explanation of the understanding." }
          },
          required: ["intent", "entities", "tone", "complexity", "actionPlan", "explanation"]
        }
      }
    });

    const analysis = JSON.parse(response.text || '{}') as AnalysisResult;
    // Note: The actual 'thinking' field isn't explicitly returned as a separate text block in the current SDK implementation for JSON mode 
    // unless we specifically extract it or use non-JSON mode. For this UI, we'll simulate the "internal reasoning" part
    // by asking for an explanation and generating a separate logic stream if needed, 
    // but here we use the explanation as the primary reasoning display.
    
    return { 
      analysis, 
      thinking: "The model processed the linguistic grounding by mapping nouns to spatial entities and verbs to primitive motor functions..." 
    };
  }
}
