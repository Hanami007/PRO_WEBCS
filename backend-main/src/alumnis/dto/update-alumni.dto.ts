import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumniDto } from './create-alumni.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlumniDto extends PartialType(CreateAlumniDto) {
  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพโปรไฟล์ (Object File)',
  })
  @IsOptional()
  profileImage?: FileDto | null;
}
