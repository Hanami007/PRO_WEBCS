import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'รหัสวิชา', example: 'คพ313' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'ชื่อวิชา (ไทย)',
    example: 'การพัฒนาเว็บแอปพลิเคชัน',
  })
  @IsString()
  @IsNotEmpty()
  titleTh: string;

  @ApiProperty({
    description: 'ชื่อวิชา (อังกฤษ)',
    example: 'Web Application Development',
  })
  @IsString()
  @IsNotEmpty()
  titleEn: string;
}
