import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {
  @ApiPropertyOptional({
    description: 'ชื่อ-นามสกุล หรือชื่อที่ใช้แสดงผล',
    example: 'John Doe',
  })
  name?: string;
}
