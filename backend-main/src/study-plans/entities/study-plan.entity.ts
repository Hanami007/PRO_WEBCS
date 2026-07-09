import { Program } from 'src/programs/entities/program.entity';
import { Course } from 'src/courses/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class StudyPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Program)
  program: Program;

  @ManyToOne(() => Course, { nullable: true })
  course: Course;

  @Column({ nullable: true, comment: 'ชื่อที่จะแสดงในแผนการเรียน' })
  label: string;

  @Column({ comment: 'ปีที่เรียน' })
  year: number;

  @Column({ comment: 'เทอม 1, 2 หรือ 3 ซัมเมอร์' })
  semester: number;

  @Column({ nullable: true, comment: 'หน่วยกิตที่แสดง' })
  credit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
