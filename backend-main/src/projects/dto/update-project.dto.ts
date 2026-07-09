import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FileDto } from '../../files/dto/file.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'ไฟล์เอกสารโครงงาน (Object File)',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  file?: FileDto | null;
}
