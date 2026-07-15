import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { EquipmentBorrowStatus } from '../entities/mis-equipment-borrow.entity';

export class CreateMisEquipmentBorrowDto {
  @ApiProperty({ description: 'ชื่อผู้ยืม', example: 'สมหญิง รักเรียน' })
  @IsString()
  @IsNotEmpty()
  borrowerName: string;

  @ApiProperty({ description: 'ชื่ออุปกรณ์', example: 'โปรเจคเตอร์ Epson' })
  @IsString()
  @IsNotEmpty()
  equipmentName: string;

  @ApiProperty({ description: 'จำนวน', example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'วันที่ยืม (YYYY-MM-DD)', example: '2026-07-15' })
  @IsDateString()
  borrowDate: string;

  @ApiProperty({ description: 'วันที่กำหนดคืน (YYYY-MM-DD)', example: '2026-07-20' })
  @IsDateString()
  returnDate: string;

  @ApiPropertyOptional({ enum: EquipmentBorrowStatus, default: EquipmentBorrowStatus.BORROWED })
  @IsOptional()
  @IsEnum(EquipmentBorrowStatus)
  status?: EquipmentBorrowStatus;

  @ApiPropertyOptional({ description: 'หมายเหตุ', example: 'ต้องการใช้สำหรับสอบ' })
  @IsOptional()
  @IsString()
  note?: string;
}
