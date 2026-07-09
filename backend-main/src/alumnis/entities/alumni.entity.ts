import { File } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Alumni {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, comment: 'ชื่อ-นามสกุล' })
  fullName: string;

  @Column('varchar', { length: 255, comment: 'รุ่น' })
  cohort: string;

  @Column('varchar', { length: 255, comment: 'สถานที่ทำงาน' })
  workplace: string;

  @Column('varchar', { length: 255, comment: 'ตำแหน่งงาน' })
  position: string;

  @Column({ type: 'text', nullable: true, comment: '' })
  quote: string | null;

  @OneToOne(() => File, { eager: true })
  @JoinColumn()
  profileImage: File | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
