import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { File } from '../files/entities/file.entity';
import { Role } from '../roles/entities/role.entity';

@Entity()
export class User {
  @ApiProperty({
    description: 'รหัสผู้ใช้ (UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({ description: 'ชื่อผู้ใช้งาน', example: 'John Doe' })
  @Column({ nullable: true })
  name: string;

  @Expose({ groups: ['admin'] })
  @ApiProperty({ description: 'อีเมล', example: 'user@example.com' })
  @Column({ unique: true })
  email: string;

  @Exclude({ toClassOnly: true })
  @Column({ nullable: true })
  password: string;

  @ApiPropertyOptional({ type: () => Role, description: 'สิทธิ์การใช้งาน' })
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role | null;

  @ApiPropertyOptional({ type: () => File, description: 'รูปโปรไฟล์' })
  @ManyToOne(() => File, { eager: true })
  @JoinColumn()
  photo?: File | null;

  @ApiProperty({ description: 'วันที่สร้าง', example: '2026-02-19T10:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'วันที่แก้ไขล่าสุด',
    example: '2026-02-19T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @ApiProperty({
    description: 'วันที่ลบ (Soft Delete)',
    example: '2026-02-19T14:00:00Z',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
