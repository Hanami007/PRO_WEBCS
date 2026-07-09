import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelStatus } from 'src/personnel-status/entities/personnel-status.entity';
import { PersonnelStatusSeedService } from './personnel-status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonnelStatus])],
  providers: [PersonnelStatusSeedService],
  exports: [PersonnelStatusSeedService],
})
export class PersonnelStatusSeedModule {}
