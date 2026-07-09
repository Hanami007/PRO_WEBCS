import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePersonnelDto {
  @ApiPropertyOptional({
    description: 'เลขบัตรประชาชน (ถ้าจำเป็นต้องเก็บ)',
    example: '15099xxxxxxxx',
  })
  @IsString()
  @IsOptional()
  citizenId: string | null;

  @ApiPropertyOptional({ description: 'คำนำหน้าชื่อ', example: 'นาย' })
  @IsString()
  @IsOptional()
  prefix: string | null;

  @ApiProperty({
    description: 'ชื่อ-นามสกุล (ไทย)',
    example: 'ผศ.ดร.สมชาย ใจดี',
  })
  @IsString()
  @IsNotEmpty()
  fullnameTh: string;

  @ApiProperty({
    description: 'ชื่อ-นามสกุล (อังกฤษ)',
    example: 'Asst. Prof. Dr. Somchai Jaidee',
  })
  @IsString()
  @IsNotEmpty()
  fullnameEn: string;

  @ApiPropertyOptional({
    description: 'ตำแหน่งทางวิชาการ',
    example: 'ผู้ช่วยศาสตราจารย์',
  })
  @IsString()
  @IsOptional()
  academicPosition: string | null;

  @ApiPropertyOptional({
    description: 'ตำแหน่งบริหาร',
    example: 'หัวหน้าหลักสูตร',
  })
  @IsString()
  @IsOptional()
  administrativePosition: string | null;

  @ApiPropertyOptional({
    description: 'อีเมล',
    example: 'somchai@mju.ac.th',
  })
  @IsString()
  @IsOptional()
  email: string | null;

  @ApiPropertyOptional({ description: 'เบอร์โทร', example: '053-873-xxx' })
  @IsString()
  @IsOptional()
  phoneNumber: string | null;

  @ApiPropertyOptional({
    description: 'วุฒิการศึกษา',
    example: 'Ph.D. (Computer Science)',
  })
  @IsString()
  @IsOptional()
  education: string | null;

  @ApiProperty({
    description: 'ประเภทบุคลากร (สายวิชาการ/สายสนับสนุน)',
    example: 'Academic',
  })
  @IsString()
  @IsNotEmpty()
  personnelType: string;

  @ApiPropertyOptional({
    description: 'ประเภททางวิชาการ (เช่น ข้าราชการ/พนักงานมหาวิทยาลัย)',
    example: 'พนักงานมหาวิทยาลัย',
  })
  @IsString()
  @IsOptional()
  academicType: string | null;

  @ApiProperty({
    description: 'ID สถานะการทำงาน',
    example: 'uuid-of-status-active',
  })
  @IsString()
  @IsNotEmpty()
  workStatusId: string;
}
