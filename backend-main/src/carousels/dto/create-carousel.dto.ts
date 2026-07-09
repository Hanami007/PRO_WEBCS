import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateCarouselDto {
  @ApiProperty({
    description: 'หัวข้อบนแบนเนอร์',
    example: 'ยินดีต้อนรับสู่วิทยาการคอมพิวเตอร์',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'คำอธิบายเพิ่มเติม',
    example: 'มุ่งมั่นสร้างนวัตกรรม...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'เปิดใช้งานหรือไม่', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'ลำดับการแสดงผล', example: 1 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพแบนเนอร์ (Object File)',
  })
  @IsOptional()
  image?: FileDto | null;
}
