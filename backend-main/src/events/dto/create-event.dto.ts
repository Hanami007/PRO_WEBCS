import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateEventDto {
  @ApiProperty({ description: 'ชื่อกิจกรรม', example: 'MJU Open House 2026' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'รายละเอียดกิจกรรม',
    example: 'ขอเชิญน้องๆ นักเรียนเข้าร่วมงานเปิดบ้าน...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ผู้จัดงาน',
    example: 'สโมสรนักศึกษาคณะวิทยาศาสตร์',
  })
  @IsString()
  @IsNotEmpty()
  organizer: string;

  @ApiProperty({
    description: 'สถานที่จัดงาน',
    example: 'ศูนย์กีฬากาญจนาภิเษก รัชกาลที่ 9',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'วันเวลาเริ่มงาน (ISO Date)',
    example: '2026-02-14T09:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startsAt: string;

  @ApiPropertyOptional({
    description: 'วันเวลาสิ้นสุดงาน',
    example: '2026-02-14T16:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  endsAt: string;

  @ApiPropertyOptional({
    description: 'ลิงก์ลงทะเบียน/ข้อมูลเพิ่มเติม',
    example: 'https://forms.gle/...',
  })
  @IsOptional()
  @IsString()
  externalLink?: string;

  @ApiPropertyOptional({ description: 'แสดงผลบนเว็บหรือไม่', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'โปสเตอร์กิจกรรม (Object File)',
  })
  @IsOptional()
  poster?: FileDto | null;
}
