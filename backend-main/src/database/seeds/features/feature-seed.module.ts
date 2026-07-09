import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { FeatureSeedService } from './feature-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeatureSeedService],
  exports: [FeatureSeedService],
})
export class FeatureSeedModule {}
