import { Injectable } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from '@it-roadmap/models';
import { GeminiProvider } from './gemini.provider';

@Injectable()
export class AiService {
  constructor(private readonly geminiProvider: GeminiProvider) {}

  generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    return this.geminiProvider.generateRoadmap(params);
  }
}