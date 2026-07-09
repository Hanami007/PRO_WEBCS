import { CourseGroup } from 'src/course-group/entities/course-group.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Program } from 'src/programs/entities/program.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProgramCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Program, (program) => program.programCourses)
  program: Program;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => CourseGroup)
  group: CourseGroup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
