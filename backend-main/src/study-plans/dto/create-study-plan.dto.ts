import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class StudyPlanProgramDto {
  @ApiProperty({ description: 'ID หลักสูตร', example: 'uuid-program-id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

class StudyPlanCourseDto {
  @ApiProperty({ description: 'ID วิชา', example: 'uuid-course-id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateStudyPlanDto {
  @ApiProperty({
    description: 'ชื่อแผน (เช่น แผนการเรียนปกติ)',
    example: 'แผน ก (ปกติ)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: () => StudyPlanProgramDto,
    description: 'หลักสูตร (ระบุ ID)',
  })
  @ValidateNested()
  @Type(() => StudyPlanProgramDto)
  @IsNotEmpty()
  program: StudyPlanProgramDto;

  @ApiProperty({
    type: () => StudyPlanCourseDto,
    description: 'วิชาที่จะเรียน (ระบุ ID)',
  })
  @ValidateNested()
  @Type(() => StudyPlanCourseDto)
  @IsNotEmpty()
  course: StudyPlanCourseDto;

  @ApiProperty({ description: 'ชั้นปีที่', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ description: 'เทอมที่', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  semester: number;
}
