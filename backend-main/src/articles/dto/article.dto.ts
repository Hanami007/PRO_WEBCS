import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleDto {
  @ApiProperty({
    description: 'รหัสอ้างอิง (UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'หัวข้อข่าว',
    example: 'เปิดรับสมัครนักศึกษาใหม่ รอบ Quota',
  })
  title: string;

  @ApiProperty({
    description: 'เนื้อหาข่าว (HTML/Text)',
    example: '<p>รายละเอียดการรับสมัคร...</p>',
  })
  content: string;

  @ApiProperty({
    description: 'สถานะเผยแพร่',
    example: true,
  })
  published: boolean;

  @ApiProperty({
    description: 'วันที่สร้าง',
    example: '2026-02-14T10:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'วันที่แก้ไขล่าสุด',
    example: '2026-02-15T12:30:00Z',
  })
  updatedAt: string;
}
