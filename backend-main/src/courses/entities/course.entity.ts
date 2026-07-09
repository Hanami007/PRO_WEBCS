import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 255, comment: 'รหัสวิชา' })
  code: string;

  @Column('varchar', { length: 255, comment: 'ชื่อวิชาภาษาไทย' })
  titleTh: string;

  @Column('varchar', { length: 255, comment: 'ชื่อวิชาภาษาอังกฤษ' })
  titleEn: string;

  @Column('text', { nullable: true, comment: 'รายละเอียดวิชา' })
  description: string;

  @Column({ default: 0, comment: 'หน่วยกิต' })
  credits: number;

  @Column({ default: 0, comment: 'จำนวนชั่วโมงเรียนทฤษฎีต่อสัปดาห์' })
  lectureHours: number;

  @Column({ default: 0, comment: 'จำนวนชั่วโมงเรียนปฏิบัติต่อสัปดาห์' })
  labHours: number;

  @Column({
    default: 0,
    comment: 'จำนวนชั่วโมงศึกษาค้นคว้าด้วยตัวเองต่อสัปดาห์',
  })
  selfStudyHours: number;

  @Column({
    default: true,
    comment: 'สำหรับซ่อนรายวิชา',
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
