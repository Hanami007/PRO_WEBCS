import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePersonnelProfileDto } from './create-personnel-profile.dto';

// Omit personnelId because it shouldn't be changeable after creation
export class UpdatePersonnelProfileDto extends PartialType(
  OmitType(CreatePersonnelProfileDto, ['personnelId'] as const),
) {}
