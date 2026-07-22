import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PersonnelDto } from 'src/personnel/dto/personnel.dto';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateProjectDto {
  @ApiProperty({ description: 'รหัสโครงงาน', example: 'CS-69-01' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'ชื่อโครงงาน',
    example: 'ระบบจัดการฟาร์มอัจฉริยะ',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ปีการศึกษา', example: '2569' })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiPropertyOptional({
    description: 'รายละเอียดโดยย่อ',
    example: 'แอปพลิเคชัน IoT สำหรับ...',
  })
  @IsString()
  @IsOptional()
  detail?: string;

  @ApiProperty({
    description: 'รายชื่อผู้จัดทำ (Array ของชื่อ)',
    example: ['นาย ก.', 'นาย ข.'],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  editors: string[];

  @ApiProperty({
    type: () => PersonnelDto,
    description: 'อาจารย์ที่ปรึกษาหลัก (ระบุ ID)',
    example: { id: 'uuid-personnel-id' },
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PersonnelDto)
  chairman: PersonnelDto;

  @ApiPropertyOptional({
    type: () => PersonnelDto,
    description: 'กรรมการสอบ 1 (ระบุ ID)',
    example: { id: 'uuid-personnel-id' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonnelDto)
  director1?: PersonnelDto;

  @ApiPropertyOptional({
    type: () => PersonnelDto,
    description: 'กรรมการสอบ 2 (ระบุ ID)',
    example: { id: 'uuid-personnel-id' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonnelDto)
  director2?: PersonnelDto;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'ไฟล์เอกสารโครงงาน (PDF)',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  file?: FileDto | null;
}
