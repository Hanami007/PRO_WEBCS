import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramCourse } from 'src/program-courses/entities/program-course.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CourseGroup } from 'src/course-group/entities/course-group.entity';
import { PROGRAM_COURSE_SEED_DATA } from './program-course.data';

@Injectable()
export class ProgramCourseSeedService {
  constructor(
    @InjectRepository(ProgramCourse)
    private programCourseRepository: Repository<ProgramCourse>,
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseGroup)
    private courseGroupRepository: Repository<CourseGroup>,
  ) {}

  async run() {
    console.log('Starting ProgramCourse seeding...');
    const data = PROGRAM_COURSE_SEED_DATA;

    for (const item of data) {
      const program = await this.programRepository.findOne({
        where: { code: item.programCode },
      });
      if (!program) {
        console.warn(`Program not found: ${item.programCode}`);
        continue;
      }

      const course = await this.courseRepository.findOne({
        where: { code: item.courseCode },
      });
      if (!course) {
        console.warn(`Course not found: ${item.courseCode}`);
        continue;
      }

      const group = await this.courseGroupRepository.findOne({
        where: { name: item.groupName },
      });
      if (!group) {
        console.warn(`CourseGroup not found: ${item.groupName}`);
        continue;
      }

      const existing = await this.programCourseRepository.findOne({
        where: {
          program: { id: program.id },
          course: { id: course.id },
          group: { id: group.id },
        },
      });

      if (!existing) {
        const newProgramCourse = this.programCourseRepository.create({
          program,
          course,
          group,
        });
        await this.programCourseRepository.save(newProgramCourse);
        console.log(
          `Seeded ProgramCourse: ${program.code} - ${course.code} - ${group.name}`,
        );
      } else {
        console.log(
          `ProgramCourse already exists: ${program.code} - ${course.code} - ${group.name}`,
        );
      }
    }
    console.log('ProgramCourse seeding completed.');
  }
}
