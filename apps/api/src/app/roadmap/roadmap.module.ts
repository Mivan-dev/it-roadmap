import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { AiService } from './ai/ai.service';
import { GeminiProvider } from './ai/gemini.provider';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService, AiService, GeminiProvider],
})
export class RoadmapModule {}