import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramCourse } from 'src/program-courses/entities/program-course.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CourseGroup } from 'src/course-group/entities/course-group.entity';
import { ProgramCourseSeedService } from './program-course-seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramCourse, Program, Course, CourseGroup]),
  ],
  providers: [ProgramCourseSeedService],
  exports: [ProgramCourseSeedService],
})
export class ProgramCourseSeedModule {}
