import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlumniDto {
  @ApiProperty({
    description: 'ชื่อ-นามสกุล ศิษย์เก่า',
    example: 'นายรักเรียน แม่โจ้',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'รุ่นที่ (เช่น รุ่น 25)', example: 'CS25' })
  @IsString()
  @IsNotEmpty()
  cohort: string;

  @ApiProperty({
    description: 'สถานที่ทำงานปัจจุบัน',
    example: 'Google Thailand',
  })
  @IsString()
  @IsNotEmpty()
  workplace: string;

  @ApiProperty({
    description: 'ตำแหน่งงาน',
    example: 'Senior Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiPropertyOptional({
    description: 'คำคมหรือข้อคิด',
    example: 'ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น',
  })
  @IsString()
  @IsOptional()
  quote: string | null;
}
