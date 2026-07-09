import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty({
    description: 'The unique identifier for the frontend',
    example: 'youtube_link',
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({
    description: 'The actual content, link, or configuration value',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiPropertyOptional({
    description:
      'Internal description to help admins understand what this resource is for',
    example: 'The main YouTube video link for the home page',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
