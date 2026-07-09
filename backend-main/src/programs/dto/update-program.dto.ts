import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CreateProgramDto } from './create-program.dto';

export class UpdateProgramDto extends PartialType(CreateProgramDto) {
  @ApiProperty({
    description: 'ชื่อเต็มปริญญาภาษาไทย',
    example: 'วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)',
    required: false,
  })
  @IsString()
  @IsOptional()
  degreeThFull?: string;

  @ApiProperty({
    description: 'ชื่อเต็มปริญญาภาษาอังกฤษ',
    example: 'Bachelor of Science (Computer Science)',
    required: false,
  })
  @IsString()
  @IsOptional()
  degreeEnFull?: string;

  @ApiProperty({
    description: 'ชื่อย่อปริญญาภาษาไทย',
    example: 'วท.บ. (วิทยาการคอมพิวเตอร์)',
    required: false,
  })
  @IsString()
  @IsOptional()
  degreeTh?: string;

  @ApiProperty({
    description: 'ชื่อย่อปริญญาภาษาอังกฤษ',
    example: 'B.Sc. (Computer Science)',
    required: false,
  })
  @IsString()
  @IsOptional()
  degreeEn?: string;

  @ApiProperty({
    description: 'จำนวนหน่วยกิตที่เรียนตลอดหลักสูตร',
    example: 120,
    default: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  credits?: number;

  @ApiProperty({
    description: 'ปีที่ปรับปรุงหลักสูตร',
    example: '2560',
    required: false,
  })
  @IsString()
  @IsOptional()
  revision?: string;

  @ApiProperty({
    description: 'ระยะเวลาของหลักสูตร',
    example: '4 ปี',
    required: false,
  })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({
    description: 'ภาษาที่ใช้',
    example: 'ภาษาไทย',
    required: false,
  })
  @IsString()
  @IsOptional()
  languages?: string;

  @ApiProperty({
    description: 'มคอ.',
    example: 'https://example.com/uploads/tqf/tqf2-2569.pdf',
    required: false,
  })
  @IsString()
  @IsOptional()
  tqf?: string;

  @ApiProperty({
    description: 'เป็นหลักสูตรปัจจุบันหรือไม่',
    example: true,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

  @ApiProperty({
    description: 'แสดงผลบนหน้าเว็บหรือไม่',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
