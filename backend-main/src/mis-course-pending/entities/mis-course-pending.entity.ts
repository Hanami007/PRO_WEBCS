import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CoursePendingStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}

@Entity()
export class MisCoursePending {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  studentId: string;

  @Column({ type: 'varchar', length: 255 })
  studentName: string;

  @Column({ type: 'varchar', length: 20 })
  courseCode: string;

  @Column({ type: 'varchar', length: 255 })
  courseName: string;

  @Column({ type: 'varchar', length: 20, default: '1' })
  subjectType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  advisor: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'enum',
    enum: CoursePendingStatus,
    default: CoursePendingStatus.PENDING,
  })
  status: CoursePendingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
