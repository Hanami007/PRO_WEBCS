import { PartialType } from '@nestjs/swagger';
import { CreatePersonnelDto } from './create-personnel.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePersonnelDto extends PartialType(CreatePersonnelDto) {
  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปโปรไฟล์ (Object File)',
  })
  @IsOptional()
  profileImage?: FileDto | null;
}
