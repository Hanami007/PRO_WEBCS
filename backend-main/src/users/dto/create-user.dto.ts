import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleDto } from '../../roles/dto/role.dto';
import { FileDto } from '../../files/dto/file.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'อีเมลของผู้ใช้งาน',
    example: 'test1@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ชื่อ-นามสกุล หรือชื่อที่ใช้แสดงผล',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'รหัสผ่าน (ต้องมีความยาวอย่างน้อย 6 ตัว, มีตัวใหญ่ 1 ตัว และตัวเลข 1 ตัว)',
    example: 'Password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least 1 number',
  })
  password: string;

  @ApiPropertyOptional({
    type: () => RoleDto,
    description: 'บทบาทผู้ใช้งาน (ถ้ามี)',
  })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: () => FileDto, description: 'รูปโปรไฟล์' })
  @IsOptional()
  @Type(() => FileDto)
  photo?: FileDto | null;
}
