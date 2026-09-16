import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), RoadmapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
