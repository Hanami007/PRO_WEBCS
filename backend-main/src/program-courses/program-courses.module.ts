import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseGroup } from 'src/course-group/entities/course-group.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Program } from 'src/programs/entities/program.entity';
import { ProgramCourse } from './entities/program-course.entity';
import { ProgramCoursesController } from './program-courses.controller';
import { ProgramCoursesService } from './program-courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramCourse, Program, Course, CourseGroup]),
  ],
  controllers: [ProgramCoursesController],
  providers: [ProgramCoursesService],
})
export class ProgramCoursesModule {}
