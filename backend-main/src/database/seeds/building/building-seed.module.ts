import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/buildings/entities/building.entity';
import { BuildingSeedSerivce } from './building-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingSeedSerivce],
  exports: [BuildingSeedSerivce],
})
export class BuildingSeedModule {}
