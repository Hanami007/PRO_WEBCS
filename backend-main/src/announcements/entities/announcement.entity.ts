import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AnnouncementType {
  INFO = 'info',
  WARNING = 'warning',
  URGENT = 'urgent',
  NEW_FEATURE = 'new_feature',
}

export enum AnnouncementStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('announcements')
export class Announcement {
  @ApiProperty({ description: 'รหัสประกาศ (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'หัวข้อประกาศ' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiPropertyOptional({ description: 'คำอธิบายประกาศ' })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiPropertyOptional({ description: 'ลิงก์ที่เกี่ยวข้อง' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string | null;

  @ApiPropertyOptional({ description: 'ข้อความบนปุ่มลิงก์' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  linkLabel: string | null;

  @ApiProperty({ enum: AnnouncementType, description: 'ประเภทประกาศ' })
  @Column({
    type: 'enum',
    enum: AnnouncementType,
    default: AnnouncementType.INFO,
  })
  type: AnnouncementType;

  @ApiProperty({ enum: AnnouncementStatus, description: 'สถานะประกาศ' })
  @Column({
    type: 'enum',
    enum: AnnouncementStatus,
    default: AnnouncementStatus.DRAFT,
  })
  status: AnnouncementStatus;

  @ApiProperty({ type: () => User, description: 'ผู้สร้างประกาศ' })
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ApiProperty({ description: 'วันที่เผยแพร่' })
  @Column({ type: 'timestamp', precision: 3, nullable: true })
  publishedAt: Date | null;

  @ApiPropertyOptional({ description: 'วันที่หมดอายุ' })
  @Column({ type: 'timestamp', precision: 3, nullable: true })
  expiresAt: Date | null;

  @ApiProperty({ description: 'วันที่สร้าง' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'วันที่แก้ไขล่าสุด' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'วันที่ลบ (Soft Delete)' })
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
