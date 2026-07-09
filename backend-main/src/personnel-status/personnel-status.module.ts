import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelStatusService } from './personnel-status.service';
import { PersonnelStatusController } from './personnel-status.controller';
import { PersonnelStatus } from './entities/personnel-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonnelStatus])],
  controllers: [PersonnelStatusController],
  providers: [PersonnelStatusService],
  exports: [PersonnelStatusService],
})
export class PersonnelStatusModule {}
