import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PersonnelDto } from 'src/personnel/dto/personnel.dto';
import { BuildingDto } from 'src/buildings/dto/building.dto';
import { RoomTypeDto } from 'src/room-type/dto/room-type.dto';

export class CreateRoomDto {
  @ApiProperty({ description: 'รหัสห้อง', example: '301' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'ชื่อห้อง (ไทย)',
    example: 'ห้องปฏิบัติการคอมพิวเตอร์ 1',
  })
  @IsNotEmpty()
  @IsString()
  nameTh: string;

  @ApiPropertyOptional({
    description: 'ชื่อห้อง (อังกฤษ)',
    example: 'Computer Lab 1',
  })
  @IsOptional()
  @IsString()
  nameEn: string;

  @ApiPropertyOptional({
    type: () => PersonnelDto,
    description: 'ผู้ดูแลห้อง (ระบุ ID)',
    example: { id: 'uuid-personnel-id' },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonnelDto)
  personnel?: PersonnelDto;

  @ApiProperty({
    type: () => BuildingDto,
    description: 'อาคาร (ระบุ ID)',
    example: { id: 'uuid-building-id' },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BuildingDto)
  building: BuildingDto;

  @ApiProperty({ description: 'ชั้นที่', example: '3' })
  @IsNotEmpty()
  @IsString()
  floor: string;

  @ApiProperty({ description: 'ความจุ (คน)', example: 40 })
  @IsNotEmpty()
  @IsInt()
  capacity: number;

  @ApiProperty({
    type: () => RoomTypeDto,
    description: 'ประเภทห้อง (ระบุ ID)',
    example: { id: 'uuid-room-type-id' },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RoomTypeDto)
  type: RoomTypeDto;
}
