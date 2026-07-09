import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiPropertyOptional({
    description: 'คำอธิบายรายวิชา',
    example: 'ศึกษาเกี่ยวกับหลักการพัฒนาเว็บ...',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'หน่วยกิต', example: 3 })
  @IsNumber()
  @IsOptional()
  credits?: number;

  @ApiPropertyOptional({ description: 'ชั่วโมงบรรยาย', example: 2 })
  @IsNumber()
  @IsOptional()
  lectureHours?: number;

  @ApiPropertyOptional({ description: 'ชั่วโมงปฏิบัติ', example: 2 })
  @IsNumber()
  @IsOptional()
  labHours?: number;

  @ApiPropertyOptional({ description: 'ชั่วโมงศึกษาด้วยตนเอง', example: 5 })
  @IsNumber()
  @IsOptional()
  selfStudyHours?: number;

  @ApiPropertyOptional({ description: 'เปิดใช้งานหรือไม่', example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
