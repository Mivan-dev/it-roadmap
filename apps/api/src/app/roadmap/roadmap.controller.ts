import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { RoadmapParams, RoadmapResponse } from '@it-roadmap/models';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  generateRoadmap(@Body() params: RoadmapParams): Promise<RoadmapResponse> {
    return this.roadmapService.generateRoadmap(params);
  }
}