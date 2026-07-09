import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { File } from 'src/files/entities/file.entity';
import { Personnel } from 'src/personnel/entities/personnel.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  year: string;

  @Column({
    type: 'text',
  })
  detail: string;

  @Column({
    type: 'text',
    array: true,
    comment: 'รายชื่อผู้จัดทำ',
  })
  editors: string[];

  @ManyToOne(() => Personnel, { nullable: false })
  @JoinColumn()
  chairman: Personnel;

  @ManyToOne(() => Personnel)
  @JoinColumn()
  director1: Personnel | null;

  @ManyToOne(() => Personnel)
  @JoinColumn()
  director2: Personnel | null;

  @OneToOne(() => File, {
    eager: true,
  })
  @JoinColumn()
  file?: File | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
