import { Injectable } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from '@it-roadmap/models';
import { AiService } from './ai/ai.service';

@Injectable()
export class RoadmapService {
  constructor(private readonly aiService: AiService) {}

  generateRoadmap(params: RoadmapParams): Promise<RoadmapResponse> {
    return this.aiService.generateRoadmap(params);
  }
}