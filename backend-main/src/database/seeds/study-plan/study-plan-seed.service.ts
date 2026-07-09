import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Program } from 'src/programs/entities/program.entity';
import { StudyPlan } from 'src/study-plans/entities/study-plan.entity';
import { Repository } from 'typeorm';
import { PROGRAMS_STUDY_PLANS_DATA } from './study-plan.data';

@Injectable()
export class StudyPlanSeedService {
  constructor(
    @InjectRepository(StudyPlan)
    private repository: Repository<StudyPlan>,

    @InjectRepository(Program)
    private programRepository: Repository<Program>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async run() {
    for (const program of PROGRAMS_STUDY_PLANS_DATA) {
      const programEntity = await this.programRepository.findOne({
        where: { code: program.code },
      });

      if (!programEntity) {
        console.warn(`Program ${program.code} not found. Skipping.`);
      }

      for (const plan of program.studyPlans) {
        if (!plan.course) {
          const planEntity = await this.repository.findOne({
            where: {
              label: plan.label,
            },
          });

          if (planEntity) {
            console.warn(`Plan with Label ${plan.label} exists. Skipping.`);
            continue;
          }

          const newPlan = this.repository.create({
            program: { id: programEntity?.id },
            label: plan.label,
            credit: plan.credit,
            year: plan.year,
            semester: plan.semester,
          });

          await this.repository.save(newPlan);
        } else {
          const planEntity = await this.repository.findOne({
            where: {
              course: {
                code: plan.course.code,
              },
            },
          });

          if (planEntity) {
            console.warn(
              `Plan with Course ${plan.course.code} exists. Skipping.`,
            );
            continue;
          }

          const courseEntity = await this.courseRepository.findOne({
            where: { code: plan.course.code },
          });

          if (!courseEntity) {
            console.warn(`Course ${plan.course.code} not found. Skipping.`);
            continue;
          }

          const newPlan = this.repository.create({
            course: { id: courseEntity?.id },
            program: { id: programEntity?.id },
            year: plan.year,
            semester: plan.semester,
          });
          await this.repository.save(newPlan);
        }
      }
    }
  }
}
