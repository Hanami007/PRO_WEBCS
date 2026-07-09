import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateComplainDto {
  @ApiProperty({
    description: 'หัวข้อเรื่องร้องเรียน',
    example: 'แอร์ห้อง 302 ไม่เย็น',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'รายละเอียดปัญหา',
    example: 'แอร์มีแต่ลมร้อนออกมา...',
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพประกอบปัญหา (Object File)',
  })
  @IsOptional()
  image?: FileDto | null;
}
