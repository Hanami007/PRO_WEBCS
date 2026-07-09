import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from 'src/resources/entities/resource.entity';
import { ResourceSeedService } from './resource-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourceSeedService],
  exports: [ResourceSeedService],
})
export class ResourceSeedModule {}
