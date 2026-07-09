import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PersonnelDto {
  @ApiProperty({
    description: 'รหัสบุคลากร (UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  id: string;
}
