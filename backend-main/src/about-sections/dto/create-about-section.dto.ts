import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAboutSectionDto {
  @ApiProperty({ description: 'ชื่อหัวข้อหลัก', example: 'ข้อมูลทั่วไป' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'ลำดับการแสดงผล', example: 1 })
  @IsOptional()
  @IsInt()
  sortOrder: number;
}
