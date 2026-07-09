import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateFeatureDto {
  @ApiProperty({ description: 'หัวข้อจุดเด่น', example: 'บัณฑิตได้งานทำ' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    description: 'รายละเอียด',
    example: 'สถิติย้อนหลัง 5 ปี...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'ประเภท', example: 'statistic' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'ค่าข้อมูล', example: '95%' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ description: 'คำนำหน้า (Prefix)', example: 'กว่า' })
  @IsOptional()
  @IsString()
  prefix?: string;

  @ApiPropertyOptional({
    description: 'คำต่อท้าย (Suffix)',
    example: 'เปอร์เซ็นต์',
  })
  @IsOptional()
  @IsString()
  suffix?: string;

  @ApiPropertyOptional({ description: 'เปิดใช้งาน', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพประกอบ (Object File)',
  })
  @IsOptional()
  image?: FileDto | null;
}
