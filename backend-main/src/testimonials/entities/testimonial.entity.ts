import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, comment: 'ชื่อผู้ให้คำนิยม' })
  authorName: string;

  @Column({ length: 255, comment: 'ตำแหน่งหรือบริษัท (เช่น CEO at Google)' })
  authorTitle: string;

  @Column({ type: 'text', comment: 'เนื้อหา' })
  content: string;

  @OneToOne(() => File, {
    eager: true,
  })
  @JoinColumn()
  image: File | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
