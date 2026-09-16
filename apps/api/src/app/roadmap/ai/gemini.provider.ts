import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RoadmapParams, RoadmapResponse } from '@it-roadmap/models';
import { buildRoadmapPrompt } from './prompt.builder';

@Injectable()
export class GeminiProvider {
  private readonly logger = new Logger(GeminiProvider.name);
  private readonly model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] ?? '');
    this.model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      tools: [{ googleSearch: {} }],
    } as any);
  }

  async generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    const prompt = buildRoadmapPrompt(params);

    this.logger.log(`Generando roadmap para: ${params.language} - ${params.objective}`);

    const result = await this.model.generateContent(prompt);
    const text = result.response.text();

    this.logger.log('Respuesta recibida de Gemini');

    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned) as RoadmapResponse;
    } catch {
      this.logger.error('Error parseando JSON de Gemini:', text);
      throw new Error('La IA no devolvió un JSON válido');
    }
  }
}