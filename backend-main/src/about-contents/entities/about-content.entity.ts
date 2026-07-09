import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { AboutSection } from '../../about-sections/entities/about-section.entity';
import { File } from '../../files/entities/file.entity';

@Entity('about_contents')
export class AboutContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AboutSection, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  section: AboutSection | null;

  @Column({ length: 50, comment: 'ประเภทเลย์เอาท์ของเนื้อหา' })
  layoutType: string;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @OneToOne(() => File, {
    eager: true,
  })
  @JoinColumn()
  image: File | null;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
