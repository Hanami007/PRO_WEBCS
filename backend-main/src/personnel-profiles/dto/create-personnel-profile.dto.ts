import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePersonnelProfileDto {
  @ApiProperty({
    description: 'The UUID of the personnel this profile belongs to',
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @IsNotEmpty()
  @IsUUID()
  personnelId: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ example: 'Bio information...' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'Maejo University' })
  @IsOptional()
  @IsString()
  workplace?: string;

  @ApiPropertyOptional({ example: 'Skill 1, Skill 2' })
  @IsOptional()
  @IsString()
  skills?: string;

  @ApiPropertyOptional({ example: 'Expertise 1, Expertise 2' })
  @IsOptional()
  @IsString()
  experts?: string;

  @ApiPropertyOptional({
    example: 'Senior Developer at Tech Corp (2020-2023)',
  })
  @IsOptional()
  @IsString()
  experiences?: string;

  @ApiPropertyOptional({
    example: 'Deep Learning in Agriculture (2022)',
  })
  @IsOptional()
  @IsString()
  researches?: string;
}
