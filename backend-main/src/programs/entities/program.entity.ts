import { ProgramCourse } from 'src/program-courses/entities/program-course.entity';
import { StudyPlan } from 'src/study-plans/entities/study-plan.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, comment: 'รหัสหลักสูตร' })
  code: string;

  @Column('varchar', { comment: 'ชื่อหลักสูตรภาษาไทย' })
  nameTh: string;

  @Column('varchar', { comment: 'ชื่อหลักสูตรภาษาอังกฤษ' })
  nameEn: string;

  @Column('varchar', { nullable: true, comment: 'ชื่อเต็มปริญญาภาษาไทย' })
  degreeThFull: string;

  @Column('varchar', { nullable: true, comment: 'ชื่อเต็มปริญญาภาษาอังกฤษ' })
  degreeEnFull: string;

  @Column('varchar', { nullable: true, comment: 'ชื่อย่อปริญญาภาษาไทย' })
  degreeTh: string;

  @Column('varchar', { nullable: true, comment: 'ชื่อย่อปริญญาภาษาอังกฤษ' })
  degreeEn: string;

  @Column({ default: 0, comment: 'จำนวนหน่วยกิตที่เรียนตลอดหลักสูตร' })
  credits: number;

  @Column('varchar', { nullable: true, comment: 'ปีที่ปรับปรังหลักสูตร' })
  revision: string;

  @Column('varchar', { nullable: true, comment: 'ระยะเวลาของหลักสูตร' })
  duration: string;

  @Column('varchar', { nullable: true, comment: 'ภาษาที่ใช้' })
  languages: string;

  @Column('varchar', { nullable: true, comment: 'ลิงก์เอกสาร มคอ. (TQF)' })
  tqf: string;

  @Column({ default: false, comment: 'เป็นหลักสูตรปัจจุบันหรือไม่' })
  isCurrent: boolean;

  @Column({ default: true, comment: 'แสดงผลบนหน้าเว็บหรือไม่' })
  isActive: boolean;

  @OneToMany(() => ProgramCourse, (pc) => pc.program)
  programCourses: ProgramCourse[];

  @OneToMany(() => StudyPlan, (sp) => sp.program)
  studyPlans: StudyPlan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
