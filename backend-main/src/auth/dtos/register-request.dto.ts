import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'อีเมลที่ใช้สมัครสมาชิก',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ชื่อผู้ใช้งาน',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'รหัสผ่าน (ต้องมีตัวใหญ่และตัวเลขอย่างน้อย 1 ตัว)',
    example: 'Password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least 1 number' })
  password: string;
}
