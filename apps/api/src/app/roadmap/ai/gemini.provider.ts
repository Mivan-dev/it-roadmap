import { Injectable, Logger } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from '@it-roadmap/models';
import { buildRoadmapPrompt } from './prompt.builder';

@Injectable()
export class GeminiProvider {
  private readonly logger = new Logger(GeminiProvider.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = process.env['OPENROUTER_API_KEY'] ?? '';
  }

  async generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    const prompt = buildRoadmapPrompt(params);

    this.logger.log(`Generando roadmap para: ${params.language} - ${params.objective}`);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:4200',
          'X-Title': 'IT Roadmap AI',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [{ role: 'user', content: prompt }],
          plugins: [{ id: 'web' }],
        }),
      });

      const rawText = await response.text();
      this.logger.log('Raw response: ' + rawText);
      const data = JSON.parse(rawText) as any;
      const text = data.choices?.[0]?.message?.content ?? '';

      this.logger.log('Texto recibido: ' + text);

      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned) as RoadmapResponse;

    } catch (error) {
      this.logger.error('Error completo:', error);
      throw new Error('Error llamando a OpenRouter: ' + error);
    }
  }
}