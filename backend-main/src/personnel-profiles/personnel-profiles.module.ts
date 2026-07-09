import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelProfilesService } from './personnel-profiles.service';
import { PersonnelProfilesController } from './personnel-profiles.controller';
import { PersonnelProfile } from './entities/personnel-profile.entity';
import { Personnel } from 'src/personnel/entities/personnel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonnelProfile, Personnel])],
  controllers: [PersonnelProfilesController],
  providers: [PersonnelProfilesService],
  exports: [PersonnelProfilesService],
})
export class PersonnelProfilesModule {}
