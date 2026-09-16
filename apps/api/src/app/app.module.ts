import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [RoadmapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
