import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  MaxLength,
} from 'class-validator';
import {
  AnnouncementStatus,
  AnnouncementType,
} from '../entities/announcement.entity';

export class CreateAnnouncementDto {
  @ApiProperty({
    description: 'หัวข้อประกาศ',
    example: 'ประกาศปิดปรับปรุงระบบ',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    description: 'คำอธิบายประกาศ',
    example: 'ปิดปรับปรุงระบบเซิร์ฟเวอร์ชั่วคราว',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'ลิงก์ที่เกี่ยวข้อง',
    example: 'https://example.com',
  })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiPropertyOptional({
    description: 'ข้อความบนปุ่มลิงก์',
    example: 'อ่านเพิ่มเติม',
  })
  @IsOptional()
  @IsString()
  linkLabel?: string;

  @ApiProperty({
    enum: AnnouncementType,
    description: 'ประเภทประกาศ',
    example: AnnouncementType.INFO,
  })
  @IsNotEmpty()
  @IsEnum(AnnouncementType)
  type: AnnouncementType;

  @ApiProperty({
    enum: AnnouncementStatus,
    description: 'สถานะประกาศ',
    example: AnnouncementStatus.PUBLISHED,
  })
  @IsNotEmpty()
  @IsEnum(AnnouncementStatus)
  status: AnnouncementStatus;

  @ApiPropertyOptional({
    description: 'วันที่เผยแพร่ (ISO Date String)',
    example: '2026-03-13T09:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: string | null;

  @ApiPropertyOptional({
    description: 'วันที่หมดอายุ (ISO Date String)',
    example: '2026-03-20T09:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string | null;
}
