import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomTypeDto {
  @ApiProperty({
    description: 'ชื่อประเภทห้อง',
    example: 'ห้องปฏิบัติการคอมพิวเตอร์',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'รายละเอียด',
    example: 'สำหรับเรียนวิชาเขียนโปรแกรม',
  })
  @IsOptional()
  @IsString()
  description: string;
}
