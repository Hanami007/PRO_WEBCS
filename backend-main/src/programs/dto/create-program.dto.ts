import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramDto {
  @ApiProperty({
    description: 'รหัสหลักสูตร',
    example: '256000000',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'ชื่อหลักสูตรภาษาไทย',
    example: 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
  })
  @IsString()
  @IsNotEmpty()
  nameTh: string;

  @ApiProperty({
    description: 'ชื่อหลักสูตรภาษาอังกฤษ',
    example: 'Bachelor of Science Program in Computer Science',
  })
  @IsString()
  @IsNotEmpty()
  nameEn: string;
}
