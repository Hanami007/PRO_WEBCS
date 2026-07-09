import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTestimonialDto } from './create-testimonial.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { IsOptional } from 'class-validator';

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {
  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'อัปเดตรูปภาพ',
  })
  @IsOptional()
  image?: FileDto | null;
}
