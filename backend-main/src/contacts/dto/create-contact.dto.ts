import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { ContactType } from '../entities/contact.entity';

export class CreateContactDto {
  @ApiProperty({ description: 'ชื่อช่องทางติดต่อ', example: 'Facebook Page' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'คำอธิบายเพิ่มเติม',
    example: 'ติดตามข่าวสารรวดเร็ว',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ContactType,
    description: 'ประเภท (Social, Phone, Email, etc.)',
    example: 'Social',
  })
  @IsNotEmpty()
  @IsEnum(ContactType)
  type: ContactType;

  @ApiProperty({
    description: 'ค่าข้อมูล (URL หรือ เบอร์โทร)',
    example: 'https://facebook.com/csmju',
  })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiPropertyOptional({ description: 'ป้ายกำกับปุ่ม', example: 'คลิกเลย' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  label?: string;

  @ApiPropertyOptional({ description: 'ลำดับการแสดงผล', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder: number;

  @ApiPropertyOptional({ type: () => FileDto, description: 'ไอคอน' })
  @IsOptional()
  image?: FileDto | null;

  @ApiPropertyOptional({ description: 'เปิดใช้งานหรือไม่', example: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
