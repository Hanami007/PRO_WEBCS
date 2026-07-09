import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'หัวข้อข่าว/บทความ',
    example: 'ประกาศรับสมัครนักศึกษาใหม่ 2569',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
