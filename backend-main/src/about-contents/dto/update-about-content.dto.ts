import { PartialType } from '@nestjs/swagger';
import { CreateAboutContentDto } from './create-about-content.dto';
import { IsOptional } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class UpdateAboutContentDto extends PartialType(CreateAboutContentDto) {
  @IsOptional()
  image?: FileDto | null;
}
