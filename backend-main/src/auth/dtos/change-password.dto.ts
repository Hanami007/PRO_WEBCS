import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'รหัสผ่านปัจจุบัน',
    example: 'CurrentPassword123',
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    description:
      'รหัสผ่านใหม่ (ต้องมีความยาวอย่างน้อย 6 ตัว, มีตัวใหญ่ 1 ตัว และตัวเลข 1 ตัว)',
    example: 'NewPassword123',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least 1 number' })
  newPassword: string;
}
