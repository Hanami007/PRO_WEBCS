import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiPropertyOptional({
    description: 'เนื้อหาข่าว (HTML/Text)',
    example: 'รายละเอียดการรับสมัคร...',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiPropertyOptional({
    description: 'สถานะการเผยแพร่ (true=แสดง, false=ซ่อน)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  published: boolean;

  @ApiPropertyOptional({ description: 'หมวดหมู่ข่าว', example: 'Activity' })
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional({
    description: 'ลิงก์ภายนอก (ถ้ามี)',
    example: 'https://reg.mju.ac.th',
  })
  @IsString()
  @IsOptional()
  link: string;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพหน้าปก (Object File)',
  })
  @IsOptional()
  thumbnail?: FileDto | null;
}
