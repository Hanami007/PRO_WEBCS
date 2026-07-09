import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyPlan } from 'src/study-plans/entities/study-plan.entity';
import { StudyPlanSeedService } from './study-plan-seed.service';
import { Program } from 'src/programs/entities/program.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyPlan, Program, Course])],
  providers: [StudyPlanSeedService],
  exports: [StudyPlanSeedService],
})
export class StudyPlanSeedModule {}
