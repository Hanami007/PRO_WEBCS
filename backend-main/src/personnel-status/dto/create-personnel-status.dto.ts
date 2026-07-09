import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonnelStatusDto {
  @ApiProperty({
    description: 'ชื่อสถานะ (เช่น ทำงานปกติ, ลาศึกษาต่อ)',
    example: 'ทำงานปกติ',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
