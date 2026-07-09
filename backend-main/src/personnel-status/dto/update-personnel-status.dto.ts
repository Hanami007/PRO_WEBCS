import { PartialType } from '@nestjs/swagger';
import { CreatePersonnelStatusDto } from './create-personnel-status.dto';

export class UpdatePersonnelStatusDto extends PartialType(
  CreatePersonnelStatusDto,
) {}
