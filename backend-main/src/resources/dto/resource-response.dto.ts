import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResourceResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The UUID of the resource',
  })
  id: string;

  @ApiProperty({
    example: 'youtube_link',
    description: 'The unique identifier for the frontend',
  })
  key: string;

  @ApiProperty({
    example: 'https://www.youtube.com/@csmju',
    description: 'The actual content or link',
  })
  value: string;

  @ApiPropertyOptional({
    example: 'YouTube link for MJU Computer Science',
    description: 'Internal description',
  })
  description?: string;

  @ApiProperty({
    example: '2026-03-08T10:37:14.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-03-08T10:37:14.000Z',
  })
  updatedAt: Date;
}
