import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({
    description: 'รหัสไฟล์ (UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional({
    description: 'ที่อยู่ไฟล์ (Path)',
    example: 'personnel/image-123456.jpg',
  })
  @IsOptional()
  @IsString()
  path?: string;
}
