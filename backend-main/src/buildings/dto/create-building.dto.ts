import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'ชื่ออาคารเรียน',
    example: 'อาคารเรียนรวม 70 ปี',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
