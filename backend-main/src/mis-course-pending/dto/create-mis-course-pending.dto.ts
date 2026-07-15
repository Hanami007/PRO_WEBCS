import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoursePendingStatus } from '../entities/mis-course-pending.entity';

export class CreateMisCoursePendingDto {
  @ApiProperty({ description: 'รหัสนักศึกษา', example: '6406101001' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ description: 'ชื่อ-นามสกุล', example: 'สมชาย ใจดี' })
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @ApiProperty({ description: 'รหัสวิชา', example: 'CS101' })
  @IsString()
  @IsNotEmpty()
  courseCode: string;

  @ApiProperty({ description: 'ชื่อวิชา', example: 'Introduction to Computer Science' })
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty({ description: 'ประเภทวิชา (1 = ภายในสาขา, 2 = ภายนอกสาขา)', example: '1' })
  @IsString()
  @IsNotEmpty()
  subjectType: string;

  @ApiPropertyOptional({ description: 'อาจารย์ผู้รับผิดชอบรายวิชา', example: 'ผศ.ดร.สมชาย ใจดี' })
  @IsString()
  @IsOptional()
  advisor?: string;

  @ApiProperty({ description: 'เหตุผลที่ตกค้าง', example: 'ลงทะเบียนไม่ทัน' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({ enum: CoursePendingStatus, default: CoursePendingStatus.PENDING })
  @IsOptional()
  @IsEnum(CoursePendingStatus)
  status?: CoursePendingStatus;
}
