import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';

export enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone',
  URL = 'url',
}

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'หัวข้อการติดต่อ',
  })
  title: string | null;

  @Column({ type: 'text', nullable: true, comment: 'คำอธิบายหัวข้อ' })
  description: string | null;

  @Column({
    type: 'varchar',
    enum: ContactType,
    default: ContactType.URL,
    comment: 'ประเภทข้อมูล',
  })
  type: ContactType;

  @Column({ type: 'varchar', length: 255, comment: 'สำหรับเก็บข้อมูลติดต่อ' })
  value: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'ประโยคแสดงผลสำหรับแทนที่ข้อมูล url',
    nullable: true,
  })
  label: string;

  @OneToOne(() => File, { eager: true, nullable: true })
  @JoinColumn()
  image: File | null;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
