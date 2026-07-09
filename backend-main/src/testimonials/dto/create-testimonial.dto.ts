import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateTestimonialDto {
  @ApiProperty({
    description: 'ชื่อผู้ให้ความเห็น',
    example: 'นาย ก. (ศิษย์เก่า)',
  })
  @IsString()
  @IsNotEmpty()
  authorName!: string;

  @ApiProperty({
    description: 'ตำแหน่ง/อาชีพ',
    example: 'Senior Developer @ Agoda',
  })
  @IsString()
  @IsNotEmpty()
  authorTitle!: string;

  @ApiProperty({
    description: 'ข้อความรีวิว',
    example: 'หลักสูตรทันสมัย อาจารย์ดูแลดีมาก...',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ description: 'แสดงผลหรือไม่', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพโปรไฟล์ (Object File)',
  })
  @IsOptional()
  image?: FileDto | null;
}
