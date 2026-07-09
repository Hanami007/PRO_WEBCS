import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingDto } from './create-building.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพอาคาร (Object File)',
  })
  @IsOptional()
  image?: FileDto | null;
}
