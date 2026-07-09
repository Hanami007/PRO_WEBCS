import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CourseGroupDto } from 'src/course-group/dto/course-group.dto';
import { CourseDto } from 'src/courses/dto/course.dto';
import { ProgramDto } from 'src/programs/dto/program.dto';

export class CreateProgramCourseDto {
  @ApiProperty({
    type: () => ProgramDto,
    description: 'หลักสูตร (ระบุ ID)',
    example: { id: 'uuid-program-id' },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProgramDto)
  program: ProgramDto;

  @ApiProperty({
    type: () => CourseDto,
    description: 'วิชา (ระบุ ID)',
    example: { id: 'uuid-course-id' },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CourseDto)
  course: CourseDto;

  @ApiProperty({
    type: () => CourseGroupDto,
    description: 'กลุ่มวิชา/หมวด (ระบุ ID)',
    example: { id: 'uuid-group-id' },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CourseGroupDto)
  group: CourseGroupDto;
}
