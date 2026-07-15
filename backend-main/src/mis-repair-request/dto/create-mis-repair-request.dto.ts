import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RepairRequestStatus } from '../entities/mis-repair-request.entity';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateMisRepairRequestDto {
  @ApiProperty({ description: 'ชื่อผู้แจ้ง', example: 'สมศักดิ์ ดีใจ' })
  @IsString()
  @IsNotEmpty()
  reporterName: string;

  @ApiProperty({ description: 'สถานที่/ห้อง', example: 'ห้อง 301 อาคาร CS' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'ชื่ออุปกรณ์ที่พัง', example: 'แอร์ห้องเรียน' })
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty({ description: 'รายละเอียดปัญหา', example: 'แอร์ไม่ทำงาน มีเสียงดัง' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ enum: RepairRequestStatus, default: RepairRequestStatus.PENDING })
  @IsOptional()
  @IsEnum(RepairRequestStatus)
  status?: RepairRequestStatus;

  @ApiPropertyOptional({ type: () => FileDto, description: 'รูปภาพประกอบ' })
  @IsOptional()
  image?: FileDto | null;
}
