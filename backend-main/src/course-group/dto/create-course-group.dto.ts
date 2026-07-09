import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CourseGroupParentDto {
  @ApiProperty({
    description: 'ID ของกลุ่มวิชาแม่ (ถ้ามี)',
    example: 'uuid-string-of-parent',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateCourseGroupDto {
  @ApiProperty({ description: 'ชื่อกลุ่มวิชา', example: 'หมวดวิชาศึกษาทั่วไป' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'จำนวนหน่วยกิตรวม', example: 30 })
  @IsNumber()
  @IsOptional()
  credits?: number;

  @ApiPropertyOptional({
    type: () => CourseGroupParentDto,
    description: 'กลุ่มวิชาแม่ (Parent Group)',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CourseGroupParentDto)
  parent?: CourseGroupParentDto;
}
