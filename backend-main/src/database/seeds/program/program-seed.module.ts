import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/programs/entities/program.entity';
import { ProgramSeedService } from './program-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [ProgramSeedService],
  exports: [ProgramSeedService],
})
export class ProgramSeedModule {}
